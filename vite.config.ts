import { defineConfig } from "vite-plus";

const metadata = `// ==UserScript==
// @name         BOOK☆WALKER 願望清單價格比例
// @namespace    https://github.com/VdustR/monkey-script-bookwalker-tw-wishlist-price-percentage
// @version      1.0.0
// @description  在 BOOK☆WALKER 台灣願望清單顯示售價占原價比例與省下百分比。
// @author       VdustR
// @license      MIT
// @match        https://www.bookwalker.com.tw/member/wishlist*
// @grant        none
// @run-at       document-idle
// ==/UserScript==`;

export default defineConfig({
  fmt: {
    ignorePatterns: ["dist/**"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  pack: {
    entry: ["src/index.ts"],
    format: "iife",
    clean: true,
    outputOptions: {
      banner: metadata,
      entryFileNames: "bookwalker-wishlist-price-percentage.user.js",
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
  },
});
