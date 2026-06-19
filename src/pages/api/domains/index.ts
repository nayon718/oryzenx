import type { NextApiRequest, NextApiResponse } from 'next';

// Mock domains - replace with actual database
const domains = [
  {
    _id: '1',
    name: 'tech.com',
    price: 5000,
    askingPrice: 7500,
    offerPrice: 6000,
    rating: 4.8,
    qualityBadge: 'excellent',
    description: 'Perfect tech domain',
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: '2',
    name: 'startup.io',
    price: 3000,
    rating: 4.5,
    qualityBadge: 'good',
    description: 'Great for startups',
    isAvailable: true,
    createdAt: new Date(),
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, limit = 20, q } = req.query;

    try {
      let result = domains;

      // Search functionality
      if (q) {
        const searchTerm = (q as string).toLowerCase();
        result = domains.filter(
          d =>
            d.name.toLowerCase().includes(searchTerm) ||
            d.description.toLowerCase().includes(searchTerm)
        );
      }

      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedResult = result.slice(startIndex, startIndex + Number(limit));

      res.status(200).json({
        success: true,
        message: 'Domains fetched successfully',
        data: paginatedResult,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: result.length,
          pages: Math.ceil(result.length / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching domains',
      });
    }
  } else if (req.method === 'POST') {
    // Add domain - admin only
    try {
      const newDomain = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date(),
      };

      domains.push(newDomain);

      res.status(201).json({
        success: true,
        message: 'Domain added successfully',
        data: newDomain,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding domain',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
