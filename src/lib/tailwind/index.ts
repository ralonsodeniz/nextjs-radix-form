import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { createTwc } from "react-twc";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const twc = createTwc({
  compose: cn,
});
