'use client';
import { useEffect, useState } from "react";
import { SizesSelect } from "./sizes-select";
import { supabase } from "@/lib/supabase/supabaseClient";

export const AddToCartButton = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState(product.product_sizes);

    // Real-time subscription to product_sizes changes
    useEffect(() => {
        // Refetch sizes from Supabase
        const fetchSizes = async () => {
            const { data } = await supabase
                .from('product_sizes')
                .select('*')
                .eq('product_id', product.id);
            if (data) setSizes(data);
        };

        // Subscribe to realtime changes
        const channel = supabase
            .channel('public:product_sizes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'product_sizes', filter: `product_id=eq.${product.id}` },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchSizes();
                }
            )
            .subscribe();

        // Cleanup
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