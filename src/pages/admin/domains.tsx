import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const AdminDomainsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    askingPrice: 0,
    offerPrice: 0,
    rating: 5,
    qualityBadge: 'good',
    description: '',
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [user]);

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call to add domain
      const response = await fetch('/api/admin/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({
          name: '',
          price: 0,
          askingPrice: 0,
          offerPrice: 0,
          rating: 5,
          qualityBadge: 'good',
          description: '',
        });
        // Refresh domains
      }
    } catch (error) {
      console.error('Error adding domain:', error);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient">Domain Management</h1>
            <p className="text-gray-600">Manage all premium domains</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Domain
          </button>
        </div>

        {/* Domains Table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-bold">Domain</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Quality</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {domains.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                      No domains found
                    </td>
                  </tr>
                ) : (
                  domains.map((domain: any) => (
                    <tr key={domain._id} className="border-b border-gray-100 hover:bg-white/50">
                      <td className="px-6 py-4 font-medium">{domain.name}</td>
                      <td className="px-6 py-4">${domain.price}</td>
                      <td className="px-6 py-4">{domain.rating}/5</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary`}>
                          {domain.qualityBadge}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="p-2 hover:bg-primary/10 rounded text-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded text-red-500">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Add Domain Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <GlassCard className="w-full max-w-md">
              <form onSubmit={handleAddDomain} className="space-y-4">
                <h2 className="text-2xl font-bold">Add New Domain</h2>
                
                <input
                  type="text"
                  placeholder="Domain name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                />
                
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                />

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                />

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
                    Add Domain
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

export default AdminDomainsPage;
