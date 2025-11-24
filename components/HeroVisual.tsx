
import React from 'react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-full aspect-square flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-full blur-[60px] -z-10 transform scale-75" />
      
      {/* Main SVG Illustration */}
      <svg viewBox="0 0 500 450" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          {/* Gradients */}
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5A48E3" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          
          {/* Grid Pattern for the 'Canvas' look */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#94A3B8" fillOpacity="0.2" />
          </pattern>

          {/* Filters */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Window / Canvas */}
        <rect x="20" y="20" width="460" height="380" rx="16" fill="white" className="shadow-2xl" stroke="#E2E8F0" strokeWidth="1" />
        
        {/* Window Header */}
        <path d="M20 36C20 27.1634 27.1634 20 36 20H464C472.837 20 480 27.1634 480 36V60H20V36Z" fill="#F1F5F9" />
        <circle cx="45" cy="40" r="5" fill="#CBD5E1" />
        <circle cx="65" cy="40" r="5" fill="#CBD5E1" />
        <circle cx="85" cy="40" r="5" fill="#CBD5E1" />
        
        {/* Canvas Grid Background */}
        <rect x="20" y="60" width="460" height="340" fill="url(#gridPattern)" opacity="0.6" />

        {/* --- NODES AND CONNECTIONS --- */}

        {/* Connection: Trigger -> AI */}
        <path d="M130 210 C 160 210, 160 210, 190 210" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        {/* Moving dot 1 */}
        <circle r="4" fill="#5A48E3">
          <animateMotion dur="2s" repeatCount="indefinite" path="M130 210 C 160 210, 160 210, 190 210" />
        </circle>

        {/* Connection: AI -> Search */}
        <path d="M270 210 C 300 210, 300 130, 330 130" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        {/* Moving dot 2 (delayed) */}
        <circle r="4" fill="#10B981">
          <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M270 210 C 300 210, 300 130, 330 130" />
        </circle>

        {/* Connection: AI -> Database */}
        <path d="M270 210 C 300 210, 300 290, 330 290" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        {/* Moving dot 3 (delayed) */}
        <circle r="4" fill="#10B981">
          <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M270 210 C 300 210, 300 290, 330 290" />
        </circle>

        {/* Node 1: Trigger (Left) */}
        <g transform="translate(50, 170)">
          <rect width="80" height="80" rx="12" fill="white" stroke="#CBD5E1" strokeWidth="2" filter="url(#dropShadow)" />
          <rect x="10" y="10" width="20" height="20" rx="4" fill="#F1F5F9" />
          <text x="40" y="55" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#1E293B" textAnchor="middle">USER INPUT</text>
          <path d="M30 30 L50 30" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 40 L45 40" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Node 2: AI Processor (Center) */}
        <g transform="translate(190, 170)">
          <rect width="80" height="80" rx="12" fill="white" stroke="#5A48E3" strokeWidth="2" filter="url(#dropShadow)">
             {/* Pulse animation on border */}
             <animate attributeName="stroke-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </rect>
          
          {/* AI Icon */}
          <rect x="25" y="20" width="30" height="30" rx="6" fill="url(#primaryGradient)" />
          <path d="M35 35 L45 35" stroke="white" strokeWidth="2" />
          <path d="M40 30 L40 40" stroke="white" strokeWidth="2" />
          
          <text x="40" y="65" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#5A48E3" textAnchor="middle">LLM CORE</text>
        </g>

        {/* Node 3: Web Search (Top Right) */}
        <g transform="translate(330, 90)">
          <rect width="80" height="80" rx="12" fill="white" stroke="#CBD5E1" strokeWidth="2" filter="url(#dropShadow)" />
          <circle cx="40" cy="35" r="10" stroke="#10B981" strokeWidth="2" fill="none" />
          <line x1="47" y1="42" x2="52" y2="47" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <text x="40" y="65" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#64748B" textAnchor="middle">SEARCH</text>
        </g>

        {/* Node 4: Database (Bottom Right) */}
        <g transform="translate(330, 250)">
          <rect width="80" height="80" rx="12" fill="white" stroke="#CBD5E1" strokeWidth="2" filter="url(#dropShadow)" />
          <path d="M30 30 C30 27 50 27 50 30 V45 C50 48 30 48 30 45 Z" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <path d="M30 35 C30 38 50 38 50 35" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <text x="40" y="65" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#64748B" textAnchor="middle">RAG DB</text>
        </g>
      </svg>
    </div>
  );
};
