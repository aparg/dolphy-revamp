"use client";

import Image from "next/image";
import { ElegantShape } from "./ui/shape-landing-hero";
import { motion } from "framer-motion";
import Link from "next/link";

const CommunityGive = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
      {/* Animated Shapes with lighter colors */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-100"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-pink-100"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-blue-100"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <Link
              href="/blog/dolphy-commitment-sickkids-empowering-real-estate-consumers"
              className="relative group"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                4th Annual
              </h2>
              <div className="relative">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                  DIVE IN WITH
                </h3>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  DEVELOPERS
                </h3>
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-20 w-1 bg-blue-600"></div>
              </div>
            </Link>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 text-center lg:text-right">
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h4 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Uniting Real Estate for a Cause
              </h4>
              <Link
                href="/blog/dolphy-commitment-sickkids-empowering-real-estate-consumers"
                className="text-xl md:text-2xl text-blue-600 hover:text-blue-700 transition-colors"
              >
                Supporting SickKids Epilepsy Classroom
              </Link>
            </motion.div>

            {/* SickKids Logo */}
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <Link
                href="https://dolphy.ca/blog/dolphy-commitment-sickkids-empowering-real-estate-consumers"
                target="_blank"
                className="relative w-48 h-24 block"
              >
                <Image
                  src="/sickkids-logo.png"
                  alt="SickKids Logo"
                  width={320}
                  height={200}
                  className="w-full h-auto hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityGive;
