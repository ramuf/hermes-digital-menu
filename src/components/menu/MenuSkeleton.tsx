import React from 'react';

export const MenuSkeleton: React.FC = () => {
  return (
    <div className="grid gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm animate-pulse">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-zinc-200" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-zinc-200 rounded" />
              <div className="h-4 w-12 bg-zinc-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-200 rounded" />
              <div className="h-3 w-2/3 bg-zinc-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
