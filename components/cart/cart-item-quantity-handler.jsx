import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { useCartStore } from "@/app/stores/cartStore";
import { useUserStore } from "@/app/stores/userStore";
import { useTranslations } from "next-intl";

export const CartItemQuantityHandler = ({ product, sizeId, itemId, quantity, setCartUpdated }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateItemQuantityLocal = useCartStore((state) => state.updateItemQuantityLocal);
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const tToast = useTranslations("Toast");
  const tAriaLabel = useTranslations("AriaLabel");

  const handleQuantityChange = async (newQuantity) => {
    const previousQuantity = quantity;
    updateItemQuantityLocal(itemId, newQuantity);

    if (user) {
      const result = await addToCart({
        product,
        productId: product.id,
        quantity: newQuantity,
        unit_price: product.price,
        product_size_id: sizeId,
        replaceQuantity: true,
      });

      if (!result.success) {
        updateItemQuantityLocal(itemId, previousQuantity);
        toast.error(`${tToast("updateQuantityError")} ${result.error}`);
        return;
      }
    }

    setCartUpdated(true);
    toast.success(`${tToast("updateQuantitySuccess")} ${newQuantity}`);
    setOpen(false);
    buttonRef.current?.focus(); // Devuelve el foco al botón principal
  };



  // Cerrar al hacer clic fuera del componente

  return (
    <div
      className="relative inline-block w-full max-w-24"
    >
      {/* Botón principal */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={tAriaLabel("changeQuantity")}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full border border-black p-2"
        ref={buttonRef}
      >
        {quantity}
        <ChevronDown
          className={`ml-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Lista desplegable de cantidades */}
      {open && (
        <ul
          role="listbox"
          aria-label={tAriaLabel("changeQuantity")}
          tabIndex={-1}
          className="absolute z-10 mt-1 w-full border border-black bg-white shadow-md max-h-40 overflow-y-auto text-sm"
        >
          {[...Array(10)].map((_, i) => {
            const value = i + 1;
            return (
              <li
                key={value}
                role="option"
                aria-selected={value === quantity}
                tabIndex={0}
                className={`px-3 py-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 ${
                  value === quantity ? "font-semibold" : ""
                }`}
                onClick={() => handleQuantityChange(value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleQuantityChange(value);
                  }
                }}
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};