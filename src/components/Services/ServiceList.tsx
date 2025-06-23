import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, ServiceRequest } from '../../types';
import { MapPin, Clock, DollarSign, User, MessageCircle } from 'lucide-react';

interface ServiceListProps {
  category?: ServiceCategory;
}

const ServiceList: React.FC<ServiceListProps> = ({ category }) => {
  const { user } = useAuth();
  const { serviceRequests, getServicesByCategory, respondToService } = useApp();

  const services = category 
    ? getServicesByCategory(category)
    : serviceRequests.filter(s => s.status === 'ouvert');

  const handleRespond = async (serviceId: string) => {
    if (!user || user.userType !== 'artisan') return;

    const message = prompt('Votre message pour le client:');
    const price = prompt('Votre prix proposé (XPF):');
    const duration = prompt('Durée estimée:');

    if (message && price && duration) {
      respondToService(serviceId, {
        artisanId: user.id,
        artisan: user as any,
        serviceRequestId: serviceId,
        message,
        proposedPrice: parseInt(price),
        estimatedDuration: duration,
        status: 'en_attente',
      });
      
      alert('Votre réponse a été envoyée !');
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      plomberie: 'bg-blue-100 text-blue-800',
      electricite: 'bg-yellow-100 text-yellow-800',
      jardinage: 'bg-green-100 text-green-800',
      menuiserie: 'bg-orange-100 text-orange-800',
      peinture: 'bg-purple-100 text-purple-800',
      nettoyage: 'bg-pink-100 text-pink-800',
    };
    return colors[cat as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {category 
            ? `Services - ${category.charAt(0).toUpperCase() + category.slice(1)}`
            : 'Tous les services disponibles'
          }
        </h2>
        <p className="text-gray-600 mt-1">
          {services.length} service{services.length !== 1 ? 's' : ''} disponible{services.length !== 1 ? 's' : ''}
        </p>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(service.urgency)}`}>
                        {service.urgency}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {service.client.firstName} {service.client.lastName}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {service.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {service.createdAt.toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-lg font-semibold text-gray-900">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {service.budget.toLocaleString()} XPF
                  </div>
                  
                  {user?.userType === 'artisan' && (
                    <button
                      onClick={() => handleRespond(service.id)}
                      className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Répondre
                    </button>
                  )}
                </div>

                {service.responses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      {service.responses.length} réponse{service.responses.length !== 1 ? 's' : ''} reçue{service.responses.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun service disponible
            </h3>
            <p className="text-gray-500">
              {category 
                ? `Aucun service dans la catégorie ${category} pour le moment.`
                : 'Aucun service disponible pour le moment.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;