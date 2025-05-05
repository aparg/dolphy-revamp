import Image from "next/image";

const features = [
  {
    title: "High-performing Network",
    category: "TOP TALENT",
    description:
      "Join an exclusive network of experienced agents committed to excellence. Our carefully selected members are entrepreneurial, driven, and passionate about growing their business.",
    image: "/gallery/5.jpg",
  },
  {
    title: "Quality Leads",
    category: "QUALIFIED CUSTOMERS",
    description:
      "Get access to serious buyers and sellers. Our platform pre-qualifies leads and matches you with clients who are ready to make moves in the real estate market.",
    image: "/gallery/2.jpg",
  },
  {
    title: "Cutting-edge Tools",
    category: "TOOLS AND SUPPORT",
    description:
      "Access modern tools and technology to streamline your business. From CRM to marketing automation, we provide everything you need to succeed in today's market.",
    image: "/gallery/4.jpg",
  },
];

export default function FeaturesBrokerage() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-medium-black mb-16">
          Why Join Dolphy
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold text-primary-red mb-2">
                  {feature.category}
                </div>
                <h3 className="text-2xl font-bold text-medium-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
