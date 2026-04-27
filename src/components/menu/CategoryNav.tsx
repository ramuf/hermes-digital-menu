'use client';

import React from 'react';
import { CategoryWithTranslation } from '@/lib/menu-service';

interface CategoryNavProps {
  categories: CategoryWithTranslation[];
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ 
  categories, 
  activeCategoryId, 
  onCategoryChange 
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 mb-6">
      <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategoryId === category.id 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
