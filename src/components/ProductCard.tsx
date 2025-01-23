
import React from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
// Define product props
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  slug: {
    current: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#F4F5F7] relative overflow-hidden flex flex-col transition-all duration-300 hover:scale-105">
      <Link href={`/product/${product.slug.current}`}>
        <div className="relative w-full h-[300px]">
          <Image src={product.image} alt={product.title} width={300} height={300} className="object-cover w-full h-full" />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">{product.description.slice(0, 100)}...</p>
        <div className="mt-2">
          <span className="font-bold text-xl text-gray-800">Rs: {product.price}</span>
        </div>
        <button
          className="bg-[#FF7A28] text-white px-4 py-2 rounded-md mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
