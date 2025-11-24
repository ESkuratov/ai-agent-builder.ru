import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  background = 'white' 
}) => {
  const bgClass = background === 'gray' ? 'bg-surface' : 'bg-white';
  
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, center = true }) => (
  <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold font-heading text-textMain mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-textSec max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
    <div className={`h-1.5 w-20 bg-primary rounded-full mt-6 ${center ? 'mx-auto' : ''}`} />
  </div>
);