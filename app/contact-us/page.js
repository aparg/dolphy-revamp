import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata() {
  return {
    title: "Contact Dolphy - Get Expert Real Estate Assistance",
    description:
      "Connect with Dolphy's real estate experts. Get personalized assistance for new homes, pre-construction projects, and investment opportunities across Canada.",
    keywords:
      "contact dolphy, real estate assistance, new homes help, pre-construction consultation, real estate expert contact, property buying help",
    openGraph: {
      url: "https://dolphy.ca/contact-us",
      siteName: "Dolphy",
      title: "Contact Dolphy Real Estate Experts",
      description:
        "Get expert assistance with new homes and pre-construction projects. Connect with Dolphy's real estate specialists today.",
      images: [
        {
          url: "https://dolphy.ca/aeee.jpg",
          width: 1200,
          height: 630,
          alt: "Contact Dolphy Real Estate",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    alternates: {
      canonical: "https://dolphy.ca/contact-us",
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
      title: "Contact Dolphy Real Estate Experts",
      description:
        "Get expert assistance with new homes and pre-construction projects across Canada.",
      images: ["https://dolphy.ca/aeee.jpg"],
    },
  };
}

export default function ContactPage() {
  return (
    <>
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
