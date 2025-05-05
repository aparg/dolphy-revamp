import { notFound } from "next/navigation";
import ListingListPage from "@/components/resale/ListingListPage";
import ListingDetailPage from "@/components/resale/ListingDetailPage";

export default async function DynamicPage({ params, searchParams }) {
  const slug = params.slug1;

  // Check if this is a property detail page
  if (slug.length >= 2 && slug[slug.length - 2] === "listings") {
    try {
      return <ListingDetailPage slug={slug} />;
    } catch (error) {
      console.error("Error in listing detail page:", error);
      notFound();
    }
  }

  // Handle regular listing pages
  try {
    return <ListingListPage slug={slug} searchParams={searchParams} />;
  } catch (error) {
    console.error("Error in listing list page:", error);
    notFound();
  }
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug1;

  if (slug.length >= 2 && slug[slug.length - 2] === "listings") {
    return ListingDetailPage.generateMetadata({ params, searchParams });
  }

  return ListingListPage.generateMetadata({ params, searchParams });
}
