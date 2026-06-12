import type { BreadcrumbItem } from "@/lib/schema";

export const CRUMB_HOME: BreadcrumbItem = { name: "Início", href: "/" };

export function withHome(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [CRUMB_HOME, ...items];
}
