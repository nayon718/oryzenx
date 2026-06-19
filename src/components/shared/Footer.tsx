import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <h3 className="text-xl font-bold">Oryzenx</h3>
            </div>
            <p className="text-gray-400 text-sm">Premium domain marketplace and blog platform</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/domains" className="hover:text-white smooth-transition">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white smooth-transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white smooth-transition">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white smooth-transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white smooth-transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white smooth-transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">Email: info@oryzenx.com</p>
            <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} Oryzenx. Made with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" />
            by Team Oryzenx
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
