import Image from "next/image";
import Link from "next/link";

function calculateReadTime(content) {
  if (!content) return "5 min read";
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group cursor-pointer">
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
        <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-black transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-500">
          {calculateReadTime(blog.content)}
        </p>
      </div>
    </Link>
  );
}
