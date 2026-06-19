import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faCheck, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';

const AdminOffersPage = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);

  const handleAccept = (id: string) => {
    // Accept offer and create payment
  };

  const handleReject = (id: string) => {
    // Reject offer
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp pb-24">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient">Offer Management</h1>
          <p className="text-gray-600">Review and manage domain offers</p>
        </div>

        {/* Offer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Total Offers</p>
              <p className="text-3xl font-bold text-primary">156</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-500">42</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Accepted</p>
              <p className="text-3xl font-bold text-green-500">98</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-red-500">16</p>
            </div>
          </GlassCard>
        </div>

        {/* Offers Table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-bold">Domain</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Offer Price</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">User Email</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                      No offers found
                    </td>
                  </tr>
                ) : (
                  offers.map((offer: any) => (
                    <tr key={offer._id} className="border-b border-gray-100 hover:bg-white/50">
                      <td className="px-6 py-4 font-medium">{offer.domainName}</td>
                      <td className="px-6 py-4">${offer.offerPrice}</td>
                      <td className="px-6 py-4 text-sm">{offer.userEmail}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            offer.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : offer.status === 'accepted'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {offer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {offer.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAccept(offer._id)}
                              className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={() => handleReject(offer._id)}
                              className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </>
                        )}
                        <button className="p-2 bg-primary/10 text-primary rounded hover:bg-primary/20">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default AdminOffersPage;
