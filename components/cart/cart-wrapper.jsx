import { Cart } from '@/components/cart/cart';

export const CartWrapper = async () => {    

  return (
    <div className="bg-white h-auto w-auto flex flex-col items-center justify-center">
        <Cart/>
    </div>
  );
}