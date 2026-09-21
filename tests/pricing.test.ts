import { describe, expect, it } from "vite-plus/test";

import { calculatePricePercentages, parsePrice } from "../src/pricing";

describe("parsePrice", () => {
  it("parses comma-separated prices with either colon style", () => {
    expect(parsePrice("原價：1,200元", "原價")).toBe(1200);
    expect(parsePrice("特價: 840元", "特價")).toBe(840);
  });

  it("rejects missing and unsafe prices", () => {
    expect(parsePrice("售價 840元", "特價")).toBeNull();
    expect(parsePrice("原價：99999999999999999999元", "原價")).toBeNull();
  });
});

describe("calculatePricePercentages", () => {
  it("returns the paid and saved percentages", () => {
    expect(calculatePricePercentages(400, 280)).toEqual({ price: 70, saved: 30 });
  });

  it.each([
    [0, 0],
    [100, -1],
    [100, 100],
    [100, 120],
  ])("rejects a non-discounted or invalid price pair", (original, sale) => {
    expect(calculatePricePercentages(original, sale)).toBeNull();
  });
});
