import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Heading from "@/components/design/Heading";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600;

// const categories = [
//   { name: "News", slug: "news" },
//   { name: "Insights", slug: "insights" },
//   { name: "Thorold", slug: "thorold" },
//   { name: "Innisfil", slug: "innisfil" },
//   { name: "Grimsby", slug: "grimsby" },
//   { name: "Mississauga", slug: "mississauga" },
//   { name: "Calgary", slug: "calgary" },
// ];

// async function getBlogs() {
//   try {
//     const res = await fetch("https://admin.dolphy.ca/api/posts/", {
//       next: { revalidate: 3600 },
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!res.ok) {
//       return { results: [] };
//     }

//     const data = await res.json();
//     return data.data || { results: [] };
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return { results: [] };
//   }
// }

// export default async function BlogListing() {
//   const { results: blogs = [] } = await getBlogs();

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center mb-3">
//           <Heading
//             subtitle="Explore our latest blog posts and stay updated on the latest real
//           estate"
//           >
//             The Dolphy Insights
//           </Heading>
//         </div>
//         <nav className="mb-3 md:mb-7 overflow-auto scrollbar-hide">
//           <ul className="flex justify-center items-center px-4">
//             {categories.map((category, index) => (
//               <li key={category.slug} className="flex items-center">
//                 <Link
//                   href={`/blog/category/${category.slug}`}
//                   className={`
//                   relative py-1 text-base font-medium transition-colors duration-200
//                   text-gray-600 hover:text-gray-900
//                 `}
//                 >
//                   {category.name}
//                 </Link>
//                 {index < categories.length - 1 && (
//                   <span className="mx-4 text-gray-300">•</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-7">
//           {blogs.length > 0 ? (
//             blogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
//               <p className="text-gray-600">Check back later for new content.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-col items-center mb-4 md:mb-5 mt-20">
//         <Image
//           src="/contact-bottom-2.png"
//           alt="Real Estate Agent"
//           width={300}
//           height={300}
//           className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
//           priority
//         />
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
//           Looking to buy a New Home?
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base">
//           Don't know where to start? Contact Dolphy now!
//         </p>
//       </div>
//       <ContactForm />
//     </>
//   );
// }

// export async function generateMetadata() {
//   return {
//     title: "Real Estate Blog - New Homes Insights | Dolphy",
//     description:
//       "Stay informed with Dolphy's real estate blog. Get expert insights on new homes, market trends, and investment opportunities across Canada.",
//     keywords:
//       "real estate blog, new homes, real estate insights, property market news, home buying tips, real estate investment, Canadian real estate",
//     openGraph: {
//       url: "https://dolphy.ca/blog",
//       siteName: "Dolphy",
//       title: "Real Estate Blog - New Homes Insights",
//       description:
//         "Expert insights on new homes, market trends, and real estate investment opportunities across Canada.",
//       images: [
//         {
//           url: "https://dolphy.ca/aeee.jpg",
//           width: 1200,
//           height: 630,
//           alt: "Dolphy Real Estate Blog",
//         },
//       ],
//       locale: "en_CA",
//       type: "website",
//     },
//     alternates: {
//       canonical: "https://dolphy.ca/blog",
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Real Estate Blog - New Homes Insights",
//       description:
//         "Expert insights on new homes and real estate trends across Canada.",
//       images: ["https://dolphy.ca/aeee.jpg"],
//     },
//   };
// }

return <></>;
