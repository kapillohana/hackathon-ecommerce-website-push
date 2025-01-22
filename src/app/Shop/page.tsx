"use client";
import React, { useState } from "react";
import { SearchButton } from "@/components/ui/SearchButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShopPage from "@/components/ShopPage";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? undefined : value);
  };

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
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="bed">Bed</SelectItem>
            <SelectItem value="chairs">Chairs</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="sofas">Sofas</SelectItem>
            <SelectItem value="lamps">Lamps</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-gray-500">Showing results</div>
        <SearchButton />
      </div>

      {/* Product Grid */}
      <ShopPage selectedCategory={selectedCategory} />

    </div>
  );
};

export default Shop;
