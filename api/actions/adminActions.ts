"use server";

import { getDb } from "../queries/connection";
import { categories, products, heroSlides, campaigns, projects } from "@db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

export async function createCampaign(formData: FormData) {
  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const badge = formData.get("badge") as string;
  const discount = formData.get("discount") as string;
  const validUntil = formData.get("validUntil") as string;
  const type = (formData.get("type") as string) || "current";
  const originalPrice = formData.get("originalPrice") as string;
  const discountedPrice = formData.get("discountedPrice") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const isActive = formData.get("isActive") !== "off";

  try {
    await getDb().insert(campaigns).values({
      title, titleEn, description, descriptionEn, imageUrl,
      badge, discount, validUntil, type, originalPrice, discountedPrice,
      sortOrder, isActive,
    });
    revalidatePath("/admin/campaigns");
    revalidatePath("/[locale]/kampanyalar", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Kaydedilemedi." };
  }
}

export async function deleteCampaign(id: number) {
  try {
    await getDb().delete(campaigns).where(eq(campaigns.id, id));
    revalidatePath("/admin/campaigns");
    revalidatePath("/[locale]/kampanyalar", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const location = formData.get("location") as string;
  const year = formData.get("year") as string;
  const category = formData.get("category") as string;
  const categoryEn = formData.get("categoryEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  try {
    await getDb().insert(projects).values({
      name, nameEn, slug: slugify(name),
      location, year, category, categoryEn,
      description, descriptionEn, featuredImage, sortOrder,
      isActive: true,
    });
    revalidatePath("/admin/projects");
    revalidatePath("/[locale]/projects", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Kaydedilemedi." };
  }
}

export async function deleteProject(id: number) {
  try {
    await getDb().delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/[locale]/projects", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteCategory(id: number) {
  try {
    await getDb().delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  try {
    await getDb().update(categories).set({ name, nameEn, description, descriptionEn, imageUrl, sortOrder }).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Güncellenemedi." };
  }
}

export async function deleteProduct(id: number) {
  try {
    await getDb().delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const shortDescriptionEn = formData.get("shortDescriptionEn") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  try {
    await getDb().update(products).set({ name, nameEn, description, descriptionEn, shortDescription, shortDescriptionEn, featuredImage, isFeatured, sortOrder }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/[locale]/collections", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Güncellenemedi." };
  }
}

export async function updateCampaign(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const titleEn = formData.get("titleEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const badge = formData.get("badge") as string;
  const discount = formData.get("discount") as string;
  const validUntil = formData.get("validUntil") as string;
  const type = (formData.get("type") as string) || "current";
  const branch = formData.get("branch") as string;
  const modelColor = formData.get("modelColor") as string;
  const details = formData.get("details") as string;
  const shippingInfo = formData.get("shippingInfo") as string;
  const originalPrice = formData.get("originalPrice") as string;
  const discountedPrice = formData.get("discountedPrice") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  try {
    await getDb().update(campaigns).set({
      title, titleEn, description, descriptionEn, imageUrl, badge, discount,
      validUntil, type, branch, modelColor, details, shippingInfo, originalPrice, discountedPrice, sortOrder,
    }).where(eq(campaigns.id, id));
    revalidatePath("/admin/campaigns");
    revalidatePath("/[locale]/kampanyalar", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Güncellenemedi." };
  }
}

export async function deleteHeroSlide(id: number) {
  try {
    await getDb().delete(heroSlides).where(eq(heroSlides.id, id));
    revalidatePath("/admin/hero");
    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateHeroSlide(id: number, formData: FormData) {
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
    await getDb().update(heroSlides).set({ title, titleEn, subtitle, subtitleEn, imageUrl, linkText, linkTextEn, linkHref, sortOrder, isActive }).where(eq(heroSlides.id, id));
    revalidatePath("/admin/hero");
    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Güncellenemedi." };
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
