"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

// Product interface
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountedPercentage?: number;
  tags: string[];
  image: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

interface ShopPageProps {
  selectedCategory?: string;
}

const query = `
  *[_type == "product"] {
    _id,
    title,
    description,
    price,
    discountedPercentage,
    tags,
    "image": productImage.asset->url,
    slug
  }
`;

const ShopPage: React.FC<ShopPageProps> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((item) => item !== id)
        : [...prevWishlist, id]
    );
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.tags.includes(selectedCategory))
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const truncateDescription = (description: string, maxLength: number = 100) =>
    description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF7A28] border-solid"></div>
        <p className="mt-4 text-[#FF7A28] font-bold">Loading products, please wait...</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return <p className="text-center">No products available.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 lg:mt-20 sm:mt-10">
      <h1 className="text-[#333333] font-bold text-[2.5rem] font-sans mb-8 text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="group bg-[#F4F5F7] relative overflow-hidden flex flex-col items-left transition-all duration-300 transform hover:scale-105"
          >
            <Link href={`/product/${product.slug.current}`} className="block">
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-90"
                />
                {/* Icons on hover */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-4">
                    <button
                      className="bg-white rounded-full p-3 shadow-md hover:bg-[#ff7a28]"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent page navigation
                        toggleWishlist(product._id);
                      }}
                    >
                      {wishlist.includes(product._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
                    </button>
                    <button
                      className="bg-white rounded-2xl p-3 shadow-md hover:bg-[#ff7a28] "
                      onClick={(e) => e.preventDefault()} // Prevent page navigation
                    >
                      <MdOutlineCompareArrows className="text-gray-500" />
                    </button>
                    <button
                      className="bg-white rounded-2xl p-3 shadow-md hover:bg-[#ff7a28]"
                      onClick={(e) => e.preventDefault()} // Prevent page navigation
                    >
                      <IoShareSocial className="text-gray-500" />
                      
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#333333] text-left">{product.title}</h3>
                <p className="mt-1 text-sm text-[#666666] text-left">{truncateDescription(product.description)}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#3a3a3a]">Rs: {product.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-[#FF7A28] text-white rounded-md mr-4 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * productsPerPage >= filteredProducts.length}
          className={`px-4 py-2 bg-[#FF7A28] text-white rounded-md ${
            currentPage * productsPerPage >= filteredProducts.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
