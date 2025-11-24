import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { AccordionItemData } from '../types';

interface AccordionProps {
  items: AccordionItemData[];
  variant?: 'default' | 'program';
}

export const Accordion: React.FC<AccordionProps> = ({ items, variant = 'default' }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        
        return (
          <div 
            key={item.id} 
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-primary bg-white ring-1 ring-primary/20 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className={`font-heading font-semibold text-lg ${isOpen ? 'text-primary' : 'text-textMain'}`}>
                {item.title}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-primary' : ''}`} 
              />
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-textSec border-t border-transparent">
                {Array.isArray(item.content) ? (
                  <ul className="space-y-3">
                    {item.content.map((line, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{item.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};