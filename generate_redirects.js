const fs = require("fs");
const path = require("path");

const tools = [
  ["Semrush", "https://www.semrush.com/"],
  ["Ahrefs", "https://ahrefs.com/"],
  ["Surfer SEO", "https://surferseo.com/"],
  ["Frase", "https://www.frase.io/?utm_source=firstpromoter&utm_medium=affiliate&utm_campaign=affiliate_program&via=1to6s2"],
  ["Clearscope", "https://www.clearscope.io/"],
  ["MarketMuse", "https://www.marketmuse.com/"],
  ["SE Ranking", "https://seranking.com/"],
  ["LowFruits", "https://lowfruits.io/"],
  ["Google Search Console", "https://search.google.com/search-console/about"],
  ["Screaming Frog SEO Spider", "https://www.screamingfrog.co.uk/seo-spider/"],
  ["Google Trends", "https://trends.google.com/"],
  ["AlsoAsked", "https://alsoasked.com/"],
  ["AnswerThePublic", "https://answerthepublic.com/"],
  ["ChatGPT", "https://chatgpt.com/"],
  ["Claude", "https://claude.ai/"],
  ["Perplexity", "https://www.perplexity.ai/"],
  ["Profound", "https://www.tryprofound.com/"],
  ["Peec AI", "https://peec.ai/"],
  ["Rank Math Content AI", "https://rankmath.com/content-ai/"],
  ["Yoast AI", "https://yoast.com/ai/"],
  ["Link Whisper", "https://linkwhisper.com/"],
  ["Shopify Magic", "https://www.shopify.com/magic"],
  ["Jasper", "https://www.jasper.ai/"],
  ["Klaviyo AI", "https://www.klaviyo.com/ai"],
  ["Gorgias", "https://www.gorgias.com/"],
  ["Zapier AI", "https://zapier.com/ai"],
];

const outDir = path.join(__dirname, "go");

function slugifyToolName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function redirectHtml(name, url) {
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(url);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Redirect page for ${safeName}, used to measure outbound AI SEO tool clicks from AI Pilot." />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="1; url=${safeUrl}" />
    <title>Redirecting to ${safeName} | AI Pilot</title>
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <main class="article-layout section-shell">
      <article class="article-page">
        <p class="eyebrow">Tool click tracking</p>
        <h1>Redirecting to ${safeName}</h1>
        <p>AI Pilot is recording this tool click as a page view before sending you to the official website.</p>
        <p><a class="button primary" href="${safeUrl}" rel="noopener noreferrer">Continue to ${safeName}</a></p>
      </article>
    </main>
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    <script>
      window.setTimeout(function () {
        window.location.href = ${JSON.stringify(url)};
      }, 900);
    </script>
  </body>
</html>
`;
}

function indexHtml() {
  const links = tools
    .map(([name]) => {
      const slug = slugifyToolName(name);
      return `<a class="article-list-card" href="${slug}"><strong>${escapeHtml(name)}</strong><small>/go/${slug}</small></a>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Internal noindex index of AI Pilot outbound tool redirect pages." />
    <meta name="robots" content="noindex, nofollow" />
    <title>Tool Redirect Pages | AI Pilot</title>
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <main class="section-shell article-index">
      <section class="article-index-hero">
        <p class="eyebrow">Internal tracking</p>
        <h1>Tool Redirect Pages</h1>
        <p>These noindex pages let Vercel Web Analytics count outbound tool clicks on the Hobby plan.</p>
      </section>
      <section class="article-list">${links}</section>
    </main>
  </body>
</html>
`;
}

function run() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of fs.readdirSync(outDir)) {
    fs.rmSync(path.join(outDir, file), { recursive: true, force: true });
  }

  for (const [name, url] of tools) {
    fs.writeFileSync(path.join(outDir, `${slugifyToolName(name)}.html`), redirectHtml(name, url), "utf8");
  }
  fs.writeFileSync(path.join(outDir, "index.html"), indexHtml(), "utf8");

  console.log(`Generated ${tools.length} tool redirect pages.`);
}

run();
