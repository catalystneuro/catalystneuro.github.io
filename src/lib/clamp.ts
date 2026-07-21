/**
 * "Show more" toggles for line-clamped card descriptions.
 *
 * The toggle is revealed only where the text actually overflows its clamp,
 * measured per card rather than guessed from a character count.
 */

export function createClampToggles(cards: HTMLElement[]) {
  const items = cards
    .map((card) => ({
      desc: card.querySelector<HTMLElement>(".pcard-desc"),
      more: card.querySelector<HTMLButtonElement>(".pcard-more"),
    }))
    .filter((x): x is { desc: HTMLElement; more: HTMLButtonElement } => !!x.desc && !!x.more);

  function measure() {
    for (const { desc, more } of items) {
      // Skip expanded cards, and cards the pager has hidden — a display:none
      // element measures zero and would wrongly look un-truncated.
      if (desc.classList.contains("is-open") || desc.offsetParent === null) continue;
      more.hidden = desc.scrollHeight <= desc.clientHeight + 1;
    }
  }

  for (const { desc, more } of items) {
    more.addEventListener("click", () => {
      const open = desc.classList.toggle("is-open");
      more.textContent = open ? "Show less" : "Show more";
    });
  }

  measure();
  // Web fonts reflow the text after first paint, and the column count changes
  // with the viewport, so re-check on both.
  document.fonts?.ready.then(measure);
  let t: number;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = window.setTimeout(measure, 150);
  });

  return { measure };
}
