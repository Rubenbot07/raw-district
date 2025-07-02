'use client'
import { getActiveCart } from "./get-active-cart";
import { getUser } from "./get-user";
import { supabase } from "../lib/supabase/supabaseClient";

export const addToCart = async ({ productId, quantity = 1, unit_price, product_size_id }) => {
    const { user, error: userError } = await getUser();
    if (!user) {
        return { data: null, error: userError?.message || "User not authenticated." };
    }

    const cart = await getActiveCart(user.id);
    if (!cart) {
        return { data: null, error: "No active cart found for user." };
    }

    const { data, error } = await supabase
        .from("cart_items")
        .insert({ product_id: productId, cart_id: cart.id, quantity, unit_price, product_size_id });

    return { data, error };
};