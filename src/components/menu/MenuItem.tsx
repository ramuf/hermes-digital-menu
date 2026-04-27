import React from 'react';
import { MenuItemWithTranslation } from '@/lib/menu-service';

interface MenuItemProps {
  item: MenuItemWithTranslation;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.isAvailable ? 'bg-white shadow-sm' : 'bg-zinc-100 grayscale opacity-70'}`}>
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-200">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs italic">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-zinc-900 truncate">{item.name}</h3>
          <span className="font-semibold text-orange-600 whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-zinc-500 line-clamp-2 leading-tight">
          {item.description || 'No description available'}
        </p>
        {!item.isAvailable && (
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
            Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};
