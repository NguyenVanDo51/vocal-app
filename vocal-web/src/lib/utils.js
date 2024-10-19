import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
