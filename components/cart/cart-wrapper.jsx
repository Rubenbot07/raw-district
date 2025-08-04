import { Cart } from '@/components/cart/cart';

export const CartWrapper =  () => {    

  return (
    <section
      role="region"
      aria-labelledby="cart-section-title"
      className="bg-white h-auto w-auto flex flex-col items-center justify-center"
    >
      {/* Título solo visible para screen readers */}
      <h2 id="cart-section-title" className="sr-only">
        Shopping Cart
      </h2>

      <Cart />
    </section>
  );
}