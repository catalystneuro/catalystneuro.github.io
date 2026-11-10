// RSS 2.0 feed of the blog, written by hand so the site takes on no extra
// dependency. Served at /rss.xml and advertised from every page's <head>.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Posts carry a date with no time; publish them at noon UTC so the day reads
// the same in every time zone.
const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString();

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
  const items = posts
    .map((p) => {
      const url = new URL(`/blog/${p.id}/`, SITE.url).href;
      return [
        "    <item>",
        `      <title>${esc(p.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(p.data.date)}</pubDate>`,
        `      <description>${esc(p.data.description)}</description>`,
        ...(p.data.keywords ?? []).map((k) => `      <category>${esc(k)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} blog</title>
    <link>${SITE.url}/blog/</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Software releases, technical writing, and news from the CatalystNeuro team.</description>
    <language>en</language>
${posts.length ? `    <lastBuildDate>${rfc822(posts[0].data.date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
