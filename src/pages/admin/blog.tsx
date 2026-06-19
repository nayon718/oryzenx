import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminBlogPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    language: 'en',
  });

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ title: '', content: '', excerpt: '', category: '', language: 'en' });
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient">Blog Management</h1>
            <p className="text-gray-600">Create and manage blog posts</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition"
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Post
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No blog posts yet</p>
            </div>
          ) : (
            posts.map((post: any) => (
              <GlassCard key={post._id}>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* Create Post Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleAddPost} className="space-y-4">
                <h2 className="text-2xl font-bold">Create New Blog Post</h2>

                <input
                  type="text"
                  placeholder="Post title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                />

                <textarea
                  placeholder="Post excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg resize-none"
                />

                <textarea
                  placeholder="Post content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg resize-none"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                />

                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="bn">Bangla</option>
                </select>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 bg-gray-200 text-dark rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminBlogPage;
