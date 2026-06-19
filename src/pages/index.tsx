import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faShieldAlt, faRocket } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: faStar,
      title: 'Premium Domains',
      description: 'Hand-picked domains curated for maximum value and potential',
    },
    {
      icon: faShieldAlt,
      title: 'Secure Transactions',
      description: 'Blockchain-based payments with transparent, secure processes',
    },
    {
      icon: faRocket,
      title: 'Easy Integration',
      description: 'Simple setup and integration with your existing systems',
    },
  ];

  return (
    <Layout>
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center -mx-4 px-4 md:rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 animate-slideUp">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">Premium Domain Marketplace</h1>
              <p className="text-xl text-gray-600 mb-4">
                Discover, bid, and own premium domains. Join thousands of satisfied customers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/domains"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:shadow-lg smooth-transition inline-flex items-center justify-center gap-2"
              >
                Explore Domains
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 glass text-primary rounded-lg font-bold text-lg hover:bg-white/20 smooth-transition inline-flex items-center justify-center gap-2"
              >
                Read Our Blog
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-gray-600">Premium Domains</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">$50M+</p>
                <p className="text-sm text-gray-600">Total Transactions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gradient">Why Choose Oryzenx?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need for domain success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className="text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto">
                    <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gradient">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Browse', desc: 'Explore thousands of premium domains' },
              { step: '2', title: 'Offer', desc: 'Place your bid on desired domains' },
              { step: '3', title: 'Verify', desc: 'Secure blockchain verification' },
              { step: '4', title: 'Own', desc: 'Complete the transaction and own it' },
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">
                  {item.step}
                </div>
                <GlassCard>
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass rounded-3xl p-12 md:p-16 text-center space-y-6 shadow-glass">
          <h2 className="text-4xl font-bold">Ready to Find Your Perfect Domain?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Start your journey with Oryzenx today and discover premium domains that match your vision.</p>
          <Link
            href="/domains"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:shadow-lg smooth-transition"
          >
            Explore Now
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
