import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ServiceRequestForm from './components/Services/ServiceRequestForm';
import ServiceList from './components/Services/ServiceList';
import ChatInterface from './components/Chat/ChatInterface';
import ProfileManagement from './components/Profile/ProfileManagement';

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'create-service':
        return <ServiceRequestForm />;
      case 'my-services':
        return <ServiceList />;
      case 'all-services':
        return <ServiceList />;
      case 'plomberie':
        return <ServiceList category="plomberie" />;
      case 'electricite':
        return <ServiceList category="electricite" />;
      case 'jardinage':
        return <ServiceList category="jardinage" />;
      case 'menuiserie':
        return <ServiceList category="menuiserie" />;
      case 'peinture':
        return <ServiceList category="peinture" />;
      case 'nettoyage':
        return <ServiceList category="nettoyage" />;
      case 'messages':
        return <ChatInterface />;
      case 'profile':
        return <ProfileManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;