'use client'

import { useBuyNow } from '@/app/hooks/useBuyNow';
import { useState } from 'react';
import { useUserStore } from '@/app/stores/userStore';
import { useRouter } from 'next/navigation';

export const BuyNow = ({ productId, quantity = 1, unit_price, product_size_id }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { handleBuyNow, restoreOriginalCart } = useBuyNow({
    productId,
    quantity,
    unit_price,
    product_size_id,
    setLoading,
  });

  const handleClick = async () => {
    if (loading) return;

    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      await handleBuyNow();
    } catch (error) {
      console.error('Error during Buy Now:', error);
      await restoreOriginalCart();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="Buy this product now"
      aria-disabled={loading}
      className={`py-2 px-4 rounded-lg text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
      }`}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
};