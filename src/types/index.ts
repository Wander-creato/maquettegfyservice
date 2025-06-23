export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePhoto?: string;
  description?: string;
  userType: 'artisan' | 'particulier';
  verified: boolean;
  createdAt: Date;
}

export interface Artisan extends User {
  userType: 'artisan';
  ridetNumber: string;
  rcNumber: string;
  specialties: ServiceCategory[];
  rating: number;
  completedJobs: number;
}

export interface Particulier extends User {
  userType: 'particulier';
}

export type ServiceCategory = 'jardinage' | 'plomberie' | 'menuiserie' | 'electricite' | 'peinture' | 'nettoyage';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  clientId: string;
  client: Particulier;
  location: string;
  budget: number;
  urgency: 'basse' | 'moyenne' | 'haute';
  status: 'ouvert' | 'en_cours' | 'termine' | 'annule';
  createdAt: Date;
  responses: ServiceResponse[];
}

export interface ServiceResponse {
  id: string;
  artisanId: string;
  artisan: Artisan;
  serviceRequestId: string;
  message: string;
  proposedPrice: number;
  estimatedDuration: string;
  status: 'en_attente' | 'accepte' | 'refuse';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  serviceRequestId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}