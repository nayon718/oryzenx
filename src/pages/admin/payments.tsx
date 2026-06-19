import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const AdminPaymentsPage = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  const handleApprove = (id: string) => {
    // Update payment status to approved
  };

  const handleReject = (id: string) => {
    // Update payment status to rejected
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp pb-24">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient">Payment Management</h1>
          <p className="text-gray-600">Review and manage cryptocurrency payments</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-500">12</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-500">48</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="space-y-2">
              <p className="text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-red-500">5</p>
            </div>
          </GlassCard>
        </div>

        {/* Payments Table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-bold">User</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Currency</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((payment: any) => (
                    <tr key={payment._id} className="border-b border-gray-100 hover:bg-white/50">
                      <td className="px-6 py-4">{payment.userEmail}</td>
                      <td className="px-6 py-4 font-medium">${payment.amount}</td>
                      <td className="px-6 py-4">{payment.currency}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : payment.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(payment._id)}
                              className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={() => handleReject(payment._id)}
                              className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Crypto Wallets */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4">Cryptocurrency Wallets</h3>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">USDT (BEP20)</p>
              <p className="font-mono text-sm break-all">0x79395cbf73a98c48bfa53480d16cd5b428b5aff9</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">TRX / TRC20</p>
              <p className="font-mono text-sm break-all">TLKZgeHU45vMuZcHeEHQ95GZQ2UhB3cfxV</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default AdminPaymentsPage;
