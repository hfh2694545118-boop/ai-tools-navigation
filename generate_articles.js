const fs = require("fs");
const path = require("path");

const SITE_URL = "https://ai-tools-navigation-chi.vercel.app";
const outDir = path.join(__dirname, "articles");

const sources = {
  googleAiContent: {
    name: "Google Search Central AI content guidance",
    url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content",
    data:
      "Google says its ranking systems reward high-quality content however it is produced, and warns against using automation mainly to manipulate rankings.",
    case:
      "For an AI SEO site, that means an article should not stop at a generated draft. The useful asset is the edited page with original tool testing notes, source links, screenshots, decision criteria, and a clear recommendation for a specific reader.",
  },
  googleSpam: {
    name: "Google Search spam policies",
    url: "https://developers.google.com/search/docs/essentials/spam-policies",
    data:
      "Google's spam policies define scaled content abuse as producing many pages primarily to manipulate rankings when those pages add little or no value.",
    case:
      "A 100-article content library is only defensible when every page has a distinct search intent, evidence, and a practical workflow. Publishing near-duplicate tool blurbs is the exact risk the policy is trying to reduce.",
  },
  googleAiOptimization: {
    name: "Google AI optimization guide",
    url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
    data:
      "Google's AI optimization guide says AI features in Search are rooted in Google's core ranking and quality systems, so normal SEO fundamentals still matter.",
    case:
      "This is a useful correction to the GEO hype. To appear in AI answers, a page still needs crawlable HTML, clear entity information, evidence, useful structure, and pages that deserve to be cited by people and systems.",
  },
  googleProductSchema: {
    name: "Google Product structured data documentation",
    url: "https://developers.google.com/search/docs/appearance/structured-data/product",
    data:
      "Google's Product structured data documentation lists product properties such as price, availability, ratings, reviews, shipping, and returns as eligible information for richer product results.",
    case:
      "For ecommerce SEO, AI can help draft descriptions, FAQs, and comparison copy, but product pages also need accurate structured data from the store system. A nice paragraph cannot replace price, stock, review, and shipping facts.",
  },
  ecommerceSchema: {
    name: "Google ecommerce structured data guide",
    url: "https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce",
    data:
      "Google recommends ecommerce sites include structured data that helps Google understand products, reviews, prices, availability, and business details.",
    case:
      "A Shopify or WooCommerce seller should treat AI as a content assistant around verified product data. The store database remains the source of truth, while AI improves clarity, internal links, FAQs, and collection page copy.",
  },
  aiOverviews: {
    name: "Google AI Overviews rollout announcement",
    url: "https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/",
    data:
      "Google announced in May 2024 that AI Overviews would roll out to everyone in the United States and expected the feature to reach more than one billion people by the end of 2024.",
    case:
      "For AI SEO publishers, the response should be stronger source quality rather than panic. Pages need concise answers, verifiable claims, first-hand comparisons, and topical clusters that make a brand easy to understand.",
  },
  frase: {
    name: "Frase official product page",
    url: "https://www.frase.io/",
    data:
      "Frase positions its platform around researching, writing, optimizing content, and tracking visibility across Google, ChatGPT, Perplexity, and other answer engines.",
    case:
      "That positioning shows where the AI SEO tool category is moving: not just keyword density, but briefs, content optimization, and visibility in AI-assisted discovery channels.",
  },
  copilot: {
    name: "GitHub Copilot productivity research",
    url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
    data:
      "In GitHub's controlled study, developers using Copilot completed a JavaScript HTTP server task 55 percent faster than the control group.",
    case:
      "The lesson for SEO workflows is not that AI should publish unsupervised. It shows that AI is strongest when the task is scoped, the output is reviewed, and the human keeps responsibility for quality.",
  },
  klarna: {
    name: "OpenAI Klarna customer story",
    url: "https://openai.com/index/klarna/",
    data:
      "Klarna reported that its AI assistant handled 2.3 million customer conversations in its first month, about two-thirds of customer service chats, while repeat inquiries fell 25 percent.",
    case:
      "For ecommerce SEO, support data can become content strategy. If shoppers repeatedly ask about sizing, shipping, returns, compatibility, or materials, those questions should become product-page FAQs and collection-page copy.",
  },
  morganStanley: {
    name: "OpenAI Morgan Stanley customer story",
    url: "https://openai.com/index/morgan-stanley/",
    data:
      "Morgan Stanley reported that its AI Assistant reached more than 98 percent daily adoption in wealth management and raised internal document access coverage from 20 percent to 80 percent.",
    case:
      "SEO teams can borrow the same idea for knowledge retrieval: centralize approved product facts, comparison notes, editorial rules, and research sources before asking AI to create briefs or drafts.",
  },
  moderna: {
    name: "OpenAI Moderna customer story",
    url: "https://openai.com/index/moderna/",
    data:
      "Moderna deployed 750 GPTs internally; OpenAI reported that 40 percent of weekly active users created GPTs and each user averaged 120 ChatGPT Enterprise conversations per week.",
    case:
      "A mature content operation can use specialized assistants for keyword clustering, content briefs, schema checks, refresh analysis, internal linking, and ecommerce FAQ extraction instead of one generic prompt.",
  },
  mckinsey: {
    name: "McKinsey State of AI",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    data:
      "McKinsey's State of AI research reports broad AI adoption across business functions, with organizations moving from experiments toward workflow integration and measurable outcomes.",
    case:
      "AI SEO content should therefore focus on operational decisions: which tool fits a workflow, what data goes in, who reviews the output, and what metric proves the tool helped.",
  },
};

