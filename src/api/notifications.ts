import api from './client';
import { ApiResponse, Notification } from '@/types';

// Get notifications
export const getNotifications = async (page = 1, limit = 20) => {
  const response = await api.get<ApiResponse<Notification[]>>('/api/notifications', {
    params: { page, limit },
  });
  return response.data;
};

// Mark notification as read
export const markAsRead = async (id: string) => {
  const response = await api.put<ApiResponse<Notification>>(
    `/api/notifications/${id}/read`
  );
  return response.data;
};

// Delete notification
export const deleteNotification = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/api/notifications/${id}`);
  return response.data;
};

// Send notification (admin only)
export const sendNotification = async (data: {
  userId?: string;
  email?: string;
  title: string;
  message: string;
  type: string;
}) => {
  const response = await api.post<ApiResponse<Notification>>(
    '/api/notifications/send',
    data
  );
  return response.data;
};
