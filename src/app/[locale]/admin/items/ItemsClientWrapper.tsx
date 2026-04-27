"use client";

import React, { useState } from "react";
import ItemForm from "@/components/admin/ItemForm";

export default function ItemsClientWrapper({ initialItems, categories, locale }: any) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <button 
        onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
      >
        Add Item
      </button>
      {isFormOpen && (
        <ItemForm 
          item={selectedItem} 
          categories={categories} 
          locale={locale} 
          onSuccess={() => { setIsFormOpen(false); window.location.reload(); }} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </>
  );
}
