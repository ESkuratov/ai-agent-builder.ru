import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | string[]; // Can be a paragraph or a list of items
}

export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}