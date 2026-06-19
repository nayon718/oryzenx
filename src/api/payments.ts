import api from './client';
import { ApiResponse } from '@/types';

export interface PaymentData {
  offerId: string;
  amount: number;
  currency: 'USDT' | 'TRX';
  proofImage: string;
}

// Create payment
export const createPayment = async (data: PaymentData) => {
  const response = await api.post<ApiResponse<any>>('/api/payments', data);
  return response.data;
};

// Get user payments
export const getUserPayments = async () => {
  const response = await api.get<ApiResponse<any[]>>('/api/payments/my-payments');
  return response.data;
};

// Get all payments (admin only)
export const getAllPayments = async (page = 1, limit = 20) => {
  const response = await api.get<ApiResponse<any[]>>('/api/payments', {
    params: { page, limit },
  });
  return response.data;
};

// Approve payment (admin only)
export const approvePayment = async (id: string) => {
  const response = await api.put<ApiResponse<any>>(`/api/payments/${id}/approve`);
  return response.data;
};

// Reject payment (admin only)
export const rejectPayment = async (id: string, reason: string) => {
  const response = await api.put<ApiResponse<any>>(`/api/payments/${id}/reject`, {
    reason,
  });
  return response.data;
};
