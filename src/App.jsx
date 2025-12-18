import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CarReservations from './pages/CarReservations';
import Sales from './pages/Sales';
import AuthorPayments from './pages/AuthorPayments';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Simple router based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';

      switch (hash) {
        case '/':
          setCurrentPage('dashboard');
          break;
        case '/cars':
          setCurrentPage('cars');
          break;
        case '/sales':
          setCurrentPage('sales');
          break;
        case '/authors':
          setCurrentPage('authors');
          break;
        default:
          setCurrentPage('dashboard');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Prevent default link behavior and use hash navigation
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        window.location.hash = target.getAttribute('href');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'cars':
        return <CarReservations />;
      case 'sales':
        return <Sales />;
      case 'authors':
        return <AuthorPayments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <Layout>
        {renderPage()}
      </Layout>
    </AppProvider>
  );
}

export default App;
