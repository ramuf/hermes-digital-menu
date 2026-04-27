import React, { useState } from "react";
import { prisma } from "@/lib/prisma";
import { deleteItem, toggleAvailability } from "@/app/actions/items";
import ItemForm from "@/components/admin/ItemForm";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

export default async function ItemsPage({ params: { locale } }: { params: { locale: string } }) {
  const items = await prisma.menuItem.findMany({
    include: {
      category: true,
      translations: {
        where: { lang: locale },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  const categories = await prisma.category.findMany({
    include: {
      translations: { where: { lang: locale } },
    },
    orderBy: { sortOrder: "asc" },
  });

  const formattedCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.translations[0]?.name || "Unnamed Category"
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Menu Items</h1>
        <ItemsClientWrapper 
          initialItems={items} 
          categories={formattedCategories} 
          locale={locale} 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 font-semibold text-zinc-600">Item</th>
              <th className="p-4 font-semibold text-zinc-600">Category</th>
              <th className="p-4 font-semibold text-zinc-600">Price</th>
              <th className="p-4 font-semibold text-zinc-600">Status</th>
              <th className="p-4 font-semibold text-zinc-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const translation = item.translations[0];
              return (
                <tr key={item.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-zinc-900">{translation?.name || "Unnamed Item"}</div>
                    <div className="text-xs text-zinc-500 truncate max-w-xs">{translation?.description}</div>
                  </td>
                  <td className="p-4 text-zinc-600">{item.category?.translations[0]?.name || "N/A"}</td>
                  <td className="p-4 font-mono text-zinc-900">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-2 text-sm ${item.isAvailable ? "text-green-600" : "text-red-600"}`}>
                      {item.isAvailable ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      {item.isAvailable ? "Available" : "Out of Stock"}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => toggleAvailability(item.id, !item.isAvailable)}
                        className="p-2 text-zinc-400 hover:text-orange-600 transition-colors"
                        title="Toggle Availability"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-blue-600 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// This is a helper to handle the state of the form and revalidation
import ItemsClientWrapper from "./ItemsClientWrapper";
