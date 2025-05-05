import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import RecentBlogs from "@/components/RecentBlogs";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Testimonial from "@/components/Testimonial";
import HomebabaPromo from "@/components/HomebabaPromo";
import CallToAction from "@/components/CallToAction";
import Script from "next/script";
import MaldivesVacation from "@/components/MaldivesVacation";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import CityLinks from "@/components/CityLinks";
import ResaleCitiesSection from "@/components/resale/ResaleCitiesSection";
import CommunityGive from "@/components/CommunityGive";
import BestExperience from "@/components/BestExperience";
import PriceDroppedHomes from "@/components/PriceDroppedHomes";
import PreConstructionCities from "@/components/PreConstructionCities";
import CalgaryHomes from "@/components/resale/CalgaryHomes";

// Metadata configuration
export const metadata = {
  metadataBase: new URL("https://dolphy.ca"),
  title: "Dolphy - Canada's Most Trusted Residential Real Estate Platform.",
  description:
    "Find your ideal home in the Greater Toronto Area. Browse townhouses, detached homes, and condos for sale or rent, plus new construction properties across GTA.",
  authors: [{ name: "Dolphy", email: "info@dolphy.ca" }],
  openGraph: {
    type: "website",
    title: "Dolphy - Canada's Most Trusted Residential Real Estate Platform.",
    description:
      "Find your ideal home in the Greater Toronto Area. Browse townhouses, detached homes, and condos for sale or rent, plus new construction properties across GTA.",
    url: "https://dolphy.ca",
    siteName: "Dolphy",
    images: [{ url: "/aeee.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dolphy.ca/" },
};

// Server-side data fetching
async function getBlogs() {
  try {
    const res = await fetch("https://admin.dolphy.ca/api/posts/", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { results: [] };
  }
}

// Structured Data for SEO
const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Dolphy",
  url: "https://dolphy.ca",
  description: "Dolphy - Canada's Leading New Construction Homes Platform",
  image: "https://dolphy.ca/aeee.jpg",
  sameAs: [
    "https://www.facebook.com/thehomebaba/",
    "https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg",
    "https://www.instagram.com/homebabaa/",
    "https://www.linkedin.com/company/dolphy/about/?viewAsMember=true",
    "https://twitter.com/homebabaa",
    "https://www.tiktok.com/@homebabaa",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://dolphy.ca/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 647-239-5555",
    contactType: "customer support",
  },
  openingHours: "Mo-Su 09:00-18:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8300 Woodbine Ave",
    addressLocality: "Markham",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

const corporationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Dolphy INC",
  alternateName: "Dolphy",
  url: "https://dolphy.ca",
  logo: "https://dolphy.ca/aeee.jpg",
};

export default async function Home() {
  // Server-side data fetching
  const blogsData = await getBlogs();

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-corporation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationSchema) }}
      />

      <HeroSection />
      {/* <BestExperience /> */}
      <PreConstructionCities />
      {/* <PriceDroppedHomes /> */}
      <ResaleCitiesSection />
      {/* <CalgaryHomes /> */}
      <div className="my-10 md:my-20"></div>
      <HomebabaAdvantage />
      {/* <HomebabaPromo /> */}
      {/* <CommunityGive /> */}
      {/* <CallToAction /> */}
      <div className="my-10 md:my-32"></div>
      {/* <RecentBlogs blogs={blogsData} /> */}
      <div className="my-10 md:my-32"></div>
      {/* <FeaturedProjects /> */}
      <div className="my-10 md:my-32"></div>
      {/* <MaldivesVacation /> */}
      {/* <Testimonial
        testimonialText="This platform is exactly what new realtors need, a fantastic way to search and explore projects"
        authorName="Josh Camaro"
        authorPosition="Real Estate Professional"
        authorRole=""
        companyLogo="/testmonials/J.png"
      /> */}
      <div className="flex flex-col items-center mb-4 md:mb-5">
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
          Don't know where to start? Contact us today!
        </p>
      </div>
      <ContactForm />
      <div className="my-10 md:my-32"></div>

      <CityLinks />
    </>
  );
}
