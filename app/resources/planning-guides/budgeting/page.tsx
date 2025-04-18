import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calculator, DollarSign, Map, Calendar, ArrowLeft, Info } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safari Budget Planning Guide | Safari Overland',
  description: 'Comprehensive guide to safari costs across budget, mid-range and luxury tiers. Learn about typical costs for accommodation, transportation, activities, and get sample budgets for popular safari destinations.',
  keywords: 'safari cost planning, affordable safari options, safari budget calculator, safari pricing guide, luxury safari costs, budget-friendly safari, safari accommodation costs, Tanzania safari budget, Kenya safari cost, South Africa safari prices',
};

const SafariBudgetingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Safari Budget Planning Guide</h1>
        <p className="text-lg text-muted-foreground">Understanding the real costs of an African safari and planning your budget effectively</p>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/images/resources/safari-budget-hero.jpg" 
            alt="Safari vehicle overlooking African plains with elephants and acacia trees" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Planning Your Safari Budget</h2>
          <p className="mb-4">
            Budgeting for an African safari requires careful consideration of numerous factors, from accommodation and transportation to park fees and seasonal variations. This comprehensive guide breaks down the costs associated with safaris across different budget tiers, helping you plan a safari that delivers exceptional experiences while respecting your financial parameters.
          </p>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="font-medium">Use our interactive calculator below to estimate your safari costs</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <h2 id="understanding-safari-costs">Understanding Safari Costs: What Drives the Price?</h2>
        <p>
          Planning a safari is unlike booking a standard vacation. The remote locations, specialized equipment, conservation fees, and expert guiding all contribute to safari pricing. Before diving into specific budget tiers, it's essential to understand the main components that affect the overall cost of your African safari adventure:
        </p>

        <div className="bg-muted p-6 rounded-lg my-8">
          <h3 className="mt-0">Key Cost Factors for African Safaris</h3>
          <ul>
            <li><strong>Accommodation Standards:</strong> From basic camping to ultra-luxury lodges</li>
            <li><strong>Transportation:</strong> Vehicle type, domestic flights, and transfer quality</li>
            <li><strong>Season:</strong> High season commands premium prices (30-50% more than low season)</li>
            <li><strong>Destination:</strong> Countries like Botswana cost significantly more than Tanzania or Kenya</li>
            <li><strong>Park and Conservation Fees:</strong> Can range from $30 to $150 per person per day</li>
            <li><strong>Guiding Quality:</strong> Highly qualified guides increase costs but enhance the experience</li>
            <li><strong>Group Size:</strong> Private safaris cost more than group departures</li>
            <li><strong>Duration:</strong> Longer stays often provide better value per day</li>
          </ul>
        </div>

        {/* Additional content continues here */}
        {/* Ensure all content is inside the component */}
      </div>
    </div>
  );
};

export default SafariBudgetingPage;