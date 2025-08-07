import { Cart } from '@/components/cart/cart';
import { useTranslations } from 'next-intl';

export const CartWrapper =  () => {    
  const t = useTranslations("Cart");
  return (
    <section
      role="region"
      aria-labelledby="cart-section-title"
      className="bg-white h-auto w-auto flex flex-col items-center justify-center"
    >
      {/* Título solo visible para screen readers */}
      <h2 id="cart-section-title" className="sr-only">
        {t("title")}
      </h2>

      <Cart />
    </section>
  );
}