import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/api/middleware/auth';

// Mock data - replace with actual database
const forgotPasswordRequests: any[] = [];

function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Create forgot password request
      const request = {
        _id: Date.now().toString(),
        email,
        token: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      forgotPasswordRequests.push(request);

      // TODO: Send email with reset link
      // TODO: Notify admin

      res.status(200).json({
        success: true,
        message: 'Forgot password request submitted. Admin will contact you within 24 hours.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error processing forgot password request',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;
