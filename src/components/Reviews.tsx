"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "/images/male.jpeg",
    rating: 5,
    review: "Amazing quality and fast delivery! Highly recommended.",
    productImage: "/images/product1.png",
  },
  {
    id: 2,
    name: "Sarah Khan",
    image: "/images/femalee.webp",
    rating: 4,
    review: "Great product, but packaging could be improved.",
    productImage: "/images/product2.png",
  },
  {
    id: 3,
    name: "Ali Raza",
    image: "/images/user3.png",
    rating: 5,
    review: "Exceeded my expectations! Fantastic quality.",
    productImage: "/images/product3.png",
  },
];

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full flex flex-col items-center py-20 bg-gray-100 px-6">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">What Our Customers Say</h2>
        <p className="text-gray-600 mt-2 text-lg">Hear from our happy customers about their experiences!</p>
      </div>

      {/* Review Container */}
      <div className="relative w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center"
          >
            {/* Product Image */}
            <div className="lg:w-1/2 w-full flex justify-center">
              <Image src={reviews[currentIndex].productImage} alt="Product" width={250} height={250} className="rounded-lg shadow-md" />
            </div>

            {/* Review Content */}
            <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mt-6 lg:mt-0">
              <p className="text-gray-700 text-lg">"{reviews[currentIndex].review}"</p>

              <div className="flex items-center mt-4">
                <Image src={reviews[currentIndex].image} alt={reviews[currentIndex].name} width={50} height={50} className="rounded-full border border-gray-300" />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{reviews[currentIndex].name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={`text-lg ${i < reviews[currentIndex].rating ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Modern Pagination Dots */}
      <div className="flex space-x-2 mt-6">
        {reviews.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-gray-300 relative`}
            animate={{
              scale: currentIndex === index ? 1.5 : 1,
              backgroundColor: currentIndex === index ? "#111827" : "#d1d5db",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
