import { useTranslations } from "next-intl"
export const BuyButton = ({ onClick , loading}) => {
  const t = useTranslations('Checkout');
  return (
    <button
        onClick={onClick}
        disabled={loading}
        aria-busy={loading}
        aria-label={loading ? "Processing your order" : "Buy now"}
        className={`bg-black text-white py-3 text-center rounded-[8px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? t('loading') : t('buyButton')}
    </button>
  )
}