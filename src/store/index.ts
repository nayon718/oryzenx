import { create } from 'zustand';
import { Domain, BlogPost, Offer, Notification } from '@/types';

interface Store {
  // Domains
  domains: Domain[];
  setDomains: (domains: Domain[]) => void;
  addDomain: (domain: Domain) => void;
  updateDomain: (id: string, domain: Partial<Domain>) => void;
  deleteDomain: (id: string) => void;

  // Blog Posts
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;

  // Offers
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;

  // UI State
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<Store>((set) => ({
  // Domains
  domains: [],
  setDomains: (domains) => set({ domains }),
  addDomain: (domain) => set((state) => ({ domains: [...state.domains, domain] })),
  updateDomain: (id, domain) =>
    set((state) => ({
      domains: state.domains.map((d) => (d._id === id ? { ...d, ...domain } : d)),
    })),
  deleteDomain: (id) =>
    set((state) => ({
      domains: state.domains.filter((d) => d._id !== id),
    })),

  // Blog Posts
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p._id === id ? { ...p, ...post } : p)),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== id),
    })),

  // Offers
  offers: [],
  setOffers: (offers) => set({ offers }),
  addOffer: (offer) => set((state) => ({ offers: [...state.offers, offer] })),
  updateOffer: (id, offer) =>
    set((state) => ({
      offers: state.offers.map((o) => (o._id === id ? { ...o, ...offer } : o)),
    })),

  // Notifications
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
    })),

  // UI State
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
  sidebarOpen: false,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
