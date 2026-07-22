/**
 * Client-side pagination for a filterable card grid.
 *
 * Every card is rendered server-side; filtering and paging only toggle
 * visibility, so the full list stays in the HTML for crawlers.
 */

export interface PagerElements {
  cards: HTMLElement[];
  grid: HTMLElement;
  pager: HTMLElement;
  pages: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  count?: HTMLElement | null;
  empty?: HTMLElement | null;
}

export interface PagerOptions extends PagerElements {
  /** Returns true when a card passes the current filters. */
  match: (card: HTMLElement) => boolean;
  /** Plural noun used in the count line, e.g. "labs". */
  noun: string;
  perPage?: number;
}

export function createPager(o: PagerOptions) {
  const perPage = o.perPage ?? 12;
  let matched: HTMLElement[] = o.cards;
  let page = 1;

  // Show at most one page number either side of the current one.
  function pageWindow(total: number): (number | "gap")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const out: (number | "gap")[] = [1];
    const from = Math.max(2, page - 1);
    const to = Math.min(total - 1, page + 1);
    if (from > 2) out.push("gap");
    for (let i = from; i <= to; i++) out.push(i);
    if (to < total - 1) out.push("gap");
    out.push(total);
    return out;
  }

  function render() {
    const total = Math.max(1, Math.ceil(matched.length / perPage));
    page = Math.min(page, total);
    const start = (page - 1) * perPage;
    const visible = new Set(matched.slice(start, start + perPage));
    o.cards.forEach((c) => { c.style.display = visible.has(c) ? "" : "none"; });

    if (o.count) {
      o.count.textContent = matched.length
        ? `Showing ${start + 1}–${start + visible.size} of ${matched.length} ${o.noun}`
        : `0 ${o.noun}`;
    }
    if (o.empty) o.empty.hidden = matched.length !== 0;

    o.pager.hidden = matched.length <= perPage;
    o.prev.disabled = page === 1;
    o.next.disabled = page === total;
    o.pages.replaceChildren(
      ...pageWindow(total).map((p) => {
        if (p === "gap") {
          const s = document.createElement("span");
          s.className = "cv-gap";
          s.textContent = "…";
          return s;
        }
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cv-page";
        b.textContent = String(p);
        b.setAttribute("aria-label", `Page ${p}`);
        if (p === page) b.setAttribute("aria-current", "page");
        b.addEventListener("click", () => goTo(p));
        return b;
      })
    );
  }

  function goTo(p: number) {
    page = p;
    render();
    o.grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /** Re-run the filter and return to page 1. Call whenever a control changes. */
  function refresh() {
    matched = o.cards.filter(o.match);
    page = 1;
    render();
  }

  o.prev.addEventListener("click", () => goTo(page - 1));
  o.next.addEventListener("click", () => goTo(page + 1));
  refresh();

  return { refresh };
}
