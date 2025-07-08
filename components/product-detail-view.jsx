import { SizesWrapper } from "./sizes-wrapper";
export const ProductDetailView = ({ product }) => {
    const image1 = product?.product_images.find((image) => image?.position === 1);
    const image2 = product?.product_images.find((image) => image?.position === 2);
    const image3 = product?.product_images.find((image) => image?.position === 3);
    return (
        <div>
            product view
            <div>
                <SizesWrapper product={product} />
            </div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="flex flex-col gap-4">
                {image1 && (
                    <img
                        src={image1.image_url}
                        alt={product.name}
                        className="w-1/2 h-auto rounded-lg shadow-lg"
                    />
                )}
                {image2 && (
                    <img
                        src={image2.image_url}
                        alt={product.name}
                        className="w-1/2 h-auto rounded-lg shadow-lg"
                    />
                )}
                {image3 && (
                    <img
                        src={image3.image_url}
                        alt={product.name}
                        className="w-1/2 h-auto rounded-lg shadow-lg"
                    />
                )}
            </div>
            <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>
            <p className="text-lg mt-2">Category: {product.categories?.name}</p>

        </div>
    )
}