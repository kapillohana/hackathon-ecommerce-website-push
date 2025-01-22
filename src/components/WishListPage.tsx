// In WishlistPage.tsx

import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountedPercentage?: number;
  tags: string[];
  image: string;
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("/api/products"); // Update with actual API if needed
        const productsData = await data.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredWishlistProducts = products.filter(product =>
    wishlist.includes(product._id)
  );

  const addToCart = (product: Product) => {
    // Logic to add product to the cart
    console.log(`Added ${product.title} to the cart`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 lg:mt-20 sm:mt-10">
      <h1 className="text-[#333333] font-bold text-[2.5rem] font-sans mb-8 text-center">
        Your Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredWishlistProducts.length > 0 ? (
          filteredWishlistProducts.map((product) => (
            <div key={product._id} className="group bg-[#F4F5F7] relative overflow-hidden flex flex-col items-left transition-all duration-300 transform hover:scale-105">
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-90"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#333333] text-left">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-[#666666] text-left">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#3a3a3a]">
                    Rs:{product.price}.000
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-[#FF7A28] text-white rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
