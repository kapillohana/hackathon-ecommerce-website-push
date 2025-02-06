import { groq } from "next-sanity";
import { Product } from "../../../Types"; // Ensure this type is correctly defined
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";

// Fetch product data from Sanity with error handling
const getProduct = async (slug: string): Promise<Product | null> => {
  try {
    const product = await client.fetch(
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

    if (!product) {
      console.warn(`⚠️ Product not found for slug: ${slug}`);
      return null;
    }

    return product;
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
};

// Generate static params for dynamic routes
export async function generateStaticParams() {
  try {
    const products = await client.fetch<{ slug: string }[]>(
      groq`*[_type == "product"].slug.current`
    );

    if (!products || products.length === 0) {
      console.warn("⚠️ No products found in Sanity.");
      return [];
    }

    return products.map((product) => ({
      slug: product.slug, // ✅ Correct format
    }));
  } catch (error) {
    console.error("❌ Error fetching product slugs:", error);
    return [];
  }
}

// Single product page component
export default async function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <p className="text-center text-gray-600">⚠️ Product not found</p>;
  }

  return <ProductDetails product={product} />;
}
