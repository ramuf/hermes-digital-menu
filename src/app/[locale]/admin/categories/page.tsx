import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteCategory } from "@/app/actions/categories";
import CategoryForm from "@/components/admin/CategoryForm";
import { Trash2, Edit, Plus } from "lucide-react";
import { useState, Suspense } from "react";

async function CategoriesList({ locale }: { locale: string }) {
  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const categories = await prisma.category.findMany({
    include: {
      translations: {
        where: { lang: locale },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return <CategoriesTable categories={categories} locale={locale} />;
}

function CategoriesTable({ categories, locale }: { categories: any[], locale: string }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? This will also remove all items in it.")) {
      await deleteCategory(id);
      // Since this is a client component now (due to useState), 
      // we need a way to refresh the page.
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Name ({locale})</th>
              <th className="px-6 py-3 font-medium">Sort Order</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-zinc-500">
                  No categories found. Add your first one!
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">
                    {cat.translations[0]?.name || "No translation"}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {cat.sortOrder}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingCategory({
                          id: cat.id,
                          name: cat.translations[0]?.name || "",
                          sortOrder: cat.sortOrder,
                        });
                        setIsFormOpen(true);
                      }}
                      className="p-2 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <CategoryForm
          lang={locale}
          initialData={editingCategory}
          onSuccess={() => {
            setIsFormOpen(false);
            window.location.reload();
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

export default async function CategoriesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesList locale={locale} />
    </Suspense>
  );
}
