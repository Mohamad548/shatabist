// src/utils/serverActions.ts
"use server";

import { redirect } from "next/navigation";

export async function handleSearch(formData: FormData) {
  const query = formData.get("query") as string;
  if (query.length >= 3) {
    redirect(`/search?q=${query}`);
  }
}
