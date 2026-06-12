import Link from "next/link";
import { generateBreadcrumbList, type BreadcrumbItem } from "@/lib/schema";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { cn } from "@/lib/utils";

type Props = {
  items: BreadcrumbItem[];
  variant?: "default" | "onDark";
  className?: string;
};

/**
 * Trilha de navegação visível + JSON-LD BreadcrumbList (SEO item 5).
 */
export function PageBreadcrumbs({ items, variant = "default", className }: Props) {
  const isOnDark = variant === "onDark";

  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbList(items)} />
      <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.9rem] sm:text-[1rem] tracking-[0.3px] list-none p-0 m-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-1.5 min-w-0">
                {index > 0 ? (
                  <span
                    className={cn("shrink-0", isOnDark ? "text-white/35" : "text-[#9AABB6]")}
                    aria-hidden
                  >
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span
                    className={cn(
                      "truncate",
                      isOnDark ? "text-white/85" : "text-teal font-medium"
                    )}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "truncate hover:underline underline-offset-2 transition-colors",
                      isOnDark ? "text-white/60 hover:text-white/90" : "text-teal-mid hover:text-teal"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
