"use client";
import React, { useState } from "react";

import ShopPage from "@/components/ShopPage";

const Shop = () => {
  const [selectedCategory, ] = useState<string | undefined>(undefined);

  // Handle category change
  // const handleCategoryChange = (value: string) => {
  //   setSelectedCategory(value === "all" ? undefined : value);
  // };

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

     
       
     

      {/* Product Grid */}
      <ShopPage selectedCategory={selectedCategory} />

    </div>
  );
};

export default Shop;
