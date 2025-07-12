'use client';
import { useEffect, useState } from "react";
import { SizesSelect } from "@/components/categories/sizes-select";
import { supabase } from "@/lib/supabase/supabaseClient";
import { getSizesProduct } from "@/actions/get-sizes-product";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

export const SizesWrapper = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(product?.product_sizes[0]);
    const [sizes, setSizes] = useState(product.product_sizes || []);

    // Función para traer tallas desde el action
    const fetchSizes = async () => {
        const { sizes, error } = await getSizesProduct(product.id);
        if (!error && sizes) setSizes(sizes);
    };

    // Trae tallas y suscríbete a cambios realtime
    useEffect(() => {
        fetchSizes();
        const channel = supabase
            .channel('public:product_sizes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'product_sizes' },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchSizes();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [product.id]);
    return (
        <div>
            <SizesSelect
                sizes={sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                setSelectedSize={setSelectedSize}
            />
            <AddToCartButton product={product} product_size_id={selectedSize.id} productId={product.id} unit_price={product.price} />
        </div>
    );
};