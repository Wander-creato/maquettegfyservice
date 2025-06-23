import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { serviceRequests, myServiceRequests } = useApp();

  const isArtisan = user?.userType === 'artisan';

  const stats = [
    {
      title: isArtisan ? 'Services disponibles' : 'Mes demandes',
      value: isArtisan ? serviceRequests.length : myServiceRequests.length,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: isArtisan ? 'Réponses envoyées' : 'Réponses reçues',
      value: isArtisan ? 5 : 8,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: isArtisan ? 'Taux de succès' : 'Services complétés',
      value: isArtisan ? '85%' : 3,
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
    {
      title: 'En attente',
      value: 2,
      icon: Clock,
      color: 'bg-purple-500',
    },
  ];

  const recentServices = isArtisan 
    ? serviceRequests.slice(0, 3)
    : myServiceRequests.slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bonjour {user?.firstName} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          {isArtisan 
            ? 'Voici un aperçu de vos opportunités de services'
            : 'Voici un aperçu de vos demandes de services'
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {isArtisan ? 'Services récents' : 'Mes demandes récentes'}
          </h2>
        </div>
        
        <div className="p-6">
          {recentServices.length > 0 ? (
            <div className="space-y-4">
              {recentServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {service.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {service.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {service.budget.toLocaleString()} XPF
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        service.urgency === 'haute' 
                          ? 'bg-red-100 text-red-800'
                          : service.urgency === 'moyenne'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {service.urgency}
                      </span>
                    </div>
                    
                    {isArtisan && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 mr-1" />
                        {service.responses.length} réponses
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {isArtisan 
                  ? 'Aucun service disponible pour le moment'
                  : 'Vous n\'avez pas encore créé de demande de service'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;