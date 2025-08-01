'use client'
import { formatPrice } from "@/utils/formatPrice";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore"
import { BuyNow } from "@/components/products/buy-now";
import { Truck, Medal, Shield, MessagesSquare, CircleAlert } from "lucide-react";


export const ProductInfoWrapper = ({ product, children }) => {
    const selectedSize = useProductSelectionStore((state) => state.selectedSize);

    return (
        <div className="flex flex-col gap-8 lg:w-3/4 xl:w-4/6 xl:mx-auto p-2">
            <div className="flex flex-col text-start gap-4">
                <h1 className="text-3xl font-medium">{product.name}</h1>
                <p className="text-md">{formatPrice(product.price)}</p>
            </div>
            {
                product.categories.name !== 'Caps' && 
                <div className="w-2/3">
                    {children}
                </div>
            }
            {
                selectedSize?.stock <= 5 || product.product_sizes[0].stock <= 5 &&
                <div className="flex gap-2 items-center">
                    <CircleAlert size={20} color="#f79554"/>
                    <p className="text-xs">Hurry, only {selectedSize?.stock || product.product_sizes[0].stock } left in stock</p>
                </div>
            }
            <div className="grid grid-cols-2 gap-3 py-4">
                <AddToCartButton  product={product} productId={product.id} product_size_id={selectedSize?.id || product.product_sizes[0].id} unit_price={product.price} />
                <BuyNow productId={product?.id} quantity={1} unit_price={product?.price} product_size_id={selectedSize?.id || product?.product_sizes[0].id}/>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs">Withdrawal available at <strong>Melonn Dosquebradas</strong></p>
                <p className="text-[10px]">It is usually ready in 4 hours</p>
                <div className="flex gap-2 items-center text-[10px]">
                    <Truck size={20} color="#0eb453"/>
                    <span>FREE SHIPPING ON PURCHASES OVER $200,000</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 text-xs">
                <h3 className="underline text-sm">DESCRIPTION</h3>
                <p>{product.description}</p>
                <p>Composition: {product.composition}</p>
            </div>
            <div className="flex flex-col gap-2 text-xs">
                <div className="flex gap-2">
                    <Medal size={20} strokeWidth={1.5}/>
                    <span>Premium Quality</span>
                </div>
                <div className="flex gap-2">
                    <Truck size={20} strokeWidth={1.5}/>
                    <span>Express Shipping</span>
                </div>
                <div className="flex gap-2">
                    <Shield size={20} strokeWidth={1.5}/>
                    <span>Secure Payment</span>
                </div>
                <div className="flex gap-2">
                    <MessagesSquare size={20} strokeWidth={1.5}/>
                    <span>Doubts? Write to us (+57) 3006870774</span>
                </div>
            </div>

        </div>
    );
}