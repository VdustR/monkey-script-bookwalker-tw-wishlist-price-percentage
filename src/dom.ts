import { calculatePricePercentages, parsePrice } from "./pricing";

const BADGE_ATTRIBUTE = "data-bookwalker-price-percentage";
const ORIGINAL_PRICE_SELECTOR = ".txt_del";

function createBadge(price: number, saved: number): HTMLSpanElement {
  const badge = document.createElement("span");

  badge.setAttribute(BADGE_ATTRIBUTE, "");
  badge.textContent = `折扣：${price}%（省 ${saved}%）`;
  badge.style.cssText = [
    "display:inline-block",
    "margin:2px 0 4px",
    "padding:2px 7px",
    "border-radius:999px",
    "background:#e53935",
    "color:#fff",
    "font-weight:700",
    "font-size:13px",
    "line-height:1.5",
  ].join(";");

  return badge;
}

export function addPricePercentageBadges(root: ParentNode = document): void {
  for (const originalPriceElement of root.querySelectorAll<HTMLElement>(ORIGINAL_PRICE_SELECTOR)) {
    const priceContainer = originalPriceElement.parentElement;

    if (!priceContainer || priceContainer.querySelector(`[${BADGE_ATTRIBUTE}]`)) {
      continue;
    }

    const originalPrice = parsePrice(originalPriceElement.textContent, "原價");
    const salePrice = parsePrice(priceContainer.textContent, "特價");

    if (originalPrice === null || salePrice === null) continue;

    const percentages = calculatePricePercentages(originalPrice, salePrice);
    if (percentages === null) continue;

    const badge = createBadge(percentages.price, percentages.saved);
    originalPriceElement.insertAdjacentElement("afterend", badge);
    badge.insertAdjacentElement("afterend", document.createElement("br"));
  }
}
