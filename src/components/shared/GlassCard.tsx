import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard = ({ children, className = '', onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl p-6 shadow-glass hover:shadow-lg smooth-transition hover:scale-105 cursor-pointer ${
        className
      }`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