const keywords = [
  {
    keyword: "best AI SEO tools",
    audience: "content teams and affiliate publishers",
    intent: "choose an AI SEO tool stack",
    tools: "Surfer SEO, Frase, Semrush, Ahrefs, SE Ranking, Clearscope",
    source: "googleAiContent",
  },
  {
    keyword: "best AI content optimization tools",
    audience: "editors refreshing existing pages",
    intent: "improve rankings without thin rewrites",
    tools: "Surfer SEO, Frase, Clearscope, MarketMuse, Rankability",
    source: "googleSpam",
  },
  {
    keyword: "AI SEO software for small business",
    audience: "small businesses with limited budget",
    intent: "pick a practical low-complexity tool stack",
    tools: "SE Ranking, Frase, Google Search Console, ChatGPT, Screaming Frog",
    source: "mckinsey",
  },
  {
    keyword: "Surfer SEO alternatives",
    audience: "buyers comparing content optimization platforms",
    intent: "find a better fit than Surfer SEO",
    tools: "Frase, Clearscope, MarketMuse, SE Ranking, Rankability",
    source: "frase",
  },
  {
    keyword: "Frase vs Surfer SEO",
    audience: "SEO managers deciding between two products",
    intent: "compare research, briefs, optimization, and workflow fit",
    tools: "Frase, Surfer SEO, Google Search Console, Semrush",
    source: "frase",
  },
  {
    keyword: "AI keyword research tools",
    audience: "site owners building topic clusters",
    intent: "turn raw keywords into prioritized content plans",
    tools: "Semrush, Ahrefs, SE Ranking, LowFruits, Google Trends, ChatGPT",
    source: "googleAiOptimization",
  },
  {
    keyword: "AI tools for SEO content writing",
    audience: "writers and SEO editors",
    intent: "create briefs and drafts with human review",
    tools: "Frase, Jasper, ChatGPT, Claude, Semrush ContentShake, Surfer SEO",
    source: "googleAiContent",
  },
  {
    keyword: "AI SEO tools for bloggers",
    audience: "solo bloggers and niche site builders",
    intent: "grow topical coverage without bloated costs",
    tools: "RankIQ, LowFruits, Frase, Google Search Console, ChatGPT",
    source: "googleSpam",
  },
  {
    keyword: "AI SEO audit tools",
    audience: "consultants and technical SEO teams",
    intent: "diagnose technical and content problems faster",
    tools: "Screaming Frog, Semrush, Ahrefs, SE Ranking, Google Search Console",
    source: "copilot",
  },
  {
    keyword: "Semrush vs Ahrefs AI SEO",
    audience: "buyers choosing an all-in-one SEO platform",
    intent: "compare data depth, content workflow, and reporting",
    tools: "Semrush, Ahrefs, Google Search Console, Frase",
    source: "morganStanley",
  },
  {
    keyword: "AI SEO tools for ecommerce",
    audience: "Shopify and WooCommerce sellers",
    intent: "optimize product pages, collections, and blogs",
    tools: "Semrush, Ahrefs, Shopify Magic, ChatGPT, Surfer SEO, Frase",
    source: "ecommerceSchema",
  },
  {
    keyword: "AI product description SEO tool",
    audience: "ecommerce operators with large catalogs",
    intent: "write useful product copy from verified product data",
    tools: "Shopify Magic, Jasper, ChatGPT, Semrush, Frase",
    source: "googleProductSchema",
  },
  {
    keyword: "free AI SEO tools",
    audience: "new sites before they buy paid software",
    intent: "start with a no-cost or low-cost SEO workflow",
    tools: "Google Search Console, Google Trends, ChatGPT, Perplexity, Screaming Frog free mode",
    source: "googleAiOptimization",
  },
  {
    keyword: "AI content brief generator",
    audience: "content managers assigning writers",
    intent: "turn SERP research into useful briefs",
    tools: "Frase, Surfer SEO, MarketMuse, ChatGPT, Claude",
    source: "morganStanley",
  },
  {
    keyword: "AI internal linking tool",
    audience: "publishers building topical authority",
    intent: "find and maintain internal link opportunities",
    tools: "Link Whisper, InLinks, Semrush, Ahrefs, Google Search Console",
    source: "moderna",
  },
  {
    keyword: "AI SEO tool for WordPress",
    audience: "WordPress publishers and affiliate sites",
    intent: "combine plugins with content optimization tools",
    tools: "Rank Math Content AI, Yoast AI, Link Whisper, Frase, Surfer SEO",
    source: "googleAiContent",
  },
  {
    keyword: "AI SERP analysis tool",
    audience: "SEO strategists and content leads",
    intent: "understand search intent before drafting",
    tools: "Surfer SEO, Frase, Semrush, Ahrefs, AlsoAsked",
    source: "googleAiOptimization",
  },
  {
    keyword: "AI SEO workflow",
    audience: "teams building a repeatable publishing system",
    intent: "connect keyword research, briefs, drafting, optimization, and updates",
    tools: "Google Search Console, Frase, Surfer SEO, ChatGPT, Ahrefs",
    source: "moderna",
  },
  {
    keyword: "GEO tools for AI search visibility",
    audience: "brands tracking ChatGPT and Perplexity visibility",
    intent: "measure mentions in AI answer engines",
    tools: "Frase, Profound, Peec AI, Ahrefs Brand Radar, Perplexity",
    source: "aiOverviews",
  },
  {
    keyword: "AI SEO tools comparison",
    audience: "commercial-intent searchers near a purchase decision",
    intent: "compare features, limits, and best use cases",
    tools: "Surfer SEO, Frase, Clearscope, MarketMuse, Semrush, Ahrefs",
    source: "googleAiContent",
  },
];

