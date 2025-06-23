import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceRequest, ServiceResponse, ChatMessage, ServiceCategory } from '../types';

interface AppContextType {
  serviceRequests: ServiceRequest[];
  myServiceRequests: ServiceRequest[];
  chatMessages: ChatMessage[];
  activeChat: string | null;
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'responses'>) => void;
  respondToService: (serviceId: string, response: Omit<ServiceResponse, 'id' | 'createdAt'>) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setActiveChat: (chatId: string | null) => void;
  getServicesByCategory: (category: ServiceCategory) => ServiceRequest[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      title: 'Réparation robinet cuisine',
      description: 'Mon robinet de cuisine fuit depuis plusieurs jours. Il faut le réparer ou le remplacer.',
      category: 'plomberie',
      clientId: '2',
      client: {
        id: '2',
        email: 'marie@example.com',
        firstName: 'Marie',
        lastName: 'Martin',
        phone: '+687 987654',
        userType: 'particulier',
        verified: true,
        createdAt: new Date(),
      },
      location: 'Nouméa Centre',
      budget: 15000,
      urgency: 'haute',
      status: 'ouvert',
      createdAt: new Date(),
      responses: [],
    },
    {
      id: '2',
      title: 'Entretien jardin',
      description: 'Besoin de tailler les haies et tondre la pelouse. Jardin de taille moyenne.',
      category: 'jardinage',
      clientId: '3',
      client: {
        id: '3',
        email: 'paul@example.com',
        firstName: 'Paul',
        lastName: 'Dubois',
        phone: '+687 456789',
        userType: 'particulier',
        verified: true,
        createdAt: new Date(),
      },
      location: 'Dumbéa',
      budget: 8000,
      urgency: 'moyenne',
      status: 'ouvert',
      createdAt: new Date(),
      responses: [],
    },
  ]);

  const [myServiceRequests, setMyServiceRequests] = useState<ServiceRequest[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const addServiceRequest = (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'responses'>) => {
    const newRequest: ServiceRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date(),
      responses: [],
    };
    
    setServiceRequests(prev => [...prev, newRequest]);
    setMyServiceRequests(prev => [...prev, newRequest]);
  };

  const respondToService = (serviceId: string, response: Omit<ServiceResponse, 'id' | 'createdAt'>) => {
    const newResponse: ServiceResponse = {
      ...response,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setServiceRequests(prev =>
      prev.map(service =>
        service.id === serviceId
          ? { ...service, responses: [...service.responses, newResponse] }
          : service
      )
    );
  };

  const sendMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setChatMessages(prev => [...prev, newMessage]);
  };

  const getServicesByCategory = (category: ServiceCategory) => {
    return serviceRequests.filter(service => service.category === category && service.status === 'ouvert');
  };

  return (
    <AppContext.Provider
      value={{
        serviceRequests,
        myServiceRequests,
        chatMessages,
        activeChat,
        addServiceRequest,
        respondToService,
        sendMessage,
        setActiveChat,
        getServicesByCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};