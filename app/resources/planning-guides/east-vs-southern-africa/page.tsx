"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EastVsSouthernAfricaRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/resources/planning-guides/east-vs-southern');
  }, [router]);
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <p>Redirecting to East vs Southern Africa guide...</p>
    </div>
  );
}

// This is a redirect file that ensures the URL in the navigation works correctly
// The main content is in ../east-vs-southern/page.tsx 