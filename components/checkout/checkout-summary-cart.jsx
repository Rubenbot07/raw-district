import { useFormatPrice } from "@/utils/formatPrice";
import { useTranslations } from "next-intl";

export const CheckoutSummaryCart = ({ cartItems, children }) => {
  const formatPrice = useFormatPrice();
  const t = useTranslations("Checkout");
  const tCommon = useTranslations("Common");
  const tProductInfo = useTranslations("ProductInfo");

  return (
    <section
      className="flex flex-col gap-4 px-2"
      aria-labelledby="checkout-cart-title"
    >
      <h2 id="checkout-cart-title" className="sr-only">
        {t("itemsInYourCart")}
      </h2>

      <div
        className="flex flex-col gap-4 max-h-96 overflow-y-scroll p-4"
        role="list"
      >
        {cartItems?.map((item) => {
          const size = item.products.product_sizes.find(
            (size) => size.id === item.product_size_id
          )?.size;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center"
              role="listitem"
              aria-label={`${item.products.name}, size ${size}, quantity ${item.quantity}, total ${formatPrice(item.products.price * item.quantity)}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 min-w-14 relative">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={item.products.product_images[0].thumbnail_url}
                    alt={`Image of ${item.products.name}`}
                  />
                  <div>
                    <span
                      className="text-xs absolute top-[-6px] right-[-6px] bg-gray-800 opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.quantity}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">{tProductInfo(`${item.products.i18n_key}.name`)}</p>
                  <p className="text-xs text-gray-500">{tCommon("size")}: {size}</p>
                  <p className="sr-only">Quantity: {item.quantity}</p>
                </div>
              </div>

              <span className="text-sm" aria-hidden="true">
                ${formatPrice(item.products.price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <hr />
      {children}
    </section>
  );
};