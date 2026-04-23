"use server";

import { getDb } from "../queries/connection";
import { categories, products, heroSlides } from "@db/schema";
import { revalidatePath } from "next/cache";

const slugify = (text: string) => {
  const trMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };
  return text
    .toString()
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (match) => trMap[match])
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  try {
    await getDb().insert(categories).values({
      name,
      nameEn,
      slug: slugify(name),
      description,
      descriptionEn,
      imageUrl,
      sortOrder,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Kaydedilemedi." };
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const shortDescriptionEn = formData.get("shortDescriptionEn") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  try {
    await getDb().insert(products).values({
      name,
      nameEn,
      slug: slugify(name),
      categoryId,
      description,
      descriptionEn,
      shortDescription,
      shortDescriptionEn,
      featuredImage,
      isFeatured,
      sortOrder,
    });
    revalidatePath("/admin/products");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Kaydedilemedi." };
  }
}

export async function createHeroSlide(formData: FormData) {
  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const subtitle = formData.get("subtitle") as string;
  const subtitleEn = formData.get("subtitleEn") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const linkText = formData.get("linkText") as string;
  const linkTextEn = formData.get("linkTextEn") as string;
  const linkHref = formData.get("linkHref") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const isActive = formData.get("isActive") === "on";

  try {
    await getDb().insert(heroSlides).values({
      title,
      titleEn,
      subtitle,
      subtitleEn,
      imageUrl,
      linkText,
      linkTextEn,
      linkHref,
      sortOrder,
      isActive,
    });
    revalidatePath("/admin/hero");
    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Kaydedilemedi." };
  }
}
