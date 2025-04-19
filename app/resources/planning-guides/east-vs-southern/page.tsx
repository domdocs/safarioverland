import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'East vs Southern Africa: Choosing Your Safari Destination | Safari Overland',
  description: 'Compare East and Southern Africa safari destinations to decide which region best matches your wildlife viewing, budget, and experience preferences.',
  keywords: 'east africa vs southern africa, safari destination comparison, serengeti vs kruger, masai mara vs okavango, safari regions',
};

const EastVsSouthernPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">East vs Southern Africa: Choosing Your Safari Destination</h1>
      <p className="text-xl text-muted-foreground mb-12">Coming soon! A comprehensive comparison of East Africa and Southern Africa safari destinations.</p>
      
      <div className="flex justify-center">
        <Link 
          href="/resources/planning-guides" 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium transition-colors"
        >
          Back to Planning Guides
        </Link>
      </div>
    </div>
  );
};

export default EastVsSouthernPage; 