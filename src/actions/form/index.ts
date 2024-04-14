"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { FormContextValue } from "@/components/ui/form";

const schema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long."),
});

export const login = async (
  prevState: FormContextValue,
  formData: FormData,
): Promise<FormContextValue> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const parsedData = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success)
    return { errors: parsedData.error.flatten().fieldErrors };

  const { email, password } = parsedData.data;
  if (email !== "admin@mail.com")
    return { errors: { email: ["Email not valid"] } };
  if (password !== "admin")
    return { errors: { password: ["Password not valid"] } };

  redirect("/");
};
