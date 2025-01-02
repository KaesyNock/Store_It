import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
}

// when parsing large payloads of data you have to stringify then parse value
