"use client"

import React, { useState } from "react";
import { createCategory, updateCategory } from "@/app/actions/categories";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    sortOrder: number;
  };
  lang: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CategoryForm({ initialData, lang, onSuccess, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sortOrder", sortOrder.toString());
      formData.append("lang", lang);
      if (initialData) {
        formData.append("id", initialData.id);
      }

      if (initialData) {
        await updateCategory(formData);
      } else {
        await createCategory(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl w-full max-w-md space-y-4 text-zinc-900 dark:text-zinc-100"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Category Name ({lang})
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Sort Order
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
