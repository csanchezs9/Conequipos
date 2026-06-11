import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP = "573146032406";
export const WHATSAPP_DISPLAY = "(+57) 314 603 2406";
export const PHONE = "604 444 13 31";
export const EMAIL = "logistica2@conequipos.com.co";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}
