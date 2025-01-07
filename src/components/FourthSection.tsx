import { useState } from "react";

const ForthSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the images array with correct paths
  const images = [
    "/images/Rectangle 25.png", // Path relative to the 'public' folder
    "/images/Rectangle 26.png",
    "/images/Rectangle 25.png",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row h-auto w-full max-w-screen-lg mx-auto mt-20 bg-[#fcf8f3]">
      {/* Left Section */}
      <div className="w-full md:w-[30%] p-6 bg-gray-100 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">50+ Beautiful Rooms Inspiration</h2>
        <p className="mt-4 text-gray-600">
          Our designer already made a lot of beautiful prototypes of rooms that inspire you.
        </p>
        <button className="bg-[#FF7A28] text-white text-base font-semibold px-6 sm:px-10 mt-8 py-2 border border-[#FF7A28] hover:text-[#FF7A28] hover:bg-white">
          Explore More
        </button>
      </div>

      {/* Middle Section (Image) */}
      <div className="w-full md:w-[35%] flex items-center justify-center bg-[#fcf8f3]">
        <img
          src="/images/slide.png"
          alt="Image"
          className="w-full h-auto rounded"
        />
      </div>

      {/* Right Section with Image Slider */}
      <div className="w-full md:w-[35%] p-4 bg-gray-100 relative">
        <div className="relative h-full flex items-center justify-center">
          {/* Image Slider */}
          <div
            className="w-full overflow-hidden"
            style={{
              height: "auto", // Allow height to adjust on smaller screens
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-[90%] md:h-[90%] object-cover rounded shadow transition-opacity duration-300 ease-in-out"
            />
          </div>

          {/* Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots for Slider Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-400"
                } cursor-pointer`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForthSection;
