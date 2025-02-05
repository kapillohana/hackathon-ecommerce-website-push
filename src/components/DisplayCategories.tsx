import React from "react";
import Image from "next/image"; // Import Next.js Image component

const DisplayCategories: React.FC = () => {
  // Array of products with unique categories and item counts
  const products = [
    {
      image: "/images/product1.png",
      category: "Home Furniture",
      title: "Delicious Burger",
      name: "Fast Food Co.",
      description: "A tasty and juicy burger with fresh ingredients.",
      items: 25, // Unique item count
    },
    {
      image: "/images/product7.png",
      category: "Office Furniture",
      title: "Cheesy Pizza",
      name: "Pizza House",
      description: "A mouth-watering pizza loaded with cheese and toppings.",
      items: 40, // Unique item count
    },
    {
      image: "/images/product3.png",
      category: "Outdoor Furniture",
      title: "Refreshing Drink",
      name: "Cool Beverages",
      description: "A refreshing drink to quench your thirst.",
      items: 60, // Unique item count
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Collections</h1>
      <p className="text-center mb-2">
        "Discover furniture collections that blend aesthetics with functionality. Whether
        it&apos;s home, office, or outdoor living, <br /> we have something for every space."
      </p>
      <div className="flex justify-center gap-10 flex-wrap p-8 bg-white">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative w-96 h-[500px] overflow-hidden rounded-3xl shadow-lg group bg-white"
          >
            {/* Full Background Image */}
            <div className="absolute inset-0">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 ease-in-out group-hover:bg-opacity-60 flex flex-col justify-end p-6">
              {/* Category Name */}
              <span className="text-[#ff7128] text-sm font-medium mb-6 uppercase">
                {product.category}
              </span>

              {/* Product Title */}
              <h2 className="text-white text-2xl font-bold">{product.title}</h2>

              <p className="text-gray-300 text-sm">by {product.name}</p>
              <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 translate-y-0 transition-all duration-500">
                {product.description}
              </p>

              {/* Button & Items Count with Hover Effect */}
              <div className="flex justify-between items-center mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-sm font-normal">
                  {product.items} items
                </span>
                <button className="px-12 py-2 backdrop-brightness-200 text-white rounded-full font-semibold text-md transition duration-300 hover:bg-white hover:text-[#ff7128]">
                  View Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayCategories;
