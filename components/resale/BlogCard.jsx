import Link from "next/link";

const BlogCard = ({ data }) => {
  return (
    <Link
      href={`/blogs/${data.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg block"
    >
      <div className="relative h-48">
        <img
          src={"https://api.dolphy.ca" + data.news_thumbnail}
          alt={data.title}
          className="w-full object-cover object-center h-[189px]"
        />
      </div>
      <div className="p-4">
        <span className="inline-block bg-red-50 border border-primary-green text-xs px-2 py-1 rounded-full tracking-wide text-primary-green">
          {data.city.name}
        </span>
        <h2 className="mt-2 text-lg sm:text-xl font-semibold text-gray-800 line-clamp-3 sm:line-clamp-2">
          {data.news_title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm">{data.date}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
