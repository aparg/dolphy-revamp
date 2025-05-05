"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const formatTitle = (segment) => {
  // Handle special cases
  if (segment.toLowerCase() === "preconstruction") return "Pre-Construction";

  // General formatting
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const revalidate = 3600;

export default function Breadcrumbs({ className, items, ...props }) {
  const pathname = usePathname();

  // Use provided items if available, otherwise generate from pathname
  const breadcrumbItems =
    items ||
    (() => {
      // Skip rendering breadcrumbs on home page
      if (pathname === "/") return [];

      const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "");

      return pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const title = formatTitle(segment);

        return {
          href,
          title,
          label: title,
          isLast,
        };
      });
    })();

  if (breadcrumbItems.length === 0) return null;

  return (
    <div className="sticky top-0 z-40 w-full bg-white">
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "max-w-[1440px] mx-auto overflow-x-auto scrollbar-hide whitespace-nowrap py-1 md:py-1",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {!items && (
            <>
              <Link
                href="/"
                className="hover:text-foreground transition-colors duration-200 flex-shrink-0 text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
            </>
          )}

          {breadcrumbItems
            .filter(({ href, title }) => {
              // Skip "category" segment in blog category pages
              if (href?.includes("/blog/category/")) {
                return title !== "Category";
              }
              return true;
            })
            .map((item, index, array) => {
              const { href, title, isLast } = item;

              // For blog category pages, modify the href to point to /blog for the Blog link
              const linkHref = href?.includes("/blog/category/")
                ? "/blog"
                : href;

              return (
                <div key={href} className="flex items-center flex-shrink-0">
                  {isLast ? (
                    <span
                      className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-none"
                      title={title}
                    >
                      {title}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={linkHref}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 truncate max-w-[150px] sm:max-w-none"
                        title={title}
                      >
                        {title}
                      </Link>
                      {!isLast && (
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </nav>
    </div>
  );
}
