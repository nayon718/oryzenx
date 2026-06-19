import api from './client';
import { BlogPost, ApiResponse } from '@/types';

// Get all blog posts
export const getBlogPosts = async (page = 1, limit = 10, language = 'en') => {
  const response = await api.get<ApiResponse<BlogPost[]>>('/api/blog', {
    params: { page, limit, language },
  });
  return response.data;
};

// Get single blog post
export const getBlogPost = async (slug: string) => {
  const response = await api.get<ApiResponse<BlogPost>>(`/api/blog/${slug}`);
  return response.data;
};

// Create blog post (admin only)
export const createBlogPost = async (data: Partial<BlogPost>) => {
  const response = await api.post<ApiResponse<BlogPost>>('/api/blog', data);
  return response.data;
};

// Update blog post (admin only)
export const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
  const response = await api.put<ApiResponse<BlogPost>>(`/api/blog/${id}`, data);
  return response.data;
};

// Delete blog post (admin only)
export const deleteBlogPost = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/api/blog/${id}`);
  return response.data;
};

// Get blog posts by category
export const getBlogByCategory = async (category: string, page = 1, limit = 10) => {
  const response = await api.get<ApiResponse<BlogPost[]>>('/api/blog/category', {
    params: { category, page, limit },
  });
  return response.data;
};

// Add reaction to post
export const addReaction = async (postId: string, type: string) => {
  const response = await api.post<ApiResponse<{ count: number }>>(
    `/api/blog/${postId}/reactions`,
    { type }
  );
  return response.data;
};
