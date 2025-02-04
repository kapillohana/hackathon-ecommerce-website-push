// components/StylishGallery.jsx
import Image from 'next/image';

const galleryItems = [
  { id: 1, src: '/images/product1.png', alt: 'Bedroom Set', width: 600, height: 400 },
  { id: 2, src: '/images/product2.png', alt: 'Vintage Radio', width: 700, height: 450 },
  { id: 3, src: '/images/product3.png', alt: 'Living Room Decor', width: 800, height: 600 },
  { id: 4, src: '/images/product4.png', alt: 'Dining Table Set', width: 500, height: 350 },
  { id: 5, src: '/images/product5.png', alt: 'Office Desk Setup', width: 650, height: 500 },
  { id: 6, src: '/images/product6.png', alt: 'Classic Wooden Chair', width: 600, height: 450 },
  { id: 7, src: '/images/product7', alt: 'Wall Shelf', width: 750, height: 500 },
  { id: 8, src: '/images/nightstand.jpg', alt: 'Nightstand & Decor', width: 550, height: 400 },
];

const StylishGallery = () => {
  return (
    <section className="mx-auto max-w-7xl p-4">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">#FunForFurniture</h2>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg shadow"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width} // Dynamic width for each image
              height={item.height} // Dynamic height for each image
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-semibold text-white">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StylishGallery;
