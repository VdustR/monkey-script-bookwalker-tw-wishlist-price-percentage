import { addPricePercentageBadges } from "./dom";

let updateScheduled = false;

function scheduleUpdate(): void {
  if (updateScheduled) return;

  updateScheduled = true;
  requestAnimationFrame(() => {
    updateScheduled = false;
    addPricePercentageBadges();
  });
}

addPricePercentageBadges();

const observer = new MutationObserver(scheduleUpdate);
observer.observe(document.body, { childList: true, subtree: true });
