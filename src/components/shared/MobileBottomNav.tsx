import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBook, faSearch, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';

const MobileBottomNav = () => {
  const navItems = [
    { icon: faGlobe, label: 'Domains', href: '/domains' },
    { icon: faBook, label: 'Blog', href: '/blog' },
    { icon: faSearch, label: 'Search', href: '/search' },
    { icon: faWrench, label: 'Services', href: '/services' },
    { icon: faPhone, label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 glass">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium text-gray-600 hover:text-primary smooth-transition group"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-lg mb-1 group-hover:scale-110 smooth-transition"
            />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
