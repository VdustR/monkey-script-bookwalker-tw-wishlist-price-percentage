// ==UserScript==
// @name         BOOK☆WALKER 願望清單價格比例
// @namespace    https://github.com/VdustR/monkey-script-bookwalker-tw-wishlist-price-percentage
// @version      1.0.0
// @description  在 BOOK☆WALKER 台灣願望清單顯示售價占原價比例與省下百分比。
// @author       VdustR
// @license      MIT
// @match        https://www.bookwalker.com.tw/member/wishlist*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function() {
	//#region src/pricing.ts
	function parsePrice(text, label) {
		const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
		const match = text.match(new RegExp(`${escapedLabel}[：:]\\s*([\\d,]+)元`, "u"));
		if (match?.[1] === void 0) return null;
		const price = Number(match[1].replaceAll(",", ""));
		return Number.isSafeInteger(price) ? price : null;
	}
	function calculatePricePercentages(originalPrice, salePrice) {
		if (originalPrice <= 0 || salePrice < 0 || salePrice >= originalPrice) return null;
		const price = Math.round(salePrice / originalPrice * 100);
		return {
			price,
			saved: 100 - price
		};
	}
	//#endregion
	//#region src/dom.ts
	const BADGE_ATTRIBUTE = "data-bookwalker-price-percentage";
	const ORIGINAL_PRICE_SELECTOR = ".txt_del";
	function createBadge(price, saved) {
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
			"line-height:1.5"
		].join(";");
		return badge;
	}
	function addPricePercentageBadges(root = document) {
		for (const originalPriceElement of root.querySelectorAll(ORIGINAL_PRICE_SELECTOR)) {
			const priceContainer = originalPriceElement.parentElement;
			if (!priceContainer || priceContainer.querySelector(`[${BADGE_ATTRIBUTE}]`)) continue;
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
	//#endregion
	//#region src/index.ts
	let updateScheduled = false;
	function scheduleUpdate() {
		if (updateScheduled) return;
		updateScheduled = true;
		requestAnimationFrame(() => {
			updateScheduled = false;
			addPricePercentageBadges();
		});
	}
	addPricePercentageBadges();
	new MutationObserver(scheduleUpdate).observe(document.body, {
		childList: true,
		subtree: true
	});
	//#endregion
})();
