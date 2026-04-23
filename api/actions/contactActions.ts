"use server";

import { getDb } from "../queries/connection";
import { contactSubmissions } from "@db/schema";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  formType: z.string().default("contact"),
});

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      formType: formData.get("formType") as string || "contact",
    };

    const parsed = formSchema.parse(data);

    await getDb().insert(contactSubmissions).values(parsed);

    return { success: true };
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, error: "Validation or server error" };
  }
}
