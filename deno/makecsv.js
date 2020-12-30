import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import cheerio from "https://code4sabae.github.io/js/cheerio.js";

const s = await Deno.readTextFile("ref.txt");
let bks = null;
const list = [];
for (const ss of s.split("\n")) {
  bks = ss;
  const url = ss;
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    continue;
  }
  if (url.endsWith(".pdf")) {
    list.push({ url, title: bks });
  } else {
    const html = await (await fetch(url)).text();
    const dom = cheerio.load(html);
    const title = dom("title").text();
    console.log(url, title);
    list.push({ url, title });
  }
}
await Deno.writeTextFile("../reference.csv", CSV.encode(CSV.fromJSON(list)));

