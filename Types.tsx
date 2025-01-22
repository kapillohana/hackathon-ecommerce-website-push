export interface Product {
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
  