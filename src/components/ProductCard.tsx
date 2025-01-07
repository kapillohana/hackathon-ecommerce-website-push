import Image from 'next/image';

// Define the type for the props
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  oldPrice?: string; // Optional prop
  discount?: string; // Optional prop
  badge?: string;    // Optional prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  oldPrice,
  discount,
  badge,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="relative">
        <Image
          src="/placeholder.jpg" // Replace with product image path
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

export default ProductCard;
