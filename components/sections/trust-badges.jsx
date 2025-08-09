import { Lock, Truck, RefreshCcw, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Lock, Truck, RefreshCcw, Star];

export const TrustBadges = () => {
  const t = useTranslations("trustBadges");

  const items = t.raw("items"); // raw para obtener array en vez de string

  return (
    <section
      className="flex justify-center w-full p-4"
      aria-label="Customer trust and service benefits"
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full mx-auto max-w-[1700px] items-center px-4 py-8">
        {items.map((item, i) => {
          const Icon = icons[i] || Lock;
          return (
            <li key={i} className="flex flex-col gap-2 items-center text-center">
              <Icon size={40} strokeWidth={1.2} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p className="text-xs">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};