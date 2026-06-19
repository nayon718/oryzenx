import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faMobileAlt,
  faPalette,
  faServer,
  faGlobe,
  faBrain,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const ServicesPage = () => {
  const services = [
    {
      icon: faCode,
      title: 'Web Development',
      description: 'Build powerful, scalable web applications with modern technologies.',
    },
    {
      icon: faMobileAlt,
      title: 'App Development',
      description: 'Create stunning native and cross-platform mobile applications.',
    },
    {
      icon: faPalette,
      title: 'UI/UX Design',
      description: 'Design beautiful and intuitive user interfaces that engage users.',
    },
    {
      icon: faServer,
      title: 'Hosting Solutions',
      description: 'Reliable and secure hosting for your applications and websites.',
    },
    {
      icon: faGlobe,
      title: 'Domain Solutions',
      description: 'Premium domains and complete domain management services.',
    },
    {
      icon: faBrain,
      title: 'Tech Consulting',
      description: 'Expert guidance for your technology strategy and implementation.',
    },
    {
      icon: faChartLine,
      title: 'Digital Marketing',
      description: 'Grow your online presence with effective digital marketing strategies.',
    },
  ];

  return (
    <Layout>
      <div className="space-y-12 animate-slideUp">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Our Services</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer comprehensive solutions for your digital needs. From development to consulting, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={index} className="group">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <FontAwesomeIcon icon={service.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="text-primary font-medium hover:text-secondary smooth-transition">
                  Learn More →
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass rounded-2xl p-12 text-center space-y-6 shadow-glass">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. Contact us today for a free consultation.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition">
            Contact Us
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
