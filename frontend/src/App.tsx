import { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { MedilyticsLanding } from './components/MedilyticsLanding';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { MedicineAnalysis } from './components/MedicineAnalysis';
import { ReportAnalysis } from './components/ReportAnalysis';
import { PrescriptionAnalysis } from './components/PrescriptionAnalysis';
import { Documents } from './components/Documents';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'login' | 'dashboard' | 'medicine' | 'report' | 'prescription' | 'documents';

interface User {
  email: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {currentPage === 'landing' && (
          <MedilyticsLanding onGetStarted={handleGetStarted} />
        )}

        {currentPage === 'login' && (
          <LoginPage onLogin={handleLogin} />
        )}

        {currentPage === 'dashboard' && user && (
          <Dashboard
            user={user}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentPage === 'medicine' && (
          <MedicineAnalysis onBack={() => handleNavigate('dashboard')} />
        )}

        {currentPage === 'report' && (
          <ReportAnalysis onBack={() => handleNavigate('dashboard')} />
        )}

        {currentPage === 'prescription' && (
          <PrescriptionAnalysis onBack={() => handleNavigate('dashboard')} />
        )}

        {currentPage === 'documents' && (
          <Documents onBack={() => handleNavigate('dashboard')} />
        )}

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
