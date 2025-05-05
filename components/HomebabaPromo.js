"use client";

import React from "react";
import { motion } from "framer-motion";

const HomebabaPromo = () => {
  const images = [
    {
      src: "/promo/1.jpeg",
      alt: "Featured Luxury Home",
      className: "main-image",
    },
    {
      src: "/promo/2.jpeg",
      alt: "Modern Living Space",
      className: "side-image",
    },
    {
      src: "/promo/3.jpeg",
      alt: "Contemporary Design",
      className: "side-image",
    },
    {
      src: "/promo/4.jpeg",
      alt: "Elegant Interior",
      className: "side-image",
    },
    {
      src: "/promo/5.jpeg",
      alt: "Premium Lifestyle",
      className: "side-image",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="my-16 md:my-24 py-20 relative overflow-hidden">
      {/* Playful background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 opacity-90 z-0">
        <div className="absolute inset-0" />
      </div>

      {/* Colorful decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-pink-300 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="absolute top-40 right-1/4 w-20 h-20 bg-yellow-300 rounded-full blur-3xl opacity-20 z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-4">
          {/* <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            From Dolphy to Home Sweet Home
          </h2>
          <p className="text-3xl text-center text-gray-700">
            Stories of{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Dreams</span>
            </span>
            ,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Journeys</span>
            </span>
            , and{" "}
            <span className="relative inline-block">
              <span className="relative z-10">New Beginnings</span>
            </span>
            <span className="text-pink-500">.</span>
          </p> */}
          <img
            src="/homebabatohome.png"
            alt="Dolphy to Home Sweet Home"
            className="w-[320px] md:w-[800px] mx-auto"
          />
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-xl ${
                index === 0
                  ? " col-span-2 row-span-2 h-[500px]"
                  : index === 1
                  ? " h-[240px]"
                  : index === 2
                  ? " h-[240px]"
                  : index === 3
                  ? " h-[240px]"
                  : " h-[240px]"
              } shadow-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl`}
              variants={itemVariants}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomebabaPromo;
