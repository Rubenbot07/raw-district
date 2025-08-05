import { useState } from 'react';
import { useBuyNow } from '@/app/hooks/useBuyNow';

export const BuyButton = ({ productId, quantity = 1, unit_price, product_size_id }) => {
  const [loading, setLoading] = useState(false);
  const { handleBuyNow } = useBuyNow({ productId, quantity, unit_price, product_size_id, setLoading });

  const handleClick = async () => {
    try {
      setLoading(true); // opcional si no lo hace el hook
      await handleBuyNow();
    } catch (error) {
      console.error('Error during Buy Now:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full bg-black text-white py-2 px-4 rounded-lg transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-busy={loading}
        aria-label={loading ? 'Processing purchase' : 'Buy product now'}
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>

      {/* Mensaje que se lee solo con lector de pantalla */}
      <span className="sr-only" aria-live="assertive">
        {loading ? 'Processing your purchase' : ''}
      </span>
    </>
  );
};