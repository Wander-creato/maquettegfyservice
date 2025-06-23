import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Briefcase, 
  Plus, 
  MessageCircle, 
  User, 
  Settings,
  Hammer,
  Scissors,
  Zap,
  Droplets,
  TreePine,
  Paintbrush
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    ...(user?.userType === 'particulier' ? [
      { id: 'create-service', label: 'Nouvelle demande', icon: Plus },
      { id: 'my-services', label: 'Mes demandes', icon: Briefcase },
    ] : []),
    ...(user?.userType === 'artisan' ? [
      { id: 'all-services', label: 'Tous les services', icon: Briefcase },
      { id: 'plomberie', label: 'Plomberie', icon: Droplets },
      { id: 'electricite', label: 'Électricité', icon: Zap },
      { id: 'jardinage', label: 'Jardinage', icon: TreePine },
      { id: 'menuiserie', label: 'Menuiserie', icon: Hammer },
      { id: 'peinture', label: 'Peinture', icon: Paintbrush },
      { id: 'nettoyage', label: 'Nettoyage', icon: Scissors },
    ] : []),
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <nav className="mt-8">
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {user?.userType === 'artisan' ? 'Espace Artisan' : 'Espace Particulier'}
          </h2>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 border-r-2 border-blue-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-900' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;