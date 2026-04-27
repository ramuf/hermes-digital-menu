"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createItem(data: {
  categoryId: string;
  price: number;
  imageUrl?: string;
  sortOrder: number;
  translations: { lang: string; name: string; description?: string }[];
}) {
  const { categoryId, price, imageUrl, sortOrder, translations } = data;

  const item = await prisma.menuItem.create({
    data: {
      categoryId,
      price,
      imageUrl,
      sortOrder,
      translations: {
        create: translations,
      },
    },
  });

  revalidatePath("/admin/items");
  return item;
}

export async function updateItem(id: string, data: {
  categoryId?: string;
  price?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  sortOrder?: number;
  translations?: { lang: string; name: string; description?: string }[];
}) {
  const { translations, ...rest } = data;

  const item = await prisma.menuItem.update({
    where: { id },
    data: rest,
  });

  if (translations) {
    for (const trans of translations) {
      await prisma.menuItemTranslation.upsert({
        where: {
          menuItemId_lang: {
            menuItemId: id,
            lang: trans.lang,
          },
        },
        update: {
          name: trans.name,
          description: trans.description,
        },
        create: {
          menuItemId: id,
          lang: trans.lang,
          name: trans.name,
          description: trans.description,
        },
      });
    }
  }

  revalidatePath("/admin/items");
  return item;
}

export async function deleteItem(id: string) {
  await prisma.menuItem.delete({
    where: { id },
  });
  revalidatePath("/admin/items");
}

export async function toggleAvailability(id: string, isAvailable: boolean) {
  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable },
  });
  revalidatePath("/admin/items");
}
