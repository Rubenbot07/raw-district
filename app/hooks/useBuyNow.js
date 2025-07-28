import { useCartStore } from "@/app/stores/cartStore";
import { useRouter } from "next/navigation";

export const useBuyNow = ({ productId, quantity, unit_price, product_size_id, setLoading }) => {
    const saveOriginalCart = useCartStore((state) => state.saveOriginalCart);
    const createQuickCart = useCartStore((state) => state.createQuickCart);
    const addToCart = useCartStore((state) => state.addToCart);
    const loadCart = useCartStore((state) => state.loadCart); // asegúrate de tener esta función
    const router = useRouter();

    const handleBuyNow = async () => {
        setLoading(true);
        try {
            await saveOriginalCart();
            await createQuickCart();
            // Espera a que el cart esté en el store
            const quickCart = useCartStore.getState().cart;
            if (!quickCart || !quickCart.id) throw new Error("Quick cart not created");

            await addToCart({
                productId,
                quantity,
                unit_price,
                product_size_id,
                type: "quick"
            });

            // Recarga los items y totales del carrito rápido
            await loadCart(quickCart.user_id, 'quick');

            if (useCartStore.getState().cart?.status === "quick") {
                router.push('/checkouts');
            }
        } catch (error) {
            console.error('Error during Buy Now:', error);
        } finally {
            setLoading(false);
        }
    };

    return { handleBuyNow };
}