import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Compass, Calendar, Map, CheckSquare } from 'lucide-react';

export default function PlanningGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 py-10 container">
      {/* Sidebar */}
      <div className="lg:w-64 shrink-0">
        <div className="sticky top-24">
          <div className="mb-6">
            <Link
              href="/resources"
              className="flex items-center gap-2 text-sm text-muted-foreground group mb-4"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Resources</span>
            </Link>
            <h3 className="text-lg font-semibold mb-2">Planning Guides</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Essential information to help plan your perfect safari experience.
            </p>
          </div>

          <nav className="space-y-1">
            <Link
              href="/resources/planning-guides/wildlife-events"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span>Wildlife Events Calendar</span>
            </Link>
            <Link
              href="/resources/planning-guides/off-the-beaten-path"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Compass className="h-5 w-5 text-primary" />
              <span>Off the Beaten Path</span>
            </Link>
            <Link
              href="/resources/planning-guides/packing-list"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <CheckSquare className="h-5 w-5 text-primary" />
              <span>Safari Packing List</span>
            </Link>
            <Link
              href="/resources/planning-guides/before-you-go"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="h-5 w-5 text-primary" />
              <span>Before You Go</span>
            </Link>
            <Link
              href="/resources/planning-guides/choosing-destinations"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Map className="h-5 w-5 text-primary" />
              <span>Choosing Your Destination</span>
            </Link>
            <Link
              href="/resources/planning-guides/east-vs-southern"
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Compass className="h-5 w-5 text-primary" />
              <span>East vs Southern Africa</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
} 