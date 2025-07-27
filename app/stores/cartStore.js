import { create } from 'zustand';
import { getCartItems } from '@/actions/get-cart-items';
import { getActiveCart } from '@/actions/get-active-cart';
import { getQuickCart } from '@/actions/get-quick-cart';
import { addToCart as addToCartAction } from '@/actions/add-to-cart';
import { createCart } from '@/actions/create-cart';
import { removeFromCart as removeFromCartAction } from '@/actions/remove-from-cart';

export const useCartStore = create((set, get) => ({
  cart: null,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  cartUpdated: false,
  originalCart: null,

  saveOriginalCart: () => {
    const currentCart = get().cart;
    if (currentCart) {
      set({ originalCart: { ...currentCart } });
    }
    return currentCart;
  },

  createQuickCart: async () => {
    const newCart = await createCart({ type: 'quick' });
    if (newCart) {
      set({
        cart: newCart,
        cartItems: [],
        totalPrice: 0,
        totalQuantity: 0,
        cartUpdated: false,
      });
    }
  },

  restoreOriginalCart: () => {
    const original = get().originalCart;
    if (original) {
      set({
        cart: { ...original },
        cartItems: [],
        totalPrice: original.total_price || 0,
        totalQuantity: original.total_quantity || 0,
        cartUpdated: false,
      });
    }
  },

  setCart: (cart) => set({ cart }),
  setCartItems: (items) => set({ cartItems: items }),
  setTotalPrice: (price) => set({ totalPrice: price }),
  setTotalQuantity: (qty) => set({ totalQuantity: qty }),
  setCartUpdated: (value) => set({ cartUpdated: value }),

loadCart: async (userId, type = "active") => {
  let cart;
  if (type === "quick") {
    cart = await getQuickCart(userId);
  } else {
    cart = await getActiveCart(userId);
  }
  if (!cart) return;

  const items = await getCartItems(cart.id);
  set({
    cart,
    cartItems: items || [],
    totalPrice: cart.total_price || 0,
    totalQuantity: cart.total_quantity || 0,
  });
},

  refreshCartIfUpdated: async (userId) => {
    const { cartUpdated, cart } = get();
    if (!cartUpdated || !cart) return;

    const items = await getCartItems(cart.id);
    const activeCart = await getActiveCart(userId);

    set({
      cart: activeCart,
      cartItems: items,
      totalPrice: activeCart?.total_price || 0,
      totalQuantity: activeCart?.total_quantity || 0,
      cartUpdated: false,
    });
  },

  addToCart: async ({ productId, quantity = 1, unit_price, product_size_id, replaceQuantity = false, type = "active" }) => {
    try {
      await addToCartAction({ productId, quantity, unit_price, product_size_id, replaceQuantity, type });
      set({ cartUpdated: true });
    } catch (error) {
      console.error(error);
      const currentItems = get().cartItems;
      const filteredItems = currentItems.filter(item => item.product_id !== productId);
      set({
        cartItems: filteredItems,
        totalPrice: get().totalPrice - unit_price,
        totalQuantity: get().totalQuantity - quantity,
      });
    }
  },

  removeFromCart: async (itemId) => {
    try {
      await removeFromCartAction(itemId);
      set({ cartUpdated: true });
    } catch (error) {
      console.error(error);
    }
  },

  addToCartLocal: ({ product, quantity = 1, product_size_id }) => {
    const itemId = crypto.randomUUID();
    const prevItems = get().cartItems;
    const existingItem = prevItems.find(
      item => item.product_id === product.id && item.product_size_id === product_size_id
  );

    let newItems;
    if (existingItem) {
      newItems = prevItems.map(item =>
        item.product_id === product.id && item.product_size_id === product_size_id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [
        ...prevItems,
        {
          id: itemId,
          cart_id: null,
          product_id: product.id,
          product_size_id,
          quantity,
          unit_price: product.price,
          added_at: new Date().toISOString(),
          products: product,
        },
      ];
    }
    set({ cartItems: newItems });
  },

  updateItemQuantityLocal: (itemId, newQuantity) => {
    const updated = get().cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    set({ cartItems: updated });
  },

  removeFromCartLocal: (itemId) => {
    const filtered = get().cartItems.filter(item => item.id !== itemId);
    set({ cartItems: filtered });
  },

  getCartTotalQuantityLocal: () => {
    return get().cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  },

  getCartTotalPriceLocal: () => {
    return get().cartItems.reduce(
      (acc, item) => acc + ((item.unit_price || 0) * (item.quantity || 0)),
      0
    );
  },
}));