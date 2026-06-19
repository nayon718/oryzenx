import { useEffect, useState } from 'react';
import { getBlogPosts, addReaction } from '@/api/blog';
import { BlogPost } from '@/types';
import BlogCard from '@/components/blog/BlogCard';
import Layout from '@/components/shared/Layout';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    fetchPosts();
  }, [language]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getBlogPosts(1, 12, language);
      setPosts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = async (postId: string) => {
    try {
      await addReaction(postId, 'love');
      setPosts(posts.map(p => 
        p._id === postId ? { ...p, reactions: p.reactions + 1 } : p
      ));
      toast.success('Reaction added!');
    } catch (error) {
      toast.error('Failed to add reaction');
    }
  };

  if (isLoading && posts.length === 0) return <Loading />;

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Blog</h1>
          <p className="text-gray-600 text-lg">Read our latest insights and stories</p>
          
          {/* Language Selector */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                language === 'en'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                language === 'bn'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              onReaction={handleReaction}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;
