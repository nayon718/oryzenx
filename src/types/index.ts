// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Domain Types
export interface Domain {
  _id: string;
  name: string;
  price: number;
  askingPrice?: number;
  offerPrice?: number;
  rating: number;
  qualityBadge: 'excellent' | 'good' | 'average' | 'basic';
  description?: string;
  image?: string;
  category?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Offer Types
export interface Offer {
  _id: string;
  domainId: string;
  userId: string;
  userEmail: string;
  offerPrice: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Blog Post Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  language: 'en' | 'bn';
  author: string;
  reactions: number;
  views: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Reaction Types
export interface Reaction {
  _id: string;
  postId: string;
  userId: string;
  type: 'love' | 'like' | 'wow' | 'haha';
  createdAt: Date;
}

// Payment Types
export interface Payment {
  _id: string;
  userId: string;
  offerId: string;
  amount: number;
  currency: 'USDT' | 'TRX';
  walletAddress: string;
  proofImage: string;
  status: 'pending' | 'approved' | 'rejected';
  transactionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: Date;
}

// Contact Message Types
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

// Forgot Password Types
export interface ForgotPasswordRequest {
  _id: string;
  email: string;
  token: string;
  status: 'pending' | 'processed';
  createdAt: Date;
  expiresAt: Date;
}

// Admin Settings Types
export interface AdminSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  language: string;
  theme: 'light' | 'dark';
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Partner Types
export interface Partner {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}