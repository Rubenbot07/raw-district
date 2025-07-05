'use client'
import { getActiveCart } from "./get-active-cart";
import { getUser } from "./get-user";
import { supabase } from "@/lib/supabase/supabaseClient";

export const addToCart = async ({ productId, quantity = 1, unit_price, product_size_id }) => {
    const { user, error: userError } = await getUser();
    if (!user) {
        return { data: null, error: userError?.message || "User not authenticated." };
    }

    const cart = await getActiveCart(user.id);
    if (!cart) {
        return { data: null, error: "No active cart found for user." };
    }
    const { data, error } = await supabase.rpc('get_available_stock', {
    product_size_id_input: product_size_id
    });

    if (error) {
        console.error(error)
        return; 
    }

    const availableStock = data

    if (availableStock < quantity) {
        alert(`There is only ${availableStock} units available for this product size.`);
        return 
    }

    const { data: existingItems, error: findError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .eq("product_size_id", product_size_id)
        .maybeSingle();

    if (findError && findError.code !== "PGRST116") {
        return { data: null, error: findError.message };
    }

    if (existingItems) {
        const { data, error } = await supabase
            .from("cart_items")
            .update({ quantity: existingItems.quantity + 1 })
            .eq("id", existingItems.id)
            .select()
            .single();
        return { data, error };
    } else {
        // Si no existe, inserta nuevo
        const { data, error } = await supabase
            .from("cart_items")
            .insert({ product_id: productId, cart_id: cart.id, quantity, unit_price, product_size_id })
            .select()
            .single();
        return { data, error };
    }
};