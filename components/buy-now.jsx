'use client'
import { useBuyNow } from '@/app/hooks/useBuyNow';
import { useState } from 'react';
import { useUserStore } from '@/app/stores/userStore';

export const BuyNow = ({productId, quantity = 1, unit_price, product_size_id}) => {
    const user = useUserStore((state) => state.user);
    console.log(user)
    const [loading, setLoading] = useState(false);
    const { handleBuyNow, restoreOriginalCart } = useBuyNow({productId, quantity, unit_price, product_size_id, setLoading });
    const handleClick = async () => {
        if (!user) {
            console.log('User not authenticated');
            return;
        }
        try {
            await handleBuyNow();
        } catch (error) {
            console.error('Error during Buy Now:', error);
            // Restore the original cart in case of error
            await restoreOriginalCart();
            // Optionally, clear the temporary cart if needed
         
        }        
    }
    
    return (
        <button onClick={handleClick} className="bg-black text-white py-2 px-4 rounded-lg">
            {loading ? 'Processing...' : 'Buy Now'}
        </button>
    );
};