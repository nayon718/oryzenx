import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLock, faHistory, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        address: user.address,
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-slideUp">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gradient">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <GlassCard>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={"fa-user"} className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="mt-3 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details */}
            <GlassCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Account Details</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-primary hover:text-secondary smooth-transition"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-primary/30 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="cursor-pointer hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faHistory} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">My Offers</p>
                    <p className="font-bold">5 Active</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="cursor-pointer hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faCreditCard} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Payments</p>
                    <p className="font-bold">2 Pending</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
