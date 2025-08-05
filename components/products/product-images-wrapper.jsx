import Image from "next/image";

export const ProductImagesWrapper = ({ product }) => {
  const images = product?.product_images?.filter((img) => img?.position <= 3) || [];

  const getAltText = (index) => {
    if (index === 0) return `${product.name} - front view`;
    if (index === 1) return `${product.name} - side view`;
    if (index === 2) return `${product.name} - detail view`;
    return product.name;
  };

  return (
    <div className="hidden flex-col gap-4 w-full md:flex">
      {images.map((image, index) => (
        <div
          key={image.id || index}
          className="relative w-full aspect-[4/5] rounded-lg shadow-lg"
        >
          <Image
            src={image.image_url}
            alt={getAltText(index)}
            fill
            priority={index === 0} // Preload only the first image
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};