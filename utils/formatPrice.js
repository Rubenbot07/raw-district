import { useFormatter } from "next-intl";

export function useFormatPrice() {
  const format = useFormatter();

  return (value) =>
    format.number(value, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
}