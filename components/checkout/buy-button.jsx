import { useTranslations } from "next-intl"
export const BuyButton = ({ onClick , loading}) => {
  const t = useTranslations('Checkout');
  const tAriaLabel = useTranslations('AriaLabel');
  return (
    <button
        onClick={onClick}
        disabled={loading}
        aria-busy={loading}
        aria-label={loading ? tAriaLabel("processingOrder") : tAriaLabel("buyNow")}
        className={`bg-black text-white py-3 text-center rounded-[8px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? t('loading') : t('buyButton')}
    </button>
  )
}