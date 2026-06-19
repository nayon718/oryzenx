import { useEffect, useState } from 'react';
import { getDomains } from '@/api/domains';
import { Domain } from '@/types';
import DomainCard from '@/components/domains/DomainCard';
import OfferModal from '@/components/domains/OfferModal';
import Layout from '@/components/shared/Layout';
import Loading from '@/components/shared/Loading';

const DomainsPage = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDomains();
  }, [page]);

  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      const response = await getDomains(page, 12);
      setDomains(response.data || []);
    } catch (error) {
      console.error('Failed to fetch domains:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && domains.length === 0) return <Loading />;

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Premium Domains</h1>
          <p className="text-gray-600 text-lg">Discover premium domain names for your next project</p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => (
            <DomainCard
              key={domain._id}
              domain={domain}
              onOffer={setSelectedDomain}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg disabled:opacity-50 smooth-transition hover:bg-primary/20"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600">Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg smooth-transition hover:shadow-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* Offer Modal */}
      <OfferModal domain={selectedDomain} onClose={() => setSelectedDomain(null)} />
    </Layout>
  );
};

export default DomainsPage;
