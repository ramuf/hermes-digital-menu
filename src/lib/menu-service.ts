import { prisma } from '@/lib/prisma';

export interface MenuItemWithTranslation {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
}

export interface CategoryWithTranslation {
  id: string;
  name: string;
  items: MenuItemWithTranslation[];
}

export async function getMenuWithTranslations(locale: string): Promise<{ categories: CategoryWithTranslation[] }> {
  const categories = await prisma.category.findMany({
    include: {
      translations: true,
      menuItems: {
        include: {
          translations: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });

  const mappedCategories: CategoryWithTranslation[] = categories.map((cat) => {
    const translation = cat.translations.find((t) => t.lang === locale) || 
                      cat.translations.find((t) => t.lang === 'en');

    return {
      id: cat.id,
      name: translation?.name || 'Untitled Category',
      items: cat.menuItems.map((item) => {
        const itemTranslation = item.translations.find((t) => t.lang === locale) || 
                                item.translations.find((t) => t.lang === 'en');

        return {
          id: item.id,
          name: itemTranslation?.name || 'Untitled Item',
          description: itemTranslation?.description || null,
          price: item.price,
          imageUrl: item.imageUrl,
          isAvailable: item.isAvailable,
        };
      }),
    };
  });

  return { categories: mappedCategories };
}
