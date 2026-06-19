import type { NextApiRequest, NextApiResponse } from 'next';

// Mock payments - replace with actual database
const payments: any[] = [];

const CRYPTO_WALLETS = {
  USDT_BEP20: '0x79395cbf73a98c48bfa53480d16cd5b428b5aff9',
  TRX: 'TLKZgeHU45vMuZcHeEHQ95GZQ2UhB3cfxV',
  TRC20: 'TLKZgeHU45vMuZcHeEHQ95GZQ2UhB3cfxV',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { offerId, amount, currency, proofImage } = req.body;

    try {
      const newPayment = {
        _id: Date.now().toString(),
        offerId,
        amount,
        currency,
        proofImage,
        status: 'pending',
        createdAt: new Date(),
      };

      payments.push(newPayment);

      res.status(201).json({
        success: true,
        message: 'Payment submitted successfully. Please wait for admin approval.',
        data: newPayment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error processing payment',
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20 } = req.query;

      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedPayments = payments.slice(startIndex, startIndex + Number(limit));

      res.status(200).json({
        success: true,
        message: 'Payments fetched successfully',
        data: paginatedPayments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: payments.length,
          pages: Math.ceil(payments.length / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching payments',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
