import type { NextApiRequest, NextApiResponse } from 'next';

// Mock contact messages - replace with actual database
const contactMessages: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const newMessage = {
        _id: Date.now().toString(),
        name,
        email,
        message,
        status: 'new',
        createdAt: new Date(),
      };

      contactMessages.push(newMessage);

      // TODO: Send confirmation email to user
      // TODO: Notify admin

      res.status(201).json({
        success: true,
        message: 'Message sent successfully. We will contact you soon.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error sending message',
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20 } = req.query;

      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedMessages = contactMessages.slice(
        startIndex,
        startIndex + Number(limit)
      );

      res.status(200).json({
        success: true,
        message: 'Contact messages fetched successfully',
        data: paginatedMessages,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: contactMessages.length,
          pages: Math.ceil(contactMessages.length / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching contact messages',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
