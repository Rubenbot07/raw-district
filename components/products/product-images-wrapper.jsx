import Image from "next/image";
export const ProductImagesWrapper = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const image3 = product?.product_images.find((image) => image?.position === 3);
    return (
        <div className="flex flex-col gap-4 w-full">
            {image1 && (
            <div className="relative w-full aspect-[4/5] rounded-lg shadow-lg">
                <Image
                src={image1.image_url}
                alt={product.name}
                fill
                priority // Preload main image
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover rounded-lg"
                />
            </div>
            )}
            {image2 && (
            <div className="relative w-full aspect-[4/5] rounded-lg shadow-lg">
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
            <div className="relative w-full aspect-[4/5] rounded-lg shadow-lg">
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
    )
}