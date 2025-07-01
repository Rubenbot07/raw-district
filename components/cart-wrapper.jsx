import { Cart } from '@/components/cart';
import { getActiveCart } from '@/actions/get-active-cart';

export const CartWrapper = async ({ userId }) => {    
  const cart = await getActiveCart(userId);

  return (
    <div className="bg-white h-auto w-auto flex flex-col items-center justify-center">
        <Cart cart={userId ? cart : null} />
    </div>
  );
}