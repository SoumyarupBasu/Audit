import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import DataTable from "../../components/DataTable";
import UserModal from "../../components/UserModal";
import DeleteUserModal from "../../components/DeleteUserModal";
import Icon from "../../components/Icon";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUserByAdmin,
} from "../../services/userService";
import "../../styles/allUsers.css";
import { formatDate } from "../../utils/dateFormatter";

function AllUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "view", // 'view' | 'create' | 'edit'
    user: null,
  });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    user: null,
  });

  // Sync URL params with state
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    setPagination((prev) => ({ ...prev, currentPage: page }));
    setSearchTerm(search);
    setSortConfig({ sortBy, sortOrder });
  }, [searchParams]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllUsers({
        page: pagination.currentPage,
        limit: pagination.limit,
        search: searchTerm,
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
      });

      setUsers(response.data || response.users || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.pagination?.totalPages || response.totalPages || 1,
        totalItems: response.pagination?.totalItems || response.total || 0,
        hasPrevPage:
          response.pagination?.hasPrevPage ?? pagination.currentPage > 1,
        hasNextPage:
          response.pagination?.hasNextPage ??
          pagination.currentPage < (response.pagination?.totalPages || 1),
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.currentPage,
    pagination.limit,
    searchTerm,
    sortConfig.sortBy,
    sortConfig.sortOrder,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle page change
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  // Handle search
  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term && term.trim()) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to first page on search
    setSearchParams(params);
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Handle sorting
  const handleSort = (sortBy) => {
    const params = new URLSearchParams(searchParams);

    // Toggle sort order if same field, otherwise default to asc
    let newSortOrder = "asc";
    if (sortConfig.sortBy === sortBy && sortConfig.sortOrder === "asc") {
      newSortOrder = "desc";
    }

    params.set("sortBy", sortBy);
    params.set("sortOrder", newSortOrder);
    params.set("page", "1"); // Reset to first page on sort
    setSearchParams(params);

    setSortConfig({ sortBy, sortOrder: newSortOrder });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Clear search
  const handleClearSearch = () => {
    handleSearch("");
  };

  // Modal handlers
  const openViewModal = (user) => {
    setModalState({ isOpen: true, mode: "view", user });
  };

  const openCreateModal = () => {
    setModalState({ isOpen: true, mode: "create", user: null });
  };

  const openEditModal = (user) => {
    setModalState({ isOpen: true, mode: "edit", user });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "view", user: null });
  };

  const openDeleteModal = (user) => {
    setDeleteModalState({ isOpen: true, user });
  };

  const closeDeleteModal = () => {
    setDeleteModalState({ isOpen: false, user: null });
  };

  // CRUD handlers
  const handleSaveUser = async (userData) => {
    try {
      if (modalState.mode === "create") {
        const response = await createUser(userData);
        toast.success(response.message || "User created successfully");
        // Refresh table immediately after user creation
        fetchUsers();
        return response;
      } else {
        const response = await updateUserByAdmin(
          modalState.user._id || modalState.user.id,
          userData
        );
        toast.success(response.message || "User updated successfully");
        closeModal();
        fetchUsers();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(deleteModalState.user._id || deleteModalState.user.id);
      toast.success("User deleted successfully");
      closeDeleteModal();
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => (
        <div className="user-cell">
          <div className="user-avatar-small">
            <Icon name="user" size="16px" />
          </div>
          <span className="user-name-text">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      render: (value) => value || "-",
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value}`}>{value}</span>
      ),
    },
    {
      key: "isEmailVerified",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value ? "verified" : "pending"}`}>
          {value ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  // Render action buttons for each row
  const renderActions = (row) => (
    <div className="action-buttons">
      <button
        className="action-btn view"
        onClick={() => openViewModal(row)}
        title="View user"
      >
        <Icon name="eye" size="16px" />
      </button>
      <button
        className="action-btn edit"
        onClick={() => openEditModal(row)}
        title="Edit user"
      >
        <Icon name="edit" size="16px" />
      </button>
      <button
        className="action-btn delete"
        onClick={() => openDeleteModal(row)}
        title="Delete user"
      >
        <Icon name="trash" size="16px" />
      </button>
    </div>
  );

  return (
    <div className="users-page">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">
            Manage system users and their permissions
            {searchTerm && (
              <span className="search-status">
                {" • "}Showing results for "{searchTerm}"
              </span>
            )}
          </p>
        </div>
        <button className="btn-primary create-btn" onClick={openCreateModal}>
          <Icon name="plus" size="16px" />
          Add New User
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        pagination={{
          ...pagination,
          onPageChange: handlePageChange,
        }}
        onSearch={handleSearch}
        onSort={handleSort}
        sortConfig={sortConfig}
        searchPlaceholder="Search users by name, email, or phone..."
        emptyMessage={
          searchTerm
            ? `No users found matching "${searchTerm}"`
            : "No users found"
        }
        renderActions={renderActions}
        onRefresh={fetchUsers}
        searchTerm={searchTerm}
        onClearSearch={handleClearSearch}
      />

      {/* User Modal (View/Create/Edit) */}
      {modalState.isOpen && (
        <UserModal
          mode={modalState.mode}
          user={modalState.user}
          onSave={handleSaveUser}
          onClose={closeModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalState.isOpen && deleteModalState.user && (
        <DeleteUserModal
          user={deleteModalState.user}
          onConfirm={handleDeleteUser}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
}

export default AllUsers;
