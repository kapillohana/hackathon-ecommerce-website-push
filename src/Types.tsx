export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountedPercentage?: number;
  tags: string[];
  image: string;
  additionalImages?: string[];
  colors?: string[];
  slug: string; // Change this from an object to a string
}
