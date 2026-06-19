import type { NextApiRequest, NextApiResponse } from 'next';

export interface ExtendedNextApiRequest extends NextApiRequest {
  user?: {
    _id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface ExtendedNextApiResponse<T = any> extends NextApiResponse<T> {
  statusCode?: number;
}