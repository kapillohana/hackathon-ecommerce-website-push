import { groq } from "next-sanity";
import { Product } from "../../../Types"; // Ensure this type is correctly defined
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";

// Fetch product data from Sanity
const getProduct = async (slug: string): Promise<Product | null> => {
  return await client.fetch(
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
};

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const products = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "product"].slug.current`
  );

  return products.map((product) => ({
    params: { slug: product.slug },
  }));
}

// Single product page component
export default async function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <p className="text-center text-gray-600">Product not found</p>;
  }

  return <ProductDetails product={product} />;
}
