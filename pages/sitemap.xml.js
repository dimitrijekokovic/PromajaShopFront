import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import blogPosts from "@/data/blogPosts";

const SITE_URL = "https://www.promajafishing.com";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toDateOnly(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10)
    : date.toISOString().slice(0, 10);
}

function parseSerbianDate(value) {
  const match = String(value || "").match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\.?$/);

  if (!match) {
    return new Date();
  }

  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function buildUrl({ loc, lastmod, changefreq = "weekly", priority = "0.7" }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>`,
    `    <lastmod>${toDateOnly(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function fetchDynamicSitemapData() {
  await mongooseConnect();

  const [products, categories] = await Promise.all([
    Product.find({})
      .select("_id updatedAt createdAt")
      .maxTimeMS(8000)
      .lean(),
    Category.find({ slug: { $exists: true, $ne: "" } })
      .select("slug")
      .maxTimeMS(8000)
      .lean(),
  ]);

  return { products, categories };
}

function timeoutSitemapData(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ products: [], categories: [] }), ms);
  });
}

export async function getServerSideProps({ res }) {
  const now = new Date();
  let products = [];
  let categories = [];

  const data = await Promise.race([
    fetchDynamicSitemapData().catch((error) => {
      console.error("Sitemap data fetch failed:", error);
      return { products: [], categories: [] };
    }),
    timeoutSitemapData(9000),
  ]);

  products = data.products;
  categories = data.categories;

  const staticUrls = [
    { loc: "/", priority: "1.0", changefreq: "daily" },
    { loc: "/products", priority: "0.9", changefreq: "daily" },
    { loc: "/blog", priority: "0.6", changefreq: "weekly" },
    { loc: "/aboutus", priority: "0.5", changefreq: "monthly" },
    { loc: "/privatnost", priority: "0.3", changefreq: "yearly" },
    { loc: "/uslovi", priority: "0.3", changefreq: "yearly" },
  ];

  const urls = [
    ...staticUrls.map((url) => buildUrl({ ...url, lastmod: now })),
    ...blogPosts.map((post) =>
      buildUrl({
        loc: `/blog/${post.id}`,
        lastmod: parseSerbianDate(post.date),
        changefreq: "monthly",
        priority: "0.65",
      })
    ),
    ...categories.map((category) =>
      buildUrl({
        loc: `/products?category=${encodeURIComponent(category.slug)}`,
        lastmod: now,
        changefreq: "weekly",
        priority: "0.75",
      })
    ),
    ...products.map((product) =>
      buildUrl({
        loc: `/product/${product._id.toString()}`,
        lastmod: product.updatedAt || product.createdAt || now,
        changefreq: "weekly",
        priority: "0.8",
      })
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
