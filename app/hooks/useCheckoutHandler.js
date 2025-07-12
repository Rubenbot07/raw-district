import { createAddress } from '@/actions/create-address';
import { createOrder } from '@/actions/create-order';
import { createOrderItems } from '@/actions/create-order-items';
import { updateCart } from '@/actions/update-cart';

export const useCheckoutHandler = ({ user, cart, cartItems, setCartItems, setCart, setCartUpdated, router }) => {
  const handleCheckout = async ({ delivery, payment, formData }) => {
    const createOrders = async (shipping_address_id) => {
      const status = payment === "mercado_pago" ? "paid" : "pending";
      const { order, error } = await createOrder({
        status,
        user_id: user.id,
        shipping_address_id,
        payment_method: payment,
        shipping_method: delivery,
        total_price: cart.total_price,
      });

      if (error) throw new Error("Error creating order");

      await createOrderItems({
        orderId: order.id,
        orderItems: cartItems,
        cartId: cart.id,
      });

      const newCart = await updateCart(cart.id);
      setCartItems([]);
      setCart(newCart);
      setCartUpdated(true);
      router.push('/');
    };

    if (delivery === "shipping") {
      const { address, error } = await createAddress({
        user_id: user.id,
        email: user.email,
        first_name: formData.name,
        last_name: formData.surname,
        address_line: formData.address,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        identification: formData.identification,
      });
      if (error) throw new Error("Error creating address");
      await createOrders(address.id);
    } else {
      const { address, error } = await createAddress({
        user_id: user.id,
        email: user.email,
        phone: user?.user_metadata?.phone || null,
      });
      if (error) throw new Error("Error creating pickup address");
      await createOrders(address.id);
    }
  };

  return { handleCheckout };
};