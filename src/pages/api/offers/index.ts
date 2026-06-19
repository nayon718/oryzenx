import type { NextApiRequest, NextApiResponse } from 'next';

// Mock offers - replace with actual database
const offers: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { domainId, offerPrice } = req.body;
    const userEmail = req.headers['x-user-email'] as string;

    try {
      // Validate offer price
      if (offerPrice < 150) {
        return res.status(400).json({
          success: false,
          message: 'Minimum offer price is $150',
        });
      }

      // Create offer
      const newOffer = {
        _id: Date.now().toString(),
        domainId,
        userEmail,
        offerPrice,
        status: 'pending',
        createdAt: new Date(),
      };

      offers.push(newOffer);

      // TODO: Notify admin of new offer
      // TODO: Send confirmation email to user

      res.status(201).json({
        success: true,
        message: 'Offer submitted successfully',
        data: newOffer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating offer',
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20 } = req.query;

      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedOffers = offers.slice(startIndex, startIndex + Number(limit));

      res.status(200).json({
        success: true,
        message: 'Offers fetched successfully',
        data: paginatedOffers,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: offers.length,
          pages: Math.ceil(offers.length / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching offers',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
