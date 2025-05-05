import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BlogCard from "@/components/BlogCard";

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Dolphy",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postTitle = post.meta_title || post.title;
  const postDescription = post.meta_description || post.excerpt;
  const postImage = post.featured_image || "https://dolphy.ca/aeee.jpg";

  return {
    title: `${postTitle} | Dolphy Real Estate Blog`,
    description: postDescription,
    keywords: `${
      post.category?.name || "real estate"
    }, new construction homes, ${
      post.tags?.join(", ") || "property market"
    }, Canadian real estate`,
    openGraph: {
      url: `https://dolphy.ca/blog/${params.slug}`,
      siteName: "Dolphy",
      title: postTitle,
      description: postDescription,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
      locale: "en_CA",
      type: "article",
      article: {
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [
          `${post.author?.user?.first_name} ${post.author?.user?.last_name}`,
        ],
        tags: post.tags,
        section: post.category?.name,
      },
    },
    alternates: {
      canonical: `https://dolphy.ca/blog/${params.slug}`,
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
      title: postTitle,
      description: postDescription,
      images: [postImage],
      creator: post.author?.twitter_handle || "@dolphy",
    },
  };
}

async function getBlogPost(slug) {
  try {
    const res = await fetch(`https://admin.dolphy.ca/api/posts/${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Get related posts
async function getRelatedPosts(category) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/posts/?category=${category}&limit=4`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.results || [];
  } catch (error) {
    return [];
  }
}

export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = await getRelatedPosts(blog.category?.slug);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <>
      <article className="max-w-7xl mx-auto px-4">
        {/* Back Link and Breadcrumbs */}
        <div className="flex flex-col md:flex-row justify-center items-center py-8 max-w-4xl mx-auto">
          <nav className="text-sm text-center md:text-left text-gray-500">
            <Link href="/" className="hover:text-gray-700 text-xs">
              Home
            </Link>
            <span className="mx-2 text-xs">/</span>
            <Link href="/blog" className="hover:text-gray-700 text-xs">
              Blog
            </Link>
            <span className="mx-2 text-xs">/</span>
            <span className="text-gray-900 text-xs">{blog.title}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-xl md:text-4xl font-extrabold mb-8 leading-snug text-center max-w-4xl mx-auto">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-200 py-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              {blog.author?.profile_img && (
                <Image
                  src={blog.author.profile_img}
                  alt={blog.author.user?.first_name || "Author"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-medium">
                  {blog.author?.user?.first_name} {blog.author?.user?.last_name}
                </div>
                <div className="text-gray-500 text-sm">
                  {formatDate(blog.created_at)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Badge variant="secondary" className="text-sm">
                {blog.category?.name}
              </Badge>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{calculateReadTime(blog.content)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center mt-40">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} blog={post} />
              ))}
            </div>
          </section>
        )}
      </article>
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
