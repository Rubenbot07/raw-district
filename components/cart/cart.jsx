'use client'
import { ProductCartItem, CheckoutButton } from "@/components/cart";
import { X, ShoppingCart, Frown } from "lucide-react";
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
    const hiddenOnRoutes = ['/auth', '/checkouts', '/orders', '/profile']
    const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route))
  
    if(shouldHide) return null

  return (
    <>
      {openCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50"
          onClick={() => setOpenCart(false)}
          aria-label="Close cart overlay"
        />
      )}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-full md:w-[350px] max-w-full bg-white shadow-lg transition-transform duration-500 ease-in-out
          flex flex-col justify-start overflow-y-scroll show-scrollbar
          ${openCart ? 'translate-x-0 opacity-100' : 'translate-x-full'}
        `}
        style={{ willChange: 'transform' }}
      >
        <div className="flex justify-between w-full px-4 py-3 items-center border-b-[1px] border-gray-300">
          <h2 className="text-md font-bold">YOUR CART ({totalQuantity})</h2>
          <button onClick={() => setOpenCart(false)}>
            <X />
          </button>
        </div>
        {cartItems && cartItems.length ? (
          <div className="flex flex-col w-full h-screen">
            <ul className="flex flex-col gap-4 w-full h-[75%] overflow-y-scroll show-scrollbar ">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item border-b-[1px] border-gray-300">
                  <ProductCartItem product={item.products} quantity={item.quantity} itemId={item.id} sizeId={item.product_size_id}/>
                </li>
              ))}
            </ul>
            <div className="px-4 flex flex-col gap-4 w-full py-2 bg-white">
            <div className="text-[10px] p-4 bg-gray-100"><strong>FREE SHIPPING</strong> FOR PURCHASES OVER $200,000 </div>
              <div className="flex justify-between items-center w-full">
                <p className="font-semibold">TOTAL</p>
                <p className="font-semibold text-xl">{formattedPrice}</p>
              </div>
              <CheckoutButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <Frown size={80} strokeWidth={1.5} color="gray"/>
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      {/* Botón para abrir el carrito */}
      <button
        onClick={() => setOpenCart(true)}
        className='px-1 py-2 relative'
      >
        <ShoppingCart strokeWidth={1.5}/>
        <span className="absolute top-1 -right-1 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{totalQuantity}</span>
      </button>

    </>
  )
}