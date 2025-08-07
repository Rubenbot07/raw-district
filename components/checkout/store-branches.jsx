import { useTranslations } from "next-intl";
export const StoreBranches = () => {
  const t = useTranslations("StoreBranches");
  const tCommon = useTranslations("Common");
  return (
    <section className="flex flex-col gap-3" aria-labelledby="branches-heading">
      <h2 id="branches-heading" className="text-lg font-semibold">{t("title")}</h2>
      <p className="text-gray-500 font-light">{t("subtitle")}</p>

      <div
        className="flex justify-between border border-black rounded-[8px] p-4"
        role="group"
        aria-labelledby="store-1-heading"
      >
        <div>
          <h3 id="store-1-heading" className="font-semibold text-sm">
            Melonn Dosquebradas
          </h3>

          <address className="not-italic text-xs text-gray-500 mb-1">
            Calle 18a #69f-16, INDUSTRIAL ZONE, Dosquebradas
          </address>

          <p className="text-xs text-gray-500">
            <span className="sr-only">Phone:</span>
            +57 300 6870774
          </p>

          <p className="text-xs text-gray-500">
            {t("usuallyReady")}
          </p>
        </div>

        <div className="self-start">
          <span className="text-sm font-medium">{tCommon("free")}</span>
        </div>
      </div>
    </section>
  );
};