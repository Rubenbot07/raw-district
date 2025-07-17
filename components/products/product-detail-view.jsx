import Image from "next/image";
import { SizesWrapper } from "@/components/categories/sizes-wrapper";

export const ProductDetailView = ({ product }) => {
  const image1 = product?.product_images.find((image) => image?.position === 1);
  const image2 = product?.product_images.find((image) => image?.position === 2);
  const image3 = product?.product_images.find((image) => image?.position === 3);

  return (
    <div>
      <div>
        <SizesWrapper product={product} />
      </div>

      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>

      <div className="flex flex-col gap-4">
        {image1 && (
          <div className="relative w-1/2 aspect-[4/5] rounded-lg shadow-lg">
            <Image
              src={image1.image_url}
              alt={product.name}
              fill
              priority // Preload imagen principal
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {image2 && (
          <div className="relative w-1/2 aspect-[4/5] rounded-lg shadow-lg">
            <Image
              src={image2.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {image3 && (
          <div className="relative w-1/2 aspect-[4/5] rounded-lg shadow-lg">
            <Image
              src={image3.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>
      <p className="text-lg mt-2">Category: {product.categories?.name}</p>
    </div>
  );
};