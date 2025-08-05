'use client';

import { useEffect, useState } from "react";
import { SizesSelect } from "@/components/categories/sizes-select";
import { supabase } from "@/lib/supabase/supabaseClient";
import { getSizesProduct } from "@/actions/get-sizes-product";
import { useProductSelectionStore } from "@/app/stores/productSelectionStore";

export const SizesWrapper = ({ product }) => {
  const selectedSize = useProductSelectionStore((state) => state.selectedSize);
  const setSelectedSize = useProductSelectionStore((state) => state.setSelectedSize);
  const [sizes, setSizes] = useState(product.product_sizes || []);

  const fetchSizes = async () => {
    const { sizes, error } = await getSizesProduct(product.id);
    if (!error && sizes) {
      setSizes(sizes);
      setSelectedSize(null); // Reset selected size to force re-selection
    }
  };

  useEffect(() => {
    fetchSizes();

    const channel = supabase
      .channel('public:product_sizes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_sizes' },
        () => fetchSizes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product.id]);

  useEffect(() => {
    if (!selectedSize && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize, setSelectedSize]);

  if (!selectedSize) return null;

  return (
    <div>
      <SizesSelect
        sizes={sizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />
    </div>
  );
};