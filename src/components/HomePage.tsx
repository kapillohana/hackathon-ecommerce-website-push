"use client";
import Image from "next/image";
import ForthSection from "./FourthSection";
// import FifthSection from "./FifthSection";
import ProductGrid from "./ProductGrid";
import DisplayCategories from "./DisplayCategories";
import ReviewSection from "./Reviews";


const HomePage = () => {



















  
  return (
    <>
      <div className="w-full h-[720px] bg-slate-600 relative">
        <Image
          src="/images/hero-img.png"
          alt="Logo"
          width={1000}
          height={720}
          className=" object-cover w-full h-full"
        />

        <div className="absolute top-1/2 right-5 sm:right-10 md:right-20 lg:right-20 xl:right-20 md:h-[476px] h-[400px] w-[80%] sm:w-[70%] md:w-[65%] lg:w-[643px] bg-[#FAF3E3] transform -translate-y-1/2 px-4 sm:px-6 md:px-8 lg:px-[2.5rem] pt-6 sm:pt-8 md:pt-[4.5rem] rounded-lg">
          <h6 className="text-black mb-[1rem] font-bold [letter-spacing:0.3em]">
            New Arrival
          </h6>
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] text-[#B88E2F] leading-none font-bold mb-[1rem]">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-[1rem] sm:text-[1.13rem] md:text-[1.2rem] lg:text-[1.13rem] text-black mb-[2.5rem] tracking-widest">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolor
            nam quos assumenda delectus iusto.
          </p>
          <button className="bg-[#B88E2F] w-[12rem] sm:w-[13.88rem] h-[4.5rem] sm:h-[4.63rem] mb-[2rem] sm:mb-[3rem] text-white font-semibold rounded-md">
            BUY NOW
          </button>
          
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full px-4 text-center mt-[2.5rem]">
        <h1 className="text-[#333333] font-bold text-[2rem] font-sans">
          Browse The Range
        </h1>
        <p className="text-[#666666] font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          sapiente?
        </p>

        <div className="flex flex-wrap justify-center gap-5 pt-[2.5rem]">
          <div className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]">
            <Image
              src="/images/pic1.png"
              alt="display1"
              className="rounded-xl w-full h-auto transform transition duration-500 hover:scale-95 hover:shadow-lg "
              layout="responsive"
              width={381}
              height={480}
            />
            <h3 className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]">
              Dining
            </h3>
          </div>

          <div className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]">
  <Image
    src="/images/pic2.png"
    alt="display2"
    className="rounded-xl w-full h-auto transform transition duration-500 hover:scale-95 hover:shadow-lg "
    layout="responsive"
    width={381}
    height={480}
  />


            <h3 className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]">
              Living
            </h3>
          </div>

          <div className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]">
            <Image
              src="/images/bedroom.png"
              alt="display3"
              className="rounded-xl w-full h-auto transform transition duration-500 hover:scale-95 hover:shadow-lg "
              layout="responsive"
              width={381}
              height={480}
            />
            <h3 className="mt-3 text-center text-[#333333] text-[1.50rem] font-bold pt-[1.5rem]">
              Bedroom
            </h3>
          </div>
        </div>
      </div>

      <ProductGrid />
      
      {/* Fourth Section */}
      <ForthSection />

      {/* FifthSection Gallery */}
      {/* <FifthSection /> */}
      <DisplayCategories />
< ReviewSection />      
    </>
  );
};

export default HomePage;
