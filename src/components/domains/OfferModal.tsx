import { useState } from 'react';
import { Domain } from '@/types';
import { createOffer } from '@/api/offers';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

interface OfferModalProps {
  domain: Domain | null;
  onClose: () => void;
}

const OfferModal = ({ domain, onClose }: OfferModalProps) => {
  const { isAuthenticated, user } = useAuth();
  const [offerPrice, setOfferPrice] = useState<number>(150);
  const [isLoading, setIsLoading] = useState(false);

  if (!domain) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (offerPrice < 150) {
      toast.error('Minimum offer price is $150');
      return;
    }

    setIsLoading(true);
    try {
      await createOffer({
        domainId: domain._id,
        offerPrice,
      });
      toast.success('Offer submitted successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit offer');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="glass rounded-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Login Required</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Please login or create an account to make an offer on this domain.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-200 text-dark rounded-lg font-medium hover:bg-gray-300 smooth-transition"
            >
              Cancel
            </button>
            <a
              href="/login"
              className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition text-center"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass rounded-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Make an Offer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-gray-600">Domain</p>
          <p className="text-xl font-bold text-primary">{domain.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          {/* Offer Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Price (Minimum: $150)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                $
              </span>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Math.max(150, Number(e.target.value)))}
                min="150"
                step="10"
                className="w-full pl-8 pr-4 py-2 border border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {offerPrice < 150 && (
              <p className="text-xs text-red-500 mt-1">Minimum offer is $150</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-200 text-dark rounded-lg font-medium hover:bg-gray-300 smooth-transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || offerPrice < 150}
              className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferModal;
