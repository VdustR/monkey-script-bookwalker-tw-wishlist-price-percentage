import { beforeEach, describe, expect, it } from "vite-plus/test";

import { addPricePercentageBadges } from "../src/dom";

describe("addPricePercentageBadges", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="price">
        <span class="txt_del">原價：400元</span>
        <span>特價：280元</span>
      </div>
    `;
  });

  it("adds the price information badge", () => {
    addPricePercentageBadges();

    expect(document.querySelector("[data-bookwalker-price-percentage]")?.textContent).toBe(
      "折扣：70%（省 30%）",
    );
  });

  it("does not add the badge twice", () => {
    addPricePercentageBadges();
    addPricePercentageBadges();

    expect(document.querySelectorAll("[data-bookwalker-price-percentage]")).toHaveLength(1);
  });
});
