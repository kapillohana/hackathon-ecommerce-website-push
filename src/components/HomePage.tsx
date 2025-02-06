"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ForthSection from "./FourthSection";
import ProductGrid from "./ProductGrid";
import DisplayCategories from "./DisplayCategories";
import ReviewSection from "./Reviews";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[720px] bg-slate-600 relative">
        <Image
          src="/images/hero-img.png"
          alt="Logo"
          width={1000}
          height={720}
          className="object-cover w-full h-full"
        />
        <motion.div
          className="absolute top-1/2 right-5 sm:right-10 md:right-20 lg:right-20 xl:right-20 md:h-[476px] h-[400px] w-[80%] sm:w-[70%] md:w-[65%] lg:w-[643px] bg-[#FAF3E3] transform -translate-y-1/2 px-4 sm:px-6 md:px-8 lg:px-[2.5rem] pt-6 sm:pt-8 md:pt-[4.5rem] rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h6 className="text-black mb-[1rem] font-bold [letter-spacing:0.3em]">
            New Arrival
          </h6>
          <motion.h1
            className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] text-[#B88E2F] leading-none font-bold mb-[1rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            Discover Our <br /> New Collection
          </motion.h1>
          <motion.p
            className="text-[1rem] sm:text-[1.13rem] md:text-[1.2rem] lg:text-[1.13rem] text-black mb-[2.5rem] tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolor
            nam quos assumenda delectus iusto.
          </motion.p>
          <motion.button
            className="bg-[#B88E2F] w-[12rem] sm:w-[13.88rem] h-[4.5rem] sm:h-[4.63rem] mb-[2rem] sm:mb-[3rem] text-white font-semibold rounded-md hover:bg-[#A1782A] transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          >
            BUY NOW
          </motion.button>
        </motion.div>
      </div>

      {/* Second Section */}
      <motion.div
        className="w-full px-4 text-center mt-[2.5rem] md:mt-[4.5rem] lg:mt-[10rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.h1
          className="text-[#333333] font-bold text-[2rem] font-sans"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}
        >
          Browse The Range
        </motion.h1>
        <motion.p
          className="text-[#666666] font-medium mb-[2rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          sapiente?
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-5 pt-[2.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1, ease: "easeOut" }}
        >
          {/* Dining Section */}
          <motion.div
            className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/pic1.png"
              alt="display1"
              className="rounded-xl w-full h-auto"
              layout="responsive"
              width={381}
              height={480}
            />
            <motion.h3
              className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              Dining
            </motion.h3>
          </motion.div>

          {/* Living Section */}
          <motion.div
            className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/pic2.png"
              alt="display2"
              className="rounded-xl w-full h-auto"
              layout="responsive"
              width={381}
              height={480}
            />
            <motion.h3
              className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 1 }}
            >
              Living
            </motion.h3>
          </motion.div>

          {/* Bedroom Section */}
          <motion.div
            className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/bedroom.png"
              alt="display3"
              className="rounded-xl w-full h-auto"
              layout="responsive"
              width={381}
              height={480}
            />
            <motion.h3
              className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 1 }}
            >
              Bedroom
            </motion.h3>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Product Grid Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 1 }}
      >
        <ProductGrid />
      </motion.div>

      {/* Fourth Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <ForthSection />
      </motion.div>

      {/* Display Categories Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <DisplayCategories />
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
      >
        <ReviewSection />
      </motion.div>
    </>
  );
};

export default HomePage;