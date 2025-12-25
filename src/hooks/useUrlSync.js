import { useEffect, useCallback } from 'react'

/**
 * Custom hook to synchronize page state with browser URL
 * Uses the History API to update URLs and handle browser back/forward navigation
 * 
 * @param {string} currentPage - The current page state
 * @param {Function} setCurrentPage - Function to update the current page state
 * @param {boolean} isAuthenticated - Whether the user is authenticated
 */
export function useUrlSync(currentPage, setCurrentPage, isAuthenticated) {
  // Map of page names to URL paths
  const pageToPath = {
    'login': '/login',
    'register': '/register',
    'verify-otp': '/verify-otp',
    'forgot-password': '/forgot-password',
    'reset-password': '/reset-password',
    'resend-otp': '/resend-otp',
    'dashboard': '/dashboard',
    'upload': '/upload',
    'upload-framework': '/upload-framework',
    'framework': '/framework',
    'framework-comparison': '/framework-comparison',
    'framework-controls': '/framework-controls',
    'comparison-results': '/comparison-results',
    'details': '/details',
    'ai-extractor': '/ai-extractor',
    'reports': '/reports',
    'settings': '/settings'
  }

  // Map of URL paths to page names
  const pathToPage = Object.fromEntries(
    Object.entries(pageToPath).map(([page, path]) => [path, page])
  )

  // Public pages that don't require authentication
  const publicPages = ['login', 'register', 'verify-otp', 'forgot-password', 'reset-password', 'resend-otp']

  // Get page from URL path
  const getPageFromPath = useCallback((pathname) => {
    // Handle root path
    if (pathname === '/' || pathname === '') {
      return isAuthenticated ? 'dashboard' : 'login'
    }
    return pathToPage[pathname] || (isAuthenticated ? 'dashboard' : 'login')
  }, [isAuthenticated, pathToPage])

  // Initialize page from URL on mount
  useEffect(() => {
    const pathname = window.location.pathname
    const pageFromUrl = getPageFromPath(pathname)
    
    // Validate access based on authentication
    if (isAuthenticated && publicPages.includes(pageFromUrl)) {
      // Authenticated user on public page -> redirect to dashboard
      setCurrentPage('dashboard')
      window.history.replaceState({ page: 'dashboard' }, '', '/dashboard')
    } else if (!isAuthenticated && !publicPages.includes(pageFromUrl)) {
      // Unauthenticated user on protected page -> redirect to login
      setCurrentPage('login')
      window.history.replaceState({ page: 'login' }, '', '/login')
    } else if (pageFromUrl !== currentPage) {
      // Set page from URL
      setCurrentPage(pageFromUrl)
    }
  }, []) // Only run on mount

  // Update URL when currentPage changes
  useEffect(() => {
    const newPath = pageToPath[currentPage] || '/login'
    const currentPath = window.location.pathname

    // Only update if the path is different
    if (currentPath !== newPath) {
      window.history.pushState({ page: currentPage }, '', newPath)
    }
  }, [currentPage, pageToPath])

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const pageFromState = event.state?.page
      const pageFromPath = getPageFromPath(window.location.pathname)
      const targetPage = pageFromState || pageFromPath

      // Validate access
      if (isAuthenticated && publicPages.includes(targetPage)) {
        setCurrentPage('dashboard')
        window.history.replaceState({ page: 'dashboard' }, '', '/dashboard')
      } else if (!isAuthenticated && !publicPages.includes(targetPage)) {
        setCurrentPage('login')
        window.history.replaceState({ page: 'login' }, '', '/login')
      } else {
        setCurrentPage(targetPage)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isAuthenticated, getPageFromPath, setCurrentPage, publicPages])

  // Return a navigate function that updates both state and URL
  const navigate = useCallback((page) => {
    setCurrentPage(page)
  }, [setCurrentPage])

  return { navigate }
}

export default useUrlSync

