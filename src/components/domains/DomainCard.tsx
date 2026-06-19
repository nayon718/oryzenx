import { useState } from 'react';
import { Domain } from '@/types';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBadgeCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface DomainCardProps {
  domain: Domain;
  onOffer?: (domain: Domain) => void;
}

const DomainCard = ({ domain, onOffer }: DomainCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const qualityBadgeColors = {
    excellent: 'from-green-400 to-emerald-500',
    good: 'from-blue-400 to-blue-500',
    average: 'from-yellow-400 to-amber-500',
    basic: 'from-gray-400 to-gray-500',
  };

  return (
    <GlassCard
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        {/* Domain Name */}
        <div>
          <h3 className="text-xl font-bold text-dark truncate mb-2">{domain.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{domain.description}</p>
        </div>

        {/* Rating & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-sm ${
                    i < Math.floor(domain.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({domain.rating})</span>
          </div>
          {domain.qualityBadge && (
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${
                qualityBadgeColors[domain.qualityBadge]
              }`}
            >
              <FontAwesomeIcon icon={faBadgeCheck} className="text-sm" />
              {domain.qualityBadge}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">${domain.price}</span>
          {domain.offerPrice && (
            <span className="text-sm text-gray-500 line-through">Ask: ${domain.askingPrice}</span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOffer?.(domain)}
          className={`w-full py-3 rounded-lg font-medium smooth-transition ${
            isHovered
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          Make Offer
        </button>
      </div>
    </GlassCard>
  );
};

export default DomainCard;
