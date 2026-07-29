const SITE_URL = "https://www.promajafishing.com";

export async function getServerSideProps({ res }) {
  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /account",
    "Disallow: /cart",
    "Disallow: /login",
    "Disallow: /register",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL.replace("https://", "")}`,
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(robots);
  res.end();

  return { props: {} };
}

export default function RobotsTxt() {
  return null;
}
