import api from './client';
import { Domain, Offer, ApiResponse } from '@/types';

// Get all domains
export const getDomains = async (page = 1, limit = 20) => {
  const response = await api.get<ApiResponse<Domain[]>>('/api/domains', {
    params: { page, limit },
  });
  return response.data;
};

// Get single domain
export const getDomain = async (id: string) => {
  const response = await api.get<ApiResponse<Domain>>(`/api/domains/${id}`);
  return response.data;
};

// Create domain (admin only)
export const createDomain = async (data: Partial<Domain>) => {
  const response = await api.post<ApiResponse<Domain>>('/api/domains', data);
  return response.data;
};

// Update domain (admin only)
export const updateDomain = async (id: string, data: Partial<Domain>) => {
  const response = await api.put<ApiResponse<Domain>>(`/api/domains/${id}`, data);
  return response.data;
};

// Delete domain (admin only)
export const deleteDomain = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/api/domains/${id}`);
  return response.data;
};

// Search domains
export const searchDomains = async (query: string) => {
  const response = await api.get<ApiResponse<Domain[]>>('/api/domains/search', {
    params: { q: query },
  });
  return response.data;
};
