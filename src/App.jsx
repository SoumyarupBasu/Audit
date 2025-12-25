import React, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOTP from './pages/VerifyOTP'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ResendOTP from './pages/ResendOTP'
import UploadDocument from './pages/UploadDocument'
import UploadFramework from './pages/UploadFramework'
import FrameworkSelection from './pages/FrameworkSelection'
import FrameworkDetails from './pages/FrameworkDetails'
import FrameworkComparison from './pages/FrameworkComparison'
import FrameworkControls from './pages/FrameworkControls'
import ComparisonResults from './pages/ComparisonResults'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import CustomFrameworkBuilder from './pages/CustomFrameworkBuilder'
import AIFrameworkExtractor from './pages/AIFrameworkExtractor'
import { CustomFrameworkProvider } from './context/CustomFrameworkContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useUrlSync } from './hooks/useUrlSync'
import './styles/framework.css'
import './styles/frameworkDetails.css'
import './styles/frameworkControls.css'
import './styles/navigation.css'
import './styles/dashboard.css'
import './styles/icons.css'
import './styles/customFramework.css'
import './styles/comparisonResults.css'

// Main App wrapper that provides AuthContext
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

// Inner component that can use useAuth hook
function AppContent() {
  const { isAuthenticated, logout } = useAuth()
  const [successMessage, setSuccessMessage] = useState('')

  // Page navigation state - initialize from URL
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const pathToPage = {
        '/login': 'login',
        '/register': 'register',
        '/verify-otp': 'verify-otp',
        '/forgot-password': 'forgot-password',
        '/reset-password': 'reset-password',
        '/resend-otp': 'resend-otp',
        '/dashboard': 'dashboard',
        '/upload': 'upload',
        '/upload-framework': 'upload-framework',
        '/framework': 'framework',
        '/framework-comparison': 'framework-comparison',
        '/framework-controls': 'framework-controls',
        '/comparison-results': 'comparison-results',
        '/details': 'details',
        '/ai-extractor': 'ai-extractor'
      }
      return pathToPage[pathname] || 'login'
    }
    return 'login'
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFramework, setSelectedFramework] = useState(null)
  const [uploadedFrameworks, setUploadedFrameworks] = useState([])
  const [currentUploadedFramework, setCurrentUploadedFramework] = useState(null)
  const [frameworkForControls, setFrameworkForControls] = useState(null)
  const [comparisonJobId, setComparisonJobId] = useState(null)
  const [comparisonFramework, setComparisonFramework] = useState(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  // Sync URL with current page using custom hook
  useUrlSync(currentPage, setCurrentPage, isAuthenticated)

  // Logout handler
  function handleLogout() {
    logout() // Use AuthContext logout
    setCurrentPage('login')
    // Clear any stored data
    setSelectedFile(null)
    setSelectedFramework(null)
    setSuccessMessage('')
  }

  function handleFileUpload(file) {
    setSelectedFile(file)
    setCurrentPage('framework')
  }

  function handleFrameworkUpload(frameworkData) {
    setUploadedFrameworks(prev => [...prev, frameworkData])
    setCurrentUploadedFramework(frameworkData)
    // Redirect to comparison page instead of dashboard
    setCurrentPage('framework-comparison')
  }

  function handleDocumentUpload(documentFile, customFramework, similarFrameworks) {
    // Store the document and navigate to analysis
    setSelectedFile(documentFile)
    setSelectedFramework(customFramework)
    // You can add additional logic here to handle the similar frameworks
    console.log('Document uploaded for analysis:', {
      document: documentFile.name,
      customFramework: customFramework.name,
      similarFrameworks: similarFrameworks.map(f => f.framework.name)
    })
    // Navigate to details page to show comparison results
    setCurrentPage('details')
  }

  function handleFrameworkSelect(framework) {
    setSelectedFramework(framework)
    setCurrentPage('details')
  }

  function handleBackToUpload() {
    setCurrentPage('upload')
  }

  function handleBackToFramework() {
    setCurrentPage('framework')
  }

  function handleNavigate(page) {
    switch (page) {
      // Public routes (no auth required)
      case 'login':
        setCurrentPage('login')
        break
      case 'register':
        setCurrentPage('register')
        break
      case 'verify-otp':
        setCurrentPage('verify-otp')
        break
      case 'forgot-password':
        setCurrentPage('forgot-password')
        break
      case 'reset-password':
        setCurrentPage('reset-password')
        break
      case 'resend-otp':
        setCurrentPage('resend-otp')
        break
      // Protected routes (auth required)
      case 'dashboard':
        if (isAuthenticated) setCurrentPage('dashboard')
        break
      case 'upload':
        if (isAuthenticated) setCurrentPage('upload')
        break
      case 'upload-framework':
        if (isAuthenticated) setCurrentPage('upload-framework')
        break
      case 'framework':
        if (isAuthenticated) setCurrentPage('framework')
        break
      case 'framework-comparison':
        if (isAuthenticated) setCurrentPage('framework-comparison')
        break
      case 'framework-controls':
        if (isAuthenticated) setCurrentPage('framework-controls')
        break
      case 'ai-extractor':
        if (isAuthenticated) setCurrentPage('ai-extractor')
        break
      case 'comparison-results':
        if (isAuthenticated) {
          // Handle navigation with data
          if (typeof page === 'object' || arguments[1]) {
            const data = arguments[1] || {}
            if (data.jobId) setComparisonJobId(data.jobId)
            if (data.framework) setComparisonFramework(data.framework)
          }
          setCurrentPage('comparison-results')
        }
        break
      case 'reports':
        // Placeholder for reports page
        alert('Reports page - Coming soon!')
        console.log('Navigate to: Reports')
        break
      case 'settings':
        // Placeholder for settings page
        alert('Settings page - Coming soon!')
        console.log('Navigate to: Settings')
        break
      default:
        console.log('Navigate to:', page)
    }
  }

  function handleComparisonComplete(jobId, framework) {
    setComparisonJobId(jobId)
    setComparisonFramework(framework)
    setCurrentPage('comparison-results')
  }

  function handleBackToComparison() {
    setCurrentPage('framework-comparison')
  }

  function handleSeeControls(framework) {
    setFrameworkForControls(framework)
    setCurrentPage('framework-controls')
  }

  function handleBackToFrameworkSelection() {
    setCurrentPage('framework')
  }

  function handleNavigateToFrameworkFromBuilder(framework) {
    setFrameworkForControls(framework)
    setCurrentPage('framework-controls')
  }

  function handleThemeToggle() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    const root = document.documentElement
    if (newTheme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }

  // Apply theme on component mount
  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  // Handle successful login from Login page
  function handleLoginSuccess() {
    setCurrentPage('dashboard')
    setSuccessMessage('')
  }

  // Handle successful OTP verification
  function handleVerifySuccess() {
    setCurrentPage('dashboard')
  }

  return (
    <CustomFrameworkProvider>
        <div className="app-layout">
          {/* Public Routes - Only accessible when NOT authenticated */}
          {currentPage === 'login' && (
            <PublicRoute onNavigate={handleNavigate}>
              <Login
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
                onLoginSuccess={handleLoginSuccess}
              />
            </PublicRoute>
          )}

          {currentPage === 'register' && (
            <PublicRoute onNavigate={handleNavigate}>
              <Register
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
              />
            </PublicRoute>
          )}

          {currentPage === 'verify-otp' && (
            <PublicRoute onNavigate={handleNavigate}>
              <VerifyOTP
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
                onVerifySuccess={handleVerifySuccess}
              />
            </PublicRoute>
          )}

          {currentPage === 'forgot-password' && (
            <PublicRoute onNavigate={handleNavigate}>
              <ForgotPassword
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
              />
            </PublicRoute>
          )}

          {currentPage === 'reset-password' && (
            <PublicRoute onNavigate={handleNavigate}>
              <ResetPassword
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
              />
            </PublicRoute>
          )}

          {currentPage === 'resend-otp' && (
            <PublicRoute onNavigate={handleNavigate}>
              <ResendOTP
                onNavigate={handleNavigate}
                theme={theme}
                onThemeToggle={handleThemeToggle}
              />
            </PublicRoute>
          )}

          {/* Protected Routes - Only accessible when authenticated */}
          <ProtectedRoute onNavigate={handleNavigate}>
            {isAuthenticated && (
              <>
                <Navigation
                  currentPage={currentPage}
                  onNavigate={handleNavigate}
                  onThemeToggle={handleThemeToggle}
                  onLogout={handleLogout}
                  theme={theme}
                />

                <main className="main-content">
                  {/* Success message after password reset */}
                  {successMessage && currentPage === 'login' && (
                    <div style={{
                      position: 'fixed',
                      top: '20px',
                      right: '20px',
                      zIndex: 9999,
                      padding: 'var(--spacing-md)',
                      background: 'var(--success-bg)',
                      color: 'var(--success)',
                      border: '1px solid var(--success)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)'
                    }}>
                      {successMessage}
                    </div>
                  )}

                  {currentPage === 'dashboard' && (
                    <Dashboard
                      onNavigate={handleNavigate}
                      theme={theme}
                    />
                  )}
                  {currentPage === 'upload' && (
                    <UploadDocument
                      onFileUpload={handleFileUpload}
                      onNavigate={handleNavigate}
                      onComparisonComplete={handleComparisonComplete}
                    />
                  )}
                  {currentPage === 'upload-framework' && (
                    <UploadFramework
                      onFrameworkUpload={handleFrameworkUpload}
                      onNavigate={handleNavigate}
                    />
                  )}
                  {currentPage === 'framework-comparison' && currentUploadedFramework && (
                    <FrameworkComparison
                      uploadedFramework={currentUploadedFramework}
                      onDocumentUpload={handleDocumentUpload}
                      onNavigate={handleNavigate}
                      onBack={() => setCurrentPage('upload-framework')}
                    />
                  )}
                  {currentPage === 'framework' && (
                    <FrameworkSelection
                      selectedFile={selectedFile}
                      uploadedFrameworks={uploadedFrameworks}
                      onFrameworkSelect={handleFrameworkSelect}
                      onBack={handleBackToUpload}
                      onNavigate={handleNavigate}
                      onSeeControls={handleSeeControls}
                    />
                  )}
                  {currentPage === 'framework-controls' && frameworkForControls && (
                    <FrameworkControls
                      framework={frameworkForControls}
                      onBack={handleBackToFrameworkSelection}
                      onNavigate={handleNavigate}
                    />
                  )}
                  {currentPage === 'details' && (
                    <FrameworkDetails
                      selectedFramework={selectedFramework}
                      selectedFile={selectedFile}
                      uploadedFrameworks={uploadedFrameworks}
                      onBack={handleBackToComparison}
                      onNavigate={handleNavigate}
                    />
                  )}
                  {currentPage === 'comparison-results' && comparisonJobId && (
                    <ComparisonResults
                      jobId={comparisonJobId}
                      framework={comparisonFramework}
                      onNavigate={handleNavigate}
                      onBack={() => setCurrentPage('upload')}
                    />
                  )}
                  {currentPage === 'ai-extractor' && (
                    <AIFrameworkExtractor
                      onNavigate={handleNavigate}
                      onFrameworkCreated={(framework) => {
                        console.log('AI Framework created:', framework)
                        // Optionally navigate to frameworks after creation
                      }}
                    />
                  )}
                </main>
              </>
            )}
          </ProtectedRoute>

          {/* Custom Framework Builder Modal */}
          <CustomFrameworkBuilder onNavigateToFramework={handleNavigateToFrameworkFromBuilder} />
        </div>
    </CustomFrameworkProvider>
  )
}

export default App