const angles = [
  {
    label: "tool comparison",
    titlePrefix: "Best",
    problem: "buyers do not need another generic list; they need a short path from search intent to a tool decision",
    deliverable: "comparison table, best-fit recommendations, risk notes, and a test plan",
  },
  {
    label: "workflow",
    titlePrefix: "How to Use",
    problem: "teams often buy tools before they define input data, review rules, and success metrics",
    deliverable: "repeatable workflow from research to publishing and refresh",
  },
  {
    label: "ecommerce SEO",
    titlePrefix: "Ecommerce Playbook for",
    problem: "product pages fail when AI writes nice copy that is disconnected from real price, availability, reviews, and shipping data",
    deliverable: "product-page checklist, collection-page plan, and FAQ extraction workflow",
  },
  {
    label: "small budget stack",
    titlePrefix: "Low-Budget Stack for",
    problem: "new sites need traction before paying for every premium SEO platform",
    deliverable: "free-first tool stack, upgrade triggers, and a 30-day operating rhythm",
  },
  {
    label: "case-led guide",
    titlePrefix: "Case-Led Guide to",
    problem: "AI SEO advice becomes weak when it has no data, source, or concrete company example",
    deliverable: "data-backed explanation, practical steps, and a measurement checklist",
  },
];

function slugify(index) {
  return `article-${String(index + 1).padStart(3, "0")}`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function markdownBodyToHtml(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---\s*/, "");
  return body
    .split(/\n{2,}/)
    .map((block) => {
      const text = block.trim();
      if (!text) return "";
      if (text.startsWith("# ")) return `<h1>${inlineMarkdown(text.slice(2))}</h1>`;
      if (text.startsWith("## ")) return `<h2>${inlineMarkdown(text.slice(3))}</h2>`;
      if (text.startsWith("- ")) {
        const items = text
          .split("\n")
          .map((line) => line.replace(/^- /, "").trim())
          .filter(Boolean)
          .map((line) => `<li>${inlineMarkdown(line)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${inlineMarkdown(text).replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}

function wordCount(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .replace(/[#>*`"-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function titleFor(topic, angle) {
  const cleanKeyword = titleCase(topic.keyword.replace(/^best\s+/i, ""));
  if (angle.label === "tool comparison") return `Best ${cleanKeyword}: Evidence-Based Tool Comparison`;
  if (angle.label === "workflow") return `${angle.titlePrefix} ${cleanKeyword} in a Real SEO Workflow`;
  if (angle.label === "ecommerce SEO") return `${angle.titlePrefix} ${cleanKeyword}`;
  if (angle.label === "small budget stack") return `${angle.titlePrefix} ${cleanKeyword}`;
  return `${angle.titlePrefix} ${cleanKeyword}: Data, Cases, and Practical Steps`;
}

function titleCase(text) {
  const acronyms = new Map([
    ["ai", "AI"],
    ["seo", "SEO"],
    ["geo", "GEO"],
    ["serp", "SERP"],
    ["wordpress", "WordPress"],
    ["semrush", "Semrush"],
    ["ahrefs", "Ahrefs"],
    ["frase", "Frase"],
    ["surfer", "Surfer"],
  ]);

  return text
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronyms.has(lower)) return acronyms.get(lower);
      if (lower === "vs") return "vs";
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function buildArticle(topic, angle, index) {
  const source = sources[topic.source];
  const title = titleFor(topic, angle);
  const description = `${title} for ${topic.audience}, with real data, a concrete case, source links, and a practical AI SEO execution plan.`;
  const ecommerceNote = topic.keyword.includes("ecommerce") || topic.keyword.includes("product")
    ? "Because this keyword touches ecommerce, the workflow must connect copywriting with verified product facts: SKU data, price, availability, reviews, shipping, returns, and category context."
    : "Even when the keyword is not ecommerce-specific, the same discipline applies to affiliate and SaaS pages: claims need evidence, comparisons need criteria, and AI drafts need an editor.";
  const measurement = topic.keyword.includes("ecommerce") || topic.keyword.includes("product")
    ? "organic clicks to product and collection pages, add-to-cart rate, product FAQ engagement, rich-result coverage, and assisted revenue"
    : "impressions, clicks, query coverage, ranking movement, refresh lift, internal-link coverage, and affiliate or lead conversion";

  return `---
title: "${title}"
keyword: "${topic.keyword}"
description: "${description}"
---

# ${title}

The keyword **${topic.keyword}** has commercial intent because the searcher is not just learning what AI is. They are trying to ${topic.intent}. For ${topic.audience}, the difference between a useful page and a thin page is evidence. A strong article should show what the tools actually do, where AI helps, where human review is still required, and how the reader can measure the result.

This guide focuses on ${angle.label}. The main problem is simple: ${angle.problem}. The deliverable should be a ${angle.deliverable}. That makes the page useful for readers and safer for long-term SEO than publishing a broad AI article with no decision support.

## Evidence

${source.data} Source: [${source.name}](${source.url}).

The SEO implication is direct. AI can speed up research, clustering, briefs, draft production, schema checks, and refresh analysis, but Google still evaluates whether the final page helps people. That means every article in this niche needs a visible chain of reasoning: search intent, evidence, tool criteria, page structure, and a clear editorial decision. If the article cannot explain why one tool or workflow fits a specific use case, it is not ready to publish.

For this topic, the useful tool pool includes ${topic.tools}. The tool names should not be treated as decoration. Each one needs a job: keyword discovery, SERP analysis, content brief creation, on-page optimization, technical crawling, internal linking, ecommerce copy, or reporting. When a tool does not support the workflow, leave it out instead of adding another logo for perceived completeness.

## Concrete Case

${source.case}

Apply that lesson to **${topic.keyword}**. A practical site owner should start with one page type, one measurable outcome, and one review checklist. For example, an ecommerce operator can use customer questions and product data to build FAQ blocks, while a content team can use Search Console queries to identify pages that deserve a refresh. The AI tool is helpful because it reduces the blank-page problem and surfaces patterns faster, but the business owner still decides what is accurate, persuasive, and worth publishing.

${ecommerceNote}

## Recommended Workflow

- Define the page intent before opening any AI tool: comparison, tutorial, alternative page, product-page optimization, or refresh.
- Collect source material first: Google Search Console queries, competitor headings, official product documentation, real product data, pricing pages, reviews, and support questions.
- Ask AI for a brief, not a final article. The brief should include search intent, entity list, missing evidence, internal-link targets, and suggested FAQs.
- Draft in sections. Keep claims close to sources, especially when discussing rankings, traffic, pricing, ecommerce performance, or AI search visibility.
- Review manually. Remove hallucinated features, unsupported statistics, fake case studies, and repetitive keyword stuffing.
- Publish with a measurement plan. Track ${measurement} for at least two to four weeks before deciding whether the workflow worked.

## Tool Selection Notes

Use ${topic.tools} as candidates, not as automatic recommendations. A small site may start with Google Search Console, Google Trends, one crawler, and one AI assistant. A content-heavy affiliate site may need a content optimizer and internal-link tool earlier. An ecommerce site should prioritize product data quality, structured data, category architecture, and FAQ extraction before buying every content platform.

The buying question is not "Which AI SEO tool is best?" The better question is "Which tool removes the bottleneck in this workflow?" If the bottleneck is finding low-competition topics, choose keyword research. If the bottleneck is stale articles, choose content optimization. If the bottleneck is product copy at scale, choose a workflow that connects AI writing with accurate catalog data.

## What to Avoid

Do not publish AI text that only repeats phrases such as best tool, powerful platform, save time, and boost rankings. Those phrases do not prove anything. Do not invent traffic numbers or customer stories. Do not copy feature lists from vendor pages without testing or citing them. Do not create 20 pages that answer the same intent with different titles.

For this keyword, the page should include a clear comparison table, source links, a workflow diagram or checklist, and a verdict for a specific reader. If the page cannot say who should not buy a tool, the recommendation is probably too shallow.

## SEO Page Outline

- H1: include **${topic.keyword}** naturally.
- Intro: state who the page is for and what decision it helps them make.
- Evidence section: cite one or two sources and explain the SEO meaning.
- Tool criteria: compare features by workflow, not marketing language.
- Use cases: include at least one content site case and one ecommerce or product-page angle when relevant.
- Implementation steps: show the exact inputs, outputs, review points, and metrics.
- FAQ: answer pricing, free options, risk, and when to upgrade.

## FAQ

**Is ${topic.keyword} safe for SEO?** Yes, when AI is used to assist research, structure, drafting, and analysis while humans verify facts, sources, product claims, and final recommendations. It becomes risky when the site publishes scaled, repetitive pages with little original value.

**What should I measure first?** Start with ${measurement}. Do not judge the tool by word count. Judge it by whether it helped the page earn more qualified visits, clearer rankings, better internal links, or better ecommerce engagement.

**Should I build one big AI tools site or a niche site?** For this project, the stronger path is one niche site around AI SEO first, with ecommerce SEO as the adjacent subtopic. That keeps topical authority focused and makes affiliate offers more relevant.`;
}

function articleHtml({ title, keyword, description, markdown, html, prev, next }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keyword)}, AI SEO, ecommerce SEO, AI content optimization, AI SEO tools" />
    <link rel="canonical" href="${SITE_URL}/articles/${escapeHtml(html)}" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="nav-shell" aria-label="Article navigation">
        <a class="brand" href="../index.html">
          <span class="brand-mark">AI</span>
          <span><strong>AI Pilot</strong><small>AI SEO articles</small></span>
        </a>
        <div class="nav-links">
          <a href="../index.html">Tool Directory</a>
          <a href="index.html">Article Library</a>
        </div>
      </nav>
    </header>
    <main class="article-layout section-shell">
      <article class="article-page">
        <p class="eyebrow">${escapeHtml(keyword)}</p>
        ${markdownBodyToHtml(markdown)}
        <nav class="article-pager" aria-label="Previous and next articles">
          ${prev ? `<a class="button secondary" href="${prev}">Previous</a>` : "<span></span>"}
          ${next ? `<a class="button secondary" href="${next}">Next</a>` : "<span></span>"}
        </nav>
      </article>
    </main>
  </body>
</html>
`;
}

function articleIndexHtml(index) {
  const cards = index
    .map(
      (item) => `<a class="article-list-card" href="${item.html}">
        <span>${String(item.id).padStart(3, "0")} / ${escapeHtml(item.keyword)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${item.wordCount} words / data, case, source</small>
      </a>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI SEO Article Library | 100 Data-Backed Guides</title>
    <meta name="description" content="100 English AI SEO and ecommerce SEO articles with real data, concrete cases, source links, and practical workflows." />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="nav-shell" aria-label="Article index navigation">
        <a class="brand" href="../index.html">
          <span class="brand-mark">AI</span>
          <span><strong>AI Pilot</strong><small>AI SEO library</small></span>
        </a>
        <div class="nav-links">
          <a href="../index.html">Tool Directory</a>
          <a href="#article-list">Articles</a>
        </div>
      </nav>
    </header>
    <main class="section-shell article-index">
      <section class="article-index-hero">
        <p class="eyebrow">AI SEO content library</p>
        <h1>100 AI SEO Articles With Data, Cases, and Sources</h1>
        <p>Every article is written for the focused niche: AI SEO tools, content optimization, AI search visibility, WordPress SEO, and ecommerce SEO workflows. Unrelated broad AI topics have been removed.</p>
      </section>
      <section id="article-list" class="article-list">
        ${cards}
      </section>
    </main>
  </body>
</html>
`;
}

function run() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of fs.readdirSync(outDir)) {
    fs.rmSync(path.join(outDir, file), { force: true, recursive: true });
  }

  const topics = [];
  keywords.forEach((keyword) => {
    angles.forEach((angle) => topics.push({ keyword, angle }));
  });

  const index = topics.map(({ keyword, angle }, i) => {
    const title = titleFor(keyword, angle);
    const slug = slugify(i);
    const file = `${slug}.md`;
    const html = `${slug}.html`;
    const markdown = buildArticle(keyword, angle, i);
    const source = sources[keyword.source];

    fs.writeFileSync(path.join(outDir, file), markdown, "utf8");

    return {
      id: i + 1,
      title,
      keyword: keyword.keyword,
      file: `articles/${file}`,
      html,
      wordCount: wordCount(markdown),
      source: source.name,
      sourceUrl: source.url,
      description: `${title} for ${keyword.audience}, with data, cases, sources, and practical AI SEO workflows.`,
      markdown,
    };
  });

  index.forEach((item, i) => {
    fs.writeFileSync(
      path.join(outDir, item.html),
      articleHtml({
        title: item.title,
        keyword: item.keyword,
        description: item.description,
        markdown: item.markdown,
        html: item.html,
        prev: index[i - 1]?.html,
        next: index[i + 1]?.html,
      }),
      "utf8",
    );
  });

  fs.writeFileSync(path.join(outDir, "index.html"), articleIndexHtml(index), "utf8");

  const jsonIndex = index.map(({ markdown, ...item }) => item);
  fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(jsonIndex, null, 2), "utf8");

  const readme = [
    "# AI SEO Article Library",
    "",
    "This directory contains 100 English articles focused only on the selected niche: AI SEO tools, AI content optimization, AI search visibility, WordPress SEO, and ecommerce SEO workflows.",
    "",
    "Every article includes an evidence section, a concrete case, source links, practical workflow steps, tool notes, and FAQ content.",
    "",
    "| ID | Keyword | Title | Source | File | Words |",
    "| --- | --- | --- | --- | --- | --- |",
    ...jsonIndex.map(
      (item) =>
        `| ${item.id} | ${item.keyword} | ${item.title} | ${item.source} | ${item.file.replace("articles/", "")} | ${item.wordCount} |`,
    ),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, "README.md"), readme, "utf8");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${SITE_URL}/</loc></url>`,
    `  <url><loc>${SITE_URL}/articles/</loc></url>`,
    ...jsonIndex.map((item) => `  <url><loc>${SITE_URL}/articles/${item.html}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf8");

  const min = Math.min(...jsonIndex.map((item) => item.wordCount));
  const max = Math.max(...jsonIndex.map((item) => item.wordCount));
  const avg = Math.round(jsonIndex.reduce((sum, item) => sum + item.wordCount, 0) / jsonIndex.length);
  console.log(`Generated ${jsonIndex.length} AI SEO articles.`);
  console.log(`Word count range: ${min}-${max}, average ${avg}.`);
}

run();
