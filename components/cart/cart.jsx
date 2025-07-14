'use client'
import { ProductCartItem } from "@/components/cart/product-cart-item"
import { CartIcon } from '@/components/icons/cart-icon'
import { CheckoutButton } from '@/components/cart/checkout-button'
import { formatPrice } from '@/utils/formatPrice'
import { usePathname } from "next/navigation";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useCartStore } from "@/app/stores/cartStore";
export const Cart =  () => {
    const getCartTotalPriceLocal = useCartStore((state) => state.getCartTotalPriceLocal);
    const getCartTotalQuantityLocal = useCartStore((state) => state.getCartTotalQuantityLocal);
    const cartItems = useCartStore((state) => state.cartItems);
    const openCart = useCartUIStore((state) => state.openCart);
    const setOpenCart = useCartUIStore((state) => state.setOpenCart);
    const totalPrice = getCartTotalPriceLocal()
    const totalQuantity = getCartTotalQuantityLocal()
    const formattedPrice = formatPrice(totalPrice)
    const pathname = usePathname();
    return (
<>
    {openCart && (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={() => setOpenCart(false)}
        aria-label="Close cart overlay"
      />
    )}
    <div
      className={`
        fixed top-0 right-0 z-50 h-full w-[350px] max-w-full bg-white shadow-lg transition-transform duration-300
        flex flex-col justify-start
        ${openCart ? 'translate-x-0' : 'translate-x-full'}
      `}
      style={{ willChange: 'transform' }}
    >
      <div className="flex justify-between w-full px-4 py-3 items-center border-b-[1px] border-gray-300">
        <h2 className="text-MD font-bold">YOUR CART ({totalQuantity})</h2>
        <button onClick={() => setOpenCart(false)}>
          Close
        </button>
      </div>
      {cartItems && cartItems.length ? (
        <div>
          <ul className="flex flex-col gap-4 w-full">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item border-b-[1px] border-gray-300">
                <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id} sizeId={item.product_size_id}/>
              </li>
            ))}
          </ul>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <p className="font-semibold">TOTAL</p>
              <p className="font-semibold text-xl">{formattedPrice}</p>
            </div>
            <CheckoutButton />
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
    {/* Botón para abrir el carrito */}
    <button
      onClick={() => setOpenCart(true)}
      className={`${((pathname.startsWith('/auth/')) || pathname.startsWith('/checkouts') || pathname.startsWith('/profile')) ? 'hidden' : 'block'} px-4 py-2 relative`}
    >
      <CartIcon />
      <span className="absolute top-1 right-2 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{totalQuantity}</span>
    </button>

  </>
    )
}