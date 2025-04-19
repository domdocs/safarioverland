import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DollarSign, Star, ArrowLeft, Info } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury vs Budget Safari Guide | Safari Overland',
  description: 'Compare luxury and budget safari experiences in Africa. Learn what you gain with premium options and how to maximize value at different price points.',
  keywords: 'luxury safari, budget safari, affordable safari, safari cost comparison, safari value, safari accommodation options, safari price points',
};

const LuxuryVsBudgetPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Luxury vs Budget Safaris</h1>
        <p className="text-lg text-muted-foreground">Understanding the differences and finding the right balance for your African adventure</p>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/images/resources/luxury-vs-budget-hero.jpg" 
            alt="Split image showing luxury safari lodge and budget tented camp" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Making the Right Choice</h2>
          <p className="mb-4">
            African safaris span a wide range of price points, from affordable adventures to ultra-luxury experiences. This guide helps you understand what you gain at different budget levels and how to maximize value regardless of what you spend.
          </p>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-medium">Explore our safari value comparison below</span>
          </div>
        </div>
      </div>

      {/* Main Content - Add your detailed content here */}
      <div className="prose prose-lg max-w-none">
        <h2>Content Coming Soon</h2>
        <p>
          We're currently developing comprehensive content for this luxury vs budget safari comparison guide. 
          Check back soon for detailed information on:
        </p>
        <ul>
          <li>What you gain with premium safari experiences</li>
          <li>How to maximize value on a limited budget</li>
          <li>Accommodation comparison across budget levels</li>
          <li>Wildlife viewing expectations at different price points</li>
          <li>Where to splurge and where to save</li>
          <li>Mid-range options that offer the best of both worlds</li>
          <li>Sample itineraries at various budget levels</li>
        </ul>

        <div className="mt-12 flex items-center justify-between">
          <Link href="/resources/planning-guides" className="flex items-center text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Planning Guides</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link href="/resources/planning-guides/budgeting" className="text-primary hover:text-primary/80">
              Related: Safari Budget Planning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryVsBudgetPage;