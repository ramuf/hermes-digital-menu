import React from 'react';
import { MenuSkeleton } from '@/components/menu/MenuSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <header className="bg-white border-b border-zinc-200 pt-12 pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-8 w-48 bg-zinc-200 rounded mx-auto animate-pulse" />
          <div className="h-4 w-64 bg-zinc-200 rounded mx-auto mt-2 animate-pulse" />
        </div>
      </header>
      
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 mb-6">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-zinc-200 rounded-full animate-pulse shrink-0" />
          ))}
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4">
        <div className="h-6 w-32 bg-zinc-200 rounded mb-4 animate-pulse" />
        <MenuSkeleton />
      </main>
    </div>
  );
}
