import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-DNXF0cKP.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function stripHtml(s) {
  return s.replace(/<figure[\s\S]*?<\/figure>/gi, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function pick(tag, xml) {
  const m = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return (m?.[1] ?? m?.[2] ?? "").trim();
}
const fetchMediumPosts_createServerFn_handler = createServerRpc({
  id: "34581e7e177d3f3142ba418c3b64fb2f7e0b9afc1f9dc26fdf5feb86d8e6b422",
  name: "fetchMediumPosts",
  filename: "src/lib/medium.functions.ts"
}, (opts) => fetchMediumPosts.__executeServer(opts));
const fetchMediumPosts = createServerFn({
  method: "GET"
}).handler(fetchMediumPosts_createServerFn_handler, async () => {
  const url = "https://medium.com/feed/@milansoni96946";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MilanSoniSite/1.0)"
      }
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split("<item>").slice(1).map((chunk) => {
      const item = "<item>" + chunk.split("</item>")[0] + "</item>";
      const title = pick("title", item);
      const link = pick("link", item);
      const pubDate = pick("pubDate", item);
      const descRaw = pick("content:encoded", item) || pick("description", item);
      const description = stripHtml(descRaw).slice(0, 220);
      const cats = Array.from(item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)).map((m) => m[1]);
      return {
        title,
        link,
        pubDate,
        description,
        categories: cats
      };
    });
    return items.slice(0, 9);
  } catch {
    return [];
  }
});
export {
  fetchMediumPosts_createServerFn_handler
};
