import React from 'react';
import Image from 'next/image';

// Define the type for the props
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  oldPrice?: string; // Optional prop
  discount?: string; // Optional prop
  badge?: string;    // Optional prop
  imageSrc: string;  // New prop for dynamic images
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  oldPrice,
  discount,
  badge,
  imageSrc,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={200}
          className="rounded-lg"
        />
        {badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-bold mt-4 text-lg">{title}</h3>
      <p className="text-gray-500">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-red-500 font-bold">{price}</span>
          {oldPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">{oldPrice}</span>
          )}
        </div>
        {discount && <span className="text-sm bg-yellow-200 px-2 rounded">{discount}</span>}
      </div>
    </div>
  );
};

const Shop = () => {
  const productImages = [
    '/images/gallery1 (1).png',
    '/images/gallery1 (2).png',
    '/images/gallery1 (3).png',
    '/images/gallery1 (4).png',
    '/images/gallery1 (5).png',
    '/images/gallery1 (6).png',
    '/images/gallery1 (7).png',
    '/images/gallery1 (8).png',
    '/images/gallery1 (8).png',
    '/images/gallery1 (1).png',
    '/images/gallery1 (2).png',
    '/images/gallery1 (132).png',
    '/images/gallery1 (4).png',
    '/images/gallery1 (5).png',
    '/images/gallery1 (6).png',
    '/images/gallery1 (7).png',
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Page Heading */}
      <div 
        className="text-center my-8 bg-cover bg-center py-16"
        style={{ backgroundImage: "url('/images/Rectangle 1.png')" }}
      >
        <h1 className="text-4xl font-bold text-white">Shop</h1>
        <p className="text-gray-200 mt-2">Home / Shop</p>
      </div>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-500">Filter</div>
        <div className="text-gray-500">Showing 1–16 of 32 results</div>
        <div className="text-gray-500">Show 16</div>
        <div className="text-gray-500">Sort by Default</div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {productImages.map((imageSrc, index) => (
          <ProductCard
            key={index}
            title="Syltherine"
            description="Stylish cafe chair"
            price="Rp 2.500.000"
            oldPrice={index % 2 === 0 ? "Rp 3.500.000" : undefined}
            discount={index % 4 === 0 ? "New" : undefined}
            badge={index % 2 === 0 ? "-30%" : undefined}
            imageSrc={imageSrc}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="mx-1 px-4 py-2 border rounded">1</button>
        <button className="mx-1 px-4 py-2 border rounded bg-gray-200">2</button>
        <button className="mx-1 px-4 py-2 border rounded">3</button>
        <button className="mx-1 px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
};

export default Shop;