import api from './client';
import { ApiResponse } from '@/types';

// Upload and compress image
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<ApiResponse<{ url: string }>>(
    '/api/upload/image',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data?.url || '';
};

// Upload payment proof
export const uploadPaymentProof = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<ApiResponse<{ url: string }>>(
    '/api/upload/payment-proof',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data?.url || '';
};
