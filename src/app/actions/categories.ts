"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const lang = formData.get("lang") as string;

  if (!name) {
    throw new Error("Category name is required");
  }

  const category = await prisma.category.create({
    data: {
      sortOrder,
      translations: {
        create: {
          lang,
          name,
        },
      },
    },
  });

  revalidatePath("/admin/categories"); // Note: this might need to be localized path
  return { success: true, category };
}

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const lang = formData.get("lang") as string;

  if (!id) {
    throw new Error("Category ID is required");
  }

  await prisma.category.update({
    where: { id },
    data: {
      sortOrder,
      translations: {
        upsert: {
          where: {
            categoryId_lang: {
              categoryId: id,
              lang,
            },
          },
          update: { name },
          create: {
            lang,
            name,
          },
        },
      },
    },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  return { success: true };
}
