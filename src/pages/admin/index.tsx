import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faBook,
  faHandshake,
  faCreditCard,
  faBell,
  faUsers,
  faLock,
  faEnvelope,
  faCog,
  faBackup,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [user]);

  const menuItems = [
    { icon: faGlobe, label: 'Domain Management', href: '/admin/domains' },
    { icon: faBook, label: 'Blog Management', href: '/admin/blog' },
    { icon: faHandshake, label: 'Offer Management', href: '/admin/offers' },
    { icon: faCreditCard, label: 'Payment Management', href: '/admin/payments' },
    { icon: faBell, label: 'Notification Center', href: '/admin/notifications' },
    { icon: faUsers, label: 'User Management', href: '/admin/users' },
    { icon: faLock, label: 'Forgot Password Requests', href: '/admin/forgot-passwords' },
    { icon: faEnvelope, label: 'Contact Messages', href: '/admin/contact-messages' },
    { icon: faCog, label: 'Website Settings', href: '/admin/settings' },
    { icon: faBackup, label: 'Backup & Restore', href: '/admin/backup' },
  ];

  const stats = [
    { label: 'Total Domains', value: '5,234', color: 'from-blue-400 to-blue-600' },
    { label: 'Active Users', value: '10,456', color: 'from-green-400 to-green-600' },
    { label: 'Pending Offers', value: '342', color: 'from-yellow-400 to-yellow-600' },
    { label: 'Recent Transactions', value: '$2.5M', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp pb-24">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}. Manage your platform here.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard key={index}>
              <div className="space-y-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg`} />
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Menu Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Management Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <GlassCard className="hover:shadow-xl cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <FontAwesomeIcon icon={item.icon} className="text-lg text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-lg group-hover:text-primary smooth-transition">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Manage →</p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="font-medium">New offer received</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  New
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
