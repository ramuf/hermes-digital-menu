'use client';

import React, { useState } from 'react';
import { CategoryWithTranslation } from '@/lib/menu-service';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { MenuItem } from '@/components/menu/MenuItem';

interface MenuClientPageProps {
  categories: CategoryWithTranslation[];
}

export default function MenuClientPage({ categories }: MenuClientPageProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories.length > 0 ? categories[0].id : ''
  );

  const activeCategory = categories.find(cat => cat.id === activeCategoryId);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 pt-12 pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Our Menu</h1>
          <p className="text-zinc-500 mt-2">Delicious meals made with love</p>
        </div>
      </header>

      {/* Navigation */}
      <CategoryNav 
        categories={categories} 
        activeCategoryId={activeCategoryId} 
        onCategoryChange={setActiveCategoryId} 
      />

      {/* Items List */}
      <main className="max-w-2xl mx-auto px-4">
        {activeCategory ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-zinc-800 mb-4">
                {activeCategory.name}
              </h2>
              <div className="grid gap-4">
                {activeCategory.items.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            No menu items available.
          </div>
        )}
      </main>
    </div>
  );
}
