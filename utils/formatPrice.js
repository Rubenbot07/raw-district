import { useFormatter } from "next-intl";

export function useFormatPrice() {
  const format = useFormatter();

  return (value) =>
    format.number(value, {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    });
}