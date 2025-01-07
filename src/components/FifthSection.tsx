import React from "react";

const Gallery = () => {
  const images = [
    "/images/gallery (9).png", // Replace with correct paths
    "/images/image (7).png",
    "/images/slide3.png",
    "/images/slide4.png",
    "/images/slide5.png",
    "/images/slide6.png",
    "/images/slide7.png",
    "/images/slide8.png",
  ];

  return (
    <div className="container mx-auto text-center py-10">
      <h2 className="text-3xl font-semibold mb-8">
        Share your setup with{" "}
        <span className="text-orange-600">#FuniroFurniture</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg w-full h-80" // Fixed height of 320px (h-80)
          >
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-full object-cover" // Ensure image covers the container
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
