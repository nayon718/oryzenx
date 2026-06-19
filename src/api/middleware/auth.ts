import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    _id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateToken = (userId: string, email: string, role: 'user' | 'admin') => {
  return jwt.sign(
    { _id: userId, email, role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

export const withAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => {
  return (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No authorization header' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      req.user = decoded as any;
      handler(req, res);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Authentication error' });
    }
  };
};

export const withAdmin = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => {
  return withAuth((req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    handler(req, res);
  });
};
