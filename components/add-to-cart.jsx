'use client';
import { useEffect, useState } from "react";
import { SizesSelect } from "./sizes-select";
import { supabase } from "@/lib/supabase/supabaseClient";
import { getSizesProduct } from "@/actions/get-sizes-product";

export const AddToCartButton = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(null);
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
            />
            <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                disabled={!selectedSize}
                onClick={() => {
                    alert(`Agregado al carrito: talla ${selectedSize?.size}`);
                }}
            >
                Add to cart
            </button>
        </div>
    );
};