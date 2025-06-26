'use client';
import { useState } from "react";
import { SizesSelect } from "./sizes-select";

export const AddToCartButton = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div>
            {/* ...otros detalles del producto... */}
            <SizesSelect
                sizes={product.product_sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
            />
            <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                disabled={!selectedSize}
                onClick={() => {
                    // Aquí puedes usar selectedSize para agregar al carrito
                    alert(`Agregado al carrito: talla ${selectedSize?.size}`);
                }}
            >
                Add to cart
            </button>
        </div>
    );
};