import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDivisions = async () => {
  const res = await fetch("https://bdapis.com/api/v1.2/divisions");
  const data = await res.json();
  return data.data;
};
export const getDistricts = async (division: string) => {
  const res = await fetch("https://bdapis.com/api/v1.2/division/" + division);
  const data = await res.json();
  return data.data;
};
