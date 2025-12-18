import { useApp } from '../context/AppContext';
import { EMPLOYEES } from '../data/mockData';

const Layout = ({ children }) => {
  const { currentUser, setCurrentUser, resetDemoData } = useApp();

  const switchRole = (role) => {
    const user = EMPLOYEES.find(emp => emp.role === role);
    if (user) {
      setCurrentUser({ role: user.role, name: user.name });
    }
  };

  const currentPath = window.location.hash.slice(1) || '/';

  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-secondary-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-secondary-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center mr-8">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-secondary-900">Publishing Co.</h1>
                  <span className="text-xs text-secondary-500 font-medium">Internal System</span>
                </div>
              </div>
              <div className="hidden md:flex space-x-1">
                <a
                  href="/"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/') && currentPath === '/'
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </a>
                <a
                  href="/cars"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/cars')
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  Car Reservations
                </a>
                <a
                  href="/sales"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/sales')
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Sales
                </a>
                {currentUser.role === 'manager' && (
                  <a
                    href="/authors"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/authors')
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Author Payments
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Role Switcher for Demo */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-secondary-50 rounded-lg border border-secondary-200">
                <span className="text-xs font-medium text-secondary-600">View as:</span>
                <button
                  onClick={() => switchRole('sales')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    currentUser.role === 'sales'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-200'
                  }`}
                >
                  Sales Rep
                </button>
                <button
                  onClick={() => switchRole('manager')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    currentUser.role === 'manager'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-200'
                  }`}
                >
                  Manager
                </button>
              </div>

              {/* Current User */}
              <div className="flex items-center space-x-3 pl-3 border-l border-secondary-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                    <span className="text-white text-sm font-bold">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-secondary-900">{currentUser.name}</div>
                    <div className="text-xs text-secondary-500 capitalize">{currentUser.role}</div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetDemoData}
                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all duration-200"
                title="Reset demo data"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-secondary-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Internal Demo System · Not for production use</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
