import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/api/middleware/auth';

// Mock user database - replace with actual database
const users: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find user - in production, query database
      const user = users.find(u => u.email === email);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Generate token
      const token = generateToken(user._id, user.email, user.role);

      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
