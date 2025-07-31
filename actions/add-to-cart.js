'use server';
import { getActiveCart } from "@/actions/get-active-cart";
import { getQuickCart } from "@/actions/get-quick-cart";
import { getUser } from "./get-user";
import { supabase } from "@/lib/supabase/supabaseClient";

export const addToCart = async ({
    productId,
    quantity = 1,
    unit_price,
    product_size_id,
    replaceQuantity = false,
    type = "active" // Nuevo prop, default "active"
}) => {
    const { user, error: userError } = await getUser();
    if (!user) {
        return { data: null, error: userError?.message || "User not authenticated." };
    }

    // Selecciona el cart según el tipo
    let cart;
    if (type === "quick") {
        cart = await getQuickCart(user.id);
    } else {
        cart = await getActiveCart(user.id);
    }

    if (!cart) {
        return { data: null, error: `No ${type} cart found for user.` };
    }

    const { data, error } = await supabase.rpc('get_available_stock', {
        product_size_id_input: product_size_id
    });

    if (error) {
        console.error(error)
        return { data: null, error: error.message }; 
    }

    const availableStock = data;

    if (availableStock < quantity) {
        return { data: null, error: `Only ${availableStock} units available.` };
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
        const newQuantity = replaceQuantity
            ? quantity
            : existingItems.quantity + quantity;
        const { data, error } = await supabase
            .from("cart_items")
            .update({ quantity: newQuantity })
            .eq("id", existingItems.id)
            .select()
            .single();
        return { data, error };
    } else {
        const { data, error } = await supabase
            .from("cart_items")
            .insert({ product_id: productId, cart_id: cart.id, quantity, unit_price, product_size_id })
            .select()
            .single();
        return { data, error };
    }
};