"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createItem(formData: {
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sortOrder: number;
  locale: string;
}) {
  await prisma.menuItem.create({
    data: {
      categoryId,
      price,
      imageUrl,
      sortOrder,
      isAvailable: true,
      translations: {
        create: {
          lang: locale,
          name,
          description,
        },
      },
    },
  });
  revalidatePath("/admin/items");
  revalidatePath("/menu");
}

export async function updateItem(formData: {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sortOrder: number;
  locale: string;
}) {
  await prisma.menuItem.update({
    where: { id },
    data: {
      categoryId,
      price,
      imageUrl,
      sortOrder,
      translations: {
        upsert: {
          where: {
            menuItemId_lang: {
              menuItemId: id,
              lang: locale,
            },
          },
          update: { name, description },
          create: { lang: locale, name, description },
        },
      },
    },
  });
  revalidatePath("/admin/items");
  revalidatePath("/menu");
}

export async function deleteItem(id: string) {
  await prisma.menuItem.delete({
    where: { id },
  });
  revalidatePath("/admin/items");
  revalidatePath("/menu");
}

export async function toggleAvailability(id: string, isAvailable: boolean) {
  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable },
  });
  revalidatePath("/admin/items");
  revalidatePath("/menu");
}
