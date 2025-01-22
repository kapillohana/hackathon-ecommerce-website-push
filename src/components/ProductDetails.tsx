"use client";

import Image from "next/image";
import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountedPercentage?: number;
  tags: string[];
  image: string;
  additionalImages?: string[];
  colors?: string[];
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  const discountedPrice = product.discountedPercentage
    ? (product.price * (1 - product.discountedPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = () => {
    alert(`Added ${quantity}x ${product.title} in ${selectedColor} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center object-cover">
        {/* Product Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[500px]">
            <Image
              src={selectedImage}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                width={100}
                height={100}
                className={`rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? "border-[#FF7A28]" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          {/* Price Section */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">Rs: {product.price}.00</span>
            {discountedPrice && (
              <span className="text-xl text-gray-500 line-through">Rs: {discountedPrice}</span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Color:</span>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-lg w-32">
              <button
                className="px-3 py-2 bg-gray-200 rounded-l-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                className="w-full text-center border-none outline-none"
              />
              <button
                className="px-3 py-2 bg-gray-200 rounded-r-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#FF7A28] text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-[#ff5e00] transition"
          >
            Add to Cart
          </button>

          {/* Additional Product Info */}
          <div className="text-gray-500 text-sm">
            <p>Tags: {product.tags.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
