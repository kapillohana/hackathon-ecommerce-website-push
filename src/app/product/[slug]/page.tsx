import { groq } from "next-sanity";

import { Product } from "../../../../Types";


import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";

interface ProductPageProps {
  params: { slug: string };
}

// Fetch product data from Sanity
async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      description,
      price,
      discountedPercentage,
      tags,
      "image": productImage.asset->url,
      "additionalImages": additionalImages[].asset->url,
      colors
    }`,
    { slug }
  );
}

export default async function SingleProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <p className="text-center text-gray-600">Product not found</p>;
  }

  return <ProductDetails product={product} />;
}
