import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart, FaFilter } from "react-icons/fa"; // Import FaFilter
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
  _selectedCategory?: string;
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
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false); // State for filter dropdown
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // State for selected filter category
  const productsPerPage = 8;

  // Define limited categories
  const categories = ["Sofas", "Beds", "Chairs", "Furniture"];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await client.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  function toggleWishlist(id: string) {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((item) => item !== id)
        : [...prevWishlist, id]
    );
  }

  // Filter products by selected category and search term
  const filteredProducts = selectedFilter
    ? products.filter((product) => product.tags.includes(selectedFilter))
    : products;

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function truncateDescription(description: string, maxLength: number = 100) {
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
  }

  // Reset search and filters
  function resetFilters() {
    setSearchTerm("");
    setSelectedFilter("");
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF7A28] border-solid"></div>
        <p className="mt-4 text-[#FF7A28] font-bold">Loading products, please wait...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 lg:mt-20 sm:mt-10">
      {/* Filter and Search Bar */}
      <div className="mb-8 flex justify-between items-center">
        {/* Filter Section */}
        <div className="relative flex items-center space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaFilter className="text-[#FF7A28] text-2xl" /> {/* Filter Icon */}
            <span className="text-[#333333] font-semibold">Filter</span> {/* Filter Text */}
          </button>
          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-[#ddd] rounded-lg shadow-lg z-10">
              <div className="p-2">
                <p className="text-sm font-semibold text-[#333333] mb-2">Filter by Category</p>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedFilter(category);
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left p-2 hover:bg-gray-100 rounded-lg text-sm text-[#666666]"
                  >
                    {category}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setSelectedFilter("");
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-100 rounded-lg text-sm text-[#666666]"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="w-full max-w-[400px] p-2 border border-[#ddd] rounded-lg"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)} // Trigger search when button is clicked
            className="bg-[#FF7A28] text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display "No products found" and "Back" button */}
      {searchedProducts.length === 0 && (
        <div className="text-center">
          <p className="text-[#333333] mb-4">No products found.</p>
          <button
            onClick={resetFilters}
            className="bg-[#FF7A28] text-white px-4 py-2 rounded-lg"
          >
            Back to All Products
          </button>
        </div>
      )}

     
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

      {/* Pagination */}
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
          disabled={currentPage * productsPerPage >= searchedProducts.length}
          className={`px-4 py-2 bg-[#FF7A28] text-white rounded-md ${
            currentPage * productsPerPage >= searchedProducts.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPage;