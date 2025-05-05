import Link from "next/link";
import Image from "next/image";
import Heading from "./design/Heading";

function calculateReadTime(content) {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

export default function RecentBlogs({ blogs }) {
  // Take first 4 blogs directly without client state
  const blogData = blogs?.results?.slice(0, 4) || [];

  return (
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <Heading
        subtitle="Never miss out on the latest trends"
        align="center"
        color="#1a1a1a"
        subtitleColor="#666"
        maxWidth="800px"
        maxWidthsubtitle="600px"
      >
        The Dolphy Insights
      </Heading>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {blogData.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="group cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={blog.thumbnail_image || "/placeholder-blog.jpg"}
                alt={blog.thumbnail_image_alt_description || blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="inline-block px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-full">
                News
              </div>
              <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-red-600 transition-colors">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500">
                {calculateReadTime(blog.content)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
