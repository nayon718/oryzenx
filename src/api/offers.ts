import api from './client';
import { Offer, ApiResponse } from '@/types';

// Create offer
export const createOffer = async (data: {
  domainId: string;
  offerPrice: number;
}) => {
  const response = await api.post<ApiResponse<Offer>>('/api/offers', data);
  return response.data;
};

// Get user offers
export const getUserOffers = async () => {
  const response = await api.get<ApiResponse<Offer[]>>('/api/offers/my-offers');
  return response.data;
};

// Get all offers (admin only)
export const getAllOffers = async (page = 1, limit = 20) => {
  const response = await api.get<ApiResponse<Offer[]>>('/api/offers', {
    params: { page, limit },
  });
  return response.data;
};

// Update offer status (admin only)
export const updateOfferStatus = async (id: string, status: string) => {
  const response = await api.put<ApiResponse<Offer>>(`/api/offers/${id}`, { status });
  return response.data;
};
