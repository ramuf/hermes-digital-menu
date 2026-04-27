"use client";

import React, { useState } from "react";
import { createItem, updateItem } from "@/app/actions/items";

interface ItemFormProps {
  item?: {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    sortOrder: number;
  };
  categories: { id: string; name: string }[];
  locale: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function ItemForm({ item, categories, locale, onSuccess, onClose }: ItemFormProps) {
  const [formData, setFormData] = useState({
    categoryId: item?.categoryId || "",
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    imageUrl: item?.imageUrl || "",
    sortOrder: item?.sortOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      await updateItem({ ...formData, id: item.id, locale });
    } else {
      await createItem({ ...formData, locale });
    }
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Category</label>
            <select
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name ({locale})</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Description ({locale})</label>
            <textarea
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 border rounded-lg mt-1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">Sort Order</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg mt-1"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Save Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}
