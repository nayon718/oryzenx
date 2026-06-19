import { useState } from 'react';
import Layout from '@/components/shared/Layout';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faComment, faPaperPlane, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import GlassCard from '@/components/shared/GlassCard';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  const partners = [
    { name: 'Namecheap', logo: '🌐', url: 'https://namecheap.com' },
    { name: 'GoDaddy', logo: '🌍', url: 'https://godaddy.com' },
    { name: 'AWS', logo: '☁️', url: 'https://aws.amazon.com' },
  ];

  return (
    <Layout>
      <div className="space-y-12 animate-slideUp">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Contact Us</h1>
          <p className="text-gray-600 text-lg">We'd love to hear from you. Get in touch with us today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-gray-600 text-sm">123 Tech Street, Digital City, TC 12345</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faPhone} className="text-primary text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600 text-sm">info@oryzenx.com</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg smooth-transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>

        {/* Partners Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-2">Our Partners</h2>
            <p className="text-gray-600">Trusted by leading companies worldwide</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 flex flex-col items-center justify-center hover:scale-105 smooth-transition shadow-glass"
              >
                <div className="text-5xl mb-3">{partner.logo}</div>
                <p className="font-medium text-center">{partner.name}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
