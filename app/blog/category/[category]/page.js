import BlogCard from "@/components/BlogCard";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export const revalidate = 3600;

async function getBlogsByCategory(category) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/posts/?category=${category}`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      return { results: [] };
    }

    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    return { results: [] };
  }
}

async function getCategoryInfo(category) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/categories/${category}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const categorySlug = params.category;
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const blogs = await getBlogsByCategory(categorySlug);

  return {
    title: `${categoryName} Real Estate Blog Posts (${blogs.results.length}+) | Dolphy`,
    description: `Read the latest ${categoryName} real estate blog posts. Get insights on new construction projects, market trends, and investment opportunities in ${categoryName}.`,
    keywords: `${categoryName} real estate, ${categoryName} new construction, ${categoryName} property market, ${categoryName} homes, ${categoryName} real estate news`,
    openGraph: {
      url: `https://dolphy.ca/blog/category/${categorySlug}`,
      siteName: "Dolphy",
      title: `${categoryName} Real Estate Blog Posts | Dolphy`,
      description: `Latest ${categoryName} real estate insights and new construction updates. Stay informed about the ${categoryName} property market.`,
      images: [
        {
          url: "https://dolphy.ca/aeee.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryName} Real Estate Blog`,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    alternates: {
      canonical: `https://dolphy.ca/blog/category/${categorySlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Real Estate Blog Posts | Dolphy`,
      description: `Latest ${categoryName} real estate insights and market updates.`,
      images: ["https://dolphy.ca/aeee.jpg"],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { results: blogs = [] } = await getBlogsByCategory(params.category);
  const category = params.category;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 capitalize">
            {category.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600 text-lg">
            Browse our latest articles in {category.replace(/-/g, " ")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-7">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
              <p className="text-gray-600">
                There are no posts in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mb-4 md:mb-5 mt-20">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a New Home?
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Dolphy now!
        </p>
      </div>
      <ContactForm />
    </>
  );
}
