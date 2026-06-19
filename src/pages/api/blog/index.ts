import type { NextApiRequest, NextApiResponse } from 'next';

// Mock blog posts - replace with actual database
const blogPosts = [
  {
    _id: '1',
    title: 'How to Choose the Perfect Domain',
    slug: 'how-to-choose-perfect-domain',
    content: 'Content here...',
    excerpt: 'Learn the tips and tricks for selecting the best domain name',
    image: 'https://via.placeholder.com/600x400',
    category: 'Domains',
    language: 'en',
    author: 'Oryzenx Team',
    reactions: 24,
    views: 1250,
    published: true,
    createdAt: new Date(),
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, limit = 10, language = 'en', q } = req.query;

    try {
      let result = blogPosts.filter(p => p.language === language && p.published);

      // Search
      if (q) {
        const searchTerm = (q as string).toLowerCase();
        result = result.filter(
          p =>
            p.title.toLowerCase().includes(searchTerm) ||
            p.content.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
      }

      const startIndex = (Number(page) - 1) * Number(limit);
      const paginatedResult = result.slice(startIndex, startIndex + Number(limit));

      res.status(200).json({
        success: true,
        message: 'Blog posts fetched successfully',
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
        message: 'Error fetching blog posts',
      });
    }
  } else if (req.method === 'POST') {
    // Create blog post - admin only
    try {
      const newPost = {
        _id: Date.now().toString(),
        slug: (req.body.title as string).toLowerCase().replace(/\s+/g, '-'),
        ...req.body,
        createdAt: new Date(),
      };

      blogPosts.push(newPost);

      res.status(201).json({
        success: true,
        message: 'Blog post created successfully',
        data: newPost,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating blog post',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
