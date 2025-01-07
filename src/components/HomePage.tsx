"use client"
import Image from "next/image"
import { IoShareSocial } from "react-icons/io5";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import ForthSection from "./FourthSection";
import FifthSection from "./FifthSection";




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
          <h6 className="text-black mb-[1rem] font-bold [letter-spacing:0.3em]">New Arrival</h6>
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] text-[#B88E2F] leading-none font-bold mb-[1rem]">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-[1rem] sm:text-[1.13rem] md:text-[1.2rem] lg:text-[1.13rem] text-black mb-[2.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolor nam quos assumenda delectus iusto.
          </p>
          <button className="bg-[#B88E2F] w-[12rem] sm:w-[13.88rem] h-[4.5rem] sm:h-[4.63rem] mb-[2rem] sm:mb-[3rem] text-white font-semibold">
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
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, sapiente?
  </p>

  <div className="flex flex-wrap justify-center gap-5 pt-[2.5rem]">
    <div className="flex flex-col items-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%]">
      <Image
        src="/images/Pic1.png"
        alt="display1"
        className=" rounded-xl w-full h-auto"
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
        className=" rounded-xl w-full h-auto"
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
        src="/images/pic3.png"
        alt="display3"
        className=" rounded-xl w-full h-auto"
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



        
  

 {/* Third Section */}
<div className="h-auto w-full max-w-screen-xl px-32 mx-auto text-center mt-[3.5rem]">
  <h1 className="text-[#333333] font-bold text-[2.5rem] font-sans mb-8">Our Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { id: 1, name: "Syltherine", description: "Stylish cafe chair", image: "/images/images.png", price: 3500, discountPrice: 2500.000, discount: "-30%" },
      { id: 2, name: "Bedroom Lamp", description: "Elegant night lamp", image: "/images/image1.png", price: 1200, discountPrice: 840.000, discount: "-30%" },
      { id: 3, name: "Lotilo", description: "Luxury Big Sofa", image: "/images/image (21).png", price: 8000, discountPrice: 5600.000, discount: "-30%" },
      { id: 4, name: "Respira", description: "Outdoor bar table and stool", image: "/images/image (22).png", discountPrice: 1750.000, discount: "New" },
      { id: 5, name: "Grifo", description: "Night lamp", image: "/images/image (16).png", discountPrice: 1500.000, discount: "New"},
      { id: 6, name: "Muggo", description: "Small mug", image: "/images/image (23).png",  discountPrice: 150.000, discount: "New" },
      { id: 7, name: "Pingky", description: "Cute bed set", image: "/images/image1.png", price: 14000, discountPrice: 7000.000, discount: "-50%" },
      { id: 8, name: "Potty", description: "Minimalist flower pot", image: "/images/image (17).png", discountPrice: 500, discount: "New" ,},
    ].map((product) => (
      <div
        key={product.id}
        className="group bg-[#F4F5F7] relative   overflow-hidden flex flex-col items-left transition-all duration-300 transform hover:scale-105"
      >
        {/* Image and Overlay */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={285}
            height={301}
            className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-90"
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button className="mb-4 px-10 py-2 bg-white text-[#FF7A28]  text-sm font-semibold  hover:bg-[#ff5e00] hover:text-white">
              Add to Cart
            </button>
            <div className="flex space-x-4 text-sm">
              <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                <span><FaRegHeart />
                </span> <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                <span><MdOutlineCompareArrows />
                </span> <span>Compare</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                <span><IoShareSocial /></span> <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        {/* Text Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#333333] text-left">{product.name}</h3>
          <p className="mt-1 text-sm text-[#666666] text-left">{product.description}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-lg font-bold text-[#3a3a3a]">Rs:{product.discountPrice}.000</span>
            {product.price && (
              <span className="text-sm text-[#666666] line-through">Rs:{product.price}.000</span>
            )}
          </div>
        </div>
        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-[#e97171] text-white text-xs font-medium rounded-full h-10 w-10 content-center text-center ">
          {product.discount}
        </div>
      </div>
    ))}
  </div>
  <button className="bg-transparent text-[#FF7A28] text-base font-semibold px-14 mt-8 py-2 border border-[#FF7A28] hover hover:bg-[#FF7A28] hover:text-white ">Show More</button>
</div>

{/* Fourth Section */}
<ForthSection />

{/* FifthSection Gallery */}
  <FifthSection/>




    </>
  );
};

export default HomePage;
