import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function generateTimeSlots(
  openHour = 9,
  closeHour = 18,
  interval = 30
): string[] {
  const slots: string[] = [];

  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      if (h === closeHour - 1 && m > 0) break;

      const hour = h % 12 || 12;
      const period = h < 12 ? "AM" : "PM";
      const minutes = m.toString().padStart(2, "0");

      slots.push(`${hour}:${minutes} ${period}`);
    }
  }

  return slots;
}
