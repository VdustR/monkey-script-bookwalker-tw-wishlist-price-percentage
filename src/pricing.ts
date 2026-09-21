export interface PricePercentages {
  readonly price: number;
  readonly saved: number;
}

export function parsePrice(text: string, label: string): number | null {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const match = text.match(new RegExp(`${escapedLabel}[：:]\\s*([\\d,]+)元`, "u"));

  if (match?.[1] === undefined) return null;

  const price = Number(match[1].replaceAll(",", ""));
  return Number.isSafeInteger(price) ? price : null;
}

export function calculatePricePercentages(
  originalPrice: number,
  salePrice: number,
): PricePercentages | null {
  if (originalPrice <= 0 || salePrice < 0 || salePrice >= originalPrice) {
    return null;
  }

  const price = Math.round((salePrice / originalPrice) * 100);
  return { price, saved: 100 - price };
}
