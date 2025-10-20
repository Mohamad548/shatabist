import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassValue } from "clsx";

export default function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
