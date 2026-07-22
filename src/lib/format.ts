export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2021-09-01" or "2021-09" -> "September 2021" */
export function monthYear(date?: string): string {
  if (!date) return "";
  const [y, m] = date.split("-");
  const mi = parseInt(m ?? "1", 10) - 1;
  return `${MONTHS[mi] ?? ""} ${y}`.trim();
}

/** "2025-12-19" -> "December 19, 2025" */
export function longDate(date?: string): string {
  if (!date) return "";
  const [y, m, d] = date.split("-");
  const mi = parseInt(m ?? "1", 10) - 1;
  return d ? `${MONTHS[mi]} ${parseInt(d, 10)}, ${y}` : `${MONTHS[mi]} ${y}`;
}

export const asArray = <T>(v: T | T[] | undefined): T[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

/** Extract the trailing repo name from a GitHub URL for use as a button label. */
export const repoName = (url: string) => url.replace(/\/$/, "").split("/").slice(-1)[0] ?? url;

/** Normalize dandi frontmatter (string | {url,name}[]) into a list. */
export function dandiList(d: string | { url: string; name?: string }[] | undefined) {
  if (!d) return [] as { url: string; name: string }[];
  if (typeof d === "string") {
    const id = d.split("/").pop() ?? "";
    return [{ url: d, name: id ? `Dandiset ${id}` : "DANDI" }];
  }
  return d.map((x) => ({ url: x.url, name: x.name ?? (x.url.split("/").pop() ?? "DANDI") }));
}

export const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s === "active") return "green";
  if (s === "completed") return "gray";
  if (s === "pending") return "amber";
  return "blue";
};
