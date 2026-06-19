import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/api/middleware/auth';

// Mock user database - replace with actual database
const users: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, address, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = {
        _id: Date.now().toString(),
        name,
        email,
        address,
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
      };

      users.push(newUser);

      // Generate token
      const token = generateToken(newUser._id, newUser.email, newUser.role);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          token,
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Signup failed',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
