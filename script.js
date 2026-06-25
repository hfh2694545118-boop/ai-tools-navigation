const categories = [
  { id: "all", name: "All" },
  { id: "content", name: "Content Optimization" },
  { id: "keyword", name: "Keyword Research" },
  { id: "technical", name: "Technical SEO" },
  { id: "ecommerce", name: "Ecommerce SEO" },
  { id: "wordpress", name: "WordPress SEO" },
  { id: "ai-search", name: "AI Search Visibility" },
  { id: "automation", name: "Workflow Automation" },
];

const tools = [
  {
    name: "Semrush",
    category: "keyword",
    desc: "All-in-one SEO platform for keyword research, competitor analysis, site audits, content planning, and rank tracking.",
    url: "https://www.semrush.com/",
    tags: ["keywords", "rank tracking", "audits"],
    featured: true,
    free: true,
  },
  {
    name: "Ahrefs",
    category: "keyword",
    desc: "SEO platform known for backlink data, keyword research, competitor analysis, site audits, and content opportunities.",
    url: "https://ahrefs.com/",
    tags: ["backlinks", "keywords", "competitors"],
    featured: true,
    free: true,
  },
  {
    name: "Surfer SEO",
    category: "content",
    desc: "Content optimization platform for SERP analysis, content scoring, briefs, outlines, and on-page recommendations.",
    url: "https://surferseo.com/",
    tags: ["content score", "SERP", "briefs"],
    featured: true,
    free: false,
  },
  {
    name: "Frase",
    category: "content",
    desc: "AI SEO platform for research, briefs, content optimization, and visibility tracking across search and answer engines.",
    url: "https://www.frase.io/?utm_source=firstpromoter&utm_medium=affiliate&utm_campaign=affiliate_program&via=1to6s2",
    tags: ["briefs", "optimization", "AI search"],
    featured: true,
    free: true,
  },
  {
    name: "Clearscope",
    category: "content",
    desc: "Content optimization tool for improving topical coverage, writer briefs, and editor review workflows.",
    url: "https://www.clearscope.io/",
    tags: ["topical coverage", "editing", "briefs"],
    featured: true,
    free: false,
  },
  {
    name: "MarketMuse",
    category: "content",
    desc: "Content planning and optimization platform for topic modeling, inventory analysis, and authority building.",
    url: "https://www.marketmuse.com/",
    tags: ["topic modeling", "planning", "authority"],
    featured: false,
    free: true,
  },
  {
    name: "SE Ranking",
    category: "keyword",
    desc: "SEO software for keyword research, rank tracking, competitor research, audits, and content marketing workflows.",
    url: "https://seranking.com/",
    tags: ["rank tracking", "audits", "competitors"],
    featured: true,
    free: true,
  },
  {
    name: "LowFruits",
    category: "keyword",
    desc: "Keyword research tool for finding low-competition opportunities and weak spots in search results.",
    url: "https://lowfruits.io/",
    tags: ["low competition", "niche sites", "keywords"],
    featured: false,
    free: true,
  },
  {
    name: "Google Search Console",
    category: "technical",
    desc: "Free Google tool for measuring search performance, indexing status, query data, and technical search issues.",
    url: "https://search.google.com/search-console/about",
    tags: ["free", "queries", "indexing"],
    featured: true,
    free: true,
  },
  {
    name: "Screaming Frog SEO Spider",
    category: "technical",
    desc: "Desktop crawler for auditing URLs, metadata, canonicals, status codes, internal links, and structured data.",
    url: "https://www.screamingfrog.co.uk/seo-spider/",
    tags: ["crawler", "technical audit", "internal links"],
    featured: true,
    free: true,
  },
  {
    name: "Google Trends",
    category: "keyword",
    desc: "Free tool for checking search interest, seasonality, market direction, and topic comparisons.",
    url: "https://trends.google.com/",
    tags: ["free", "trends", "seasonality"],
    featured: false,
    free: true,
  },
  {
    name: "AlsoAsked",
    category: "keyword",
    desc: "Question research tool for mapping People Also Ask data into content briefs and FAQ sections.",
    url: "https://alsoasked.com/",
    tags: ["questions", "FAQ", "SERP"],
    featured: false,
    free: true,
  },
  {
    name: "AnswerThePublic",
    category: "keyword",
    desc: "Search listening tool for discovering question-based content ideas and long-tail topics.",
    url: "https://answerthepublic.com/",
    tags: ["questions", "content ideas", "long-tail"],
    featured: false,
    free: true,
  },
  {
    name: "ChatGPT",
    category: "automation",
    desc: "General AI assistant useful for content briefs, outlines, FAQ drafting, schema drafts, and editorial checklists.",
    url: "https://chatgpt.com/",
    tags: ["briefs", "drafting", "checklists"],
    featured: true,
    free: true,
  },
  {
    name: "Claude",
    category: "automation",
    desc: "AI assistant suited for long-form editing, source synthesis, content refresh planning, and structured reasoning.",
    url: "https://claude.ai/",
    tags: ["editing", "long context", "analysis"],
    featured: true,
    free: true,
  },
  {
    name: "Perplexity",
    category: "ai-search",
    desc: "Answer engine with citations, useful for source discovery, topic research, and AI search visibility checks.",
    url: "https://www.perplexity.ai/",
    tags: ["answer engine", "citations", "research"],
    featured: true,
    free: true,
  },
  {
    name: "Profound",
    category: "ai-search",
    desc: "AI search visibility platform for tracking how brands appear across answer engines and generative search.",
    url: "https://www.tryprofound.com/",
    tags: ["GEO", "brand visibility", "AI answers"],
    featured: false,
    free: false,
  },
  {
    name: "Peec AI",
    category: "ai-search",
    desc: "AI search analytics tool for monitoring brand visibility, mentions, and competitors in AI answer platforms.",
    url: "https://peec.ai/",
    tags: ["GEO", "mentions", "competitors"],
    featured: false,
    free: false,
  },
  {
    name: "Rank Math Content AI",
    category: "wordpress",
    desc: "WordPress SEO assistant for content suggestions, keyword-focused guidance, and on-page optimization.",
    url: "https://rankmath.com/content-ai/",
    tags: ["WordPress", "on-page", "content AI"],
    featured: true,
    free: true,
  },
  {
    name: "Yoast AI",
    category: "wordpress",
    desc: "AI-assisted Yoast features for WordPress SEO titles, meta descriptions, and editorial optimization.",
    url: "https://yoast.com/ai/",
    tags: ["WordPress", "metadata", "editing"],
    featured: false,
    free: false,
  },
  {
    name: "Link Whisper",
    category: "wordpress",
    desc: "Internal linking tool for WordPress sites, useful for topical clusters and maintaining link coverage.",
    url: "https://linkwhisper.com/",
    tags: ["internal links", "WordPress", "clusters"],
    featured: true,
    free: false,
  },
  {
    name: "Shopify Magic",
    category: "ecommerce",
    desc: "Shopify's AI features for product descriptions, commerce workflows, and store content assistance.",
    url: "https://www.shopify.com/magic",
    tags: ["Shopify", "product copy", "commerce"],
    featured: true,
    free: true,
  },
  {
    name: "Jasper",
    category: "ecommerce",
    desc: "AI marketing platform for product copy, campaigns, brand voice, and content production workflows.",
    url: "https://www.jasper.ai/",
    tags: ["product copy", "campaigns", "brand voice"],
    featured: false,
    free: true,
  },
  {
    name: "Klaviyo AI",
    category: "ecommerce",
    desc: "AI features for ecommerce email, SMS, customer segmentation, and lifecycle marketing.",
    url: "https://www.klaviyo.com/ai",
    tags: ["email", "segments", "ecommerce"],
    featured: false,
    free: true,
  },
  {
    name: "Gorgias",
    category: "ecommerce",
    desc: "Ecommerce customer support platform with automation and AI features that can surface product FAQ opportunities.",
    url: "https://www.gorgias.com/",
    tags: ["support", "FAQ", "Shopify"],
    featured: false,
    free: false,
  },
  {
    name: "Zapier AI",
    category: "automation",
    desc: "Automation platform for connecting SEO, spreadsheet, CMS, form, and reporting workflows with AI steps.",
    url: "https://zapier.com/ai",
    tags: ["automation", "workflows", "integrations"],
    featured: false,
    free: true,
  },
];

const state = {
  category: "all",
  query: "",
  featuredOnly: false,
  freeOnly: false,
  favorites: new Set(JSON.parse(localStorage.getItem("aiPilotFavorites") || "[]")),
};

const els = {
  categoryTabs: document.querySelector("#categoryTabs"),
  categorySummary: document.querySelector("#categorySummary"),
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  featuredOnly: document.querySelector("#featuredOnly"),
  freeOnly: document.querySelector("#freeOnly"),
  toolGrid: document.querySelector("#toolGrid"),
  resultCount: document.querySelector("#resultCount"),
  resetFilters: document.querySelector("#resetFilters"),
  emptyState: document.querySelector("#emptyState"),
  metricCategories: document.querySelector("#metricCategories"),
  metricTools: document.querySelector("#metricTools"),
  metricArticles: document.querySelector("#metricArticles"),
  featuredArticleGrid: document.querySelector("#featuredArticleGrid"),
};

function getCategoryName(id) {
  return categories.find((category) => category.id === id)?.name || id;
}

function createButton(category) {
  const button = document.createElement("button");
  button.className = "tab";
  button.type = "button";
  button.setAttribute("role", "tab");
  button.textContent = category.name;
  button.dataset.category = category.id;
  button.setAttribute("aria-selected", String(state.category === category.id));
  button.addEventListener("click", () => {
    state.category = category.id;
    render();
  });
  return button;
}

function renderTabs() {
  els.categoryTabs.replaceChildren(...categories.map(createButton));
}

function renderSummary() {
  const rows = categories
    .filter((category) => category.id !== "all")
    .map((category) => {
      const count = tools.filter((tool) => tool.category === category.id).length;
      const row = document.createElement("button");
      row.className = "category-row";
      row.type = "button";
      const label = document.createElement("strong");
      label.textContent = category.name;
      const total = document.createElement("span");
      total.textContent = count;
      row.append(label, total);
      row.addEventListener("click", () => {
        state.category = category.id;
        render();
        document.querySelector("#tools").scrollIntoView({ behavior: "smooth" });
      });
      return row;
    });

  els.categorySummary.replaceChildren(...rows);
}

function filterTools() {
  const query = state.query.trim().toLowerCase();
  return tools.filter((tool) => {
    const matchCategory = state.category === "all" || tool.category === state.category;
    const searchable = [tool.name, tool.desc, getCategoryName(tool.category), ...tool.tags]
      .join(" ")
      .toLowerCase();
    const matchQuery = !query || searchable.includes(query);
    const matchFeatured = !state.featuredOnly || tool.featured;
    const matchFree = !state.freeOnly || tool.free;
    return matchCategory && matchQuery && matchFeatured && matchFree;
  });
}

function saveFavorites() {
  localStorage.setItem("aiPilotFavorites", JSON.stringify([...state.favorites]));
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function slugifyToolName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createToolCard(tool) {
  const card = document.createElement("article");
  card.className = "tool-card";

  const favoriteActive = state.favorites.has(tool.name);

  const head = document.createElement("div");
  head.className = "tool-head";

  const title = document.createElement("div");
  title.className = "tool-title";

  const logo = document.createElement("span");
  logo.className = "tool-logo";
  logo.textContent = getInitials(tool.name);

  const titleText = document.createElement("div");
  const category = document.createElement("p");
  category.className = "tool-category";
  category.textContent = getCategoryName(tool.category);
  const heading = document.createElement("h3");
  heading.textContent = tool.name;
  titleText.append(category, heading);
  title.append(logo, titleText);

  const favorite = document.createElement("button");
  favorite.className = `favorite ${favoriteActive ? "is-active" : ""}`;
  favorite.type = "button";
  favorite.dataset.favorite = tool.name;
  favorite.setAttribute("aria-label", `${favoriteActive ? "Remove favorite" : "Save favorite"} ${tool.name}`);
  favorite.textContent = "*";

  head.append(title, favorite);

  const desc = document.createElement("p");
  desc.className = "tool-desc";
  desc.textContent = tool.desc;

  const tags = document.createElement("div");
  tags.className = "tool-tags";
  tool.tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.textContent = tag;
    tags.append(tagEl);
  });

  const footer = document.createElement("div");
  footer.className = "tool-footer";

  const meta = document.createElement("div");
  meta.className = "tool-meta";

  if (tool.featured) {
    const featured = document.createElement("span");
    featured.className = "badge featured";
    featured.textContent = "Featured";
    meta.append(featured);
  }

  const pricing = document.createElement("span");
  pricing.className = `badge ${tool.free ? "free" : ""}`;
  pricing.textContent = tool.free ? "Free tier" : "Paid";
  meta.append(pricing);

  const link = document.createElement("a");
  link.className = "tool-link";
  link.href = `go/${slugifyToolName(tool.name)}.html`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.dataset.toolClick = tool.name;
  link.dataset.toolCategory = getCategoryName(tool.category);
  link.dataset.externalUrl = tool.url;
  link.textContent = "Visit";

  footer.append(meta, link);
  card.append(head, desc, tags, footer);

  return card;
}

function renderTools() {
  const filtered = filterTools();
  els.toolGrid.replaceChildren(...filtered.map(createToolCard));
  els.resultCount.textContent = `${filtered.length} tools`;
  els.emptyState.hidden = filtered.length > 0;
}

function createArticleCard(article) {
  const card = document.createElement("a");
  card.className = "article-list-card";
  card.href = `articles/${article.html}`;

  const meta = document.createElement("span");
  meta.textContent = `${String(article.id).padStart(3, "0")} / ${article.keyword}`;

  const title = document.createElement("strong");
  title.textContent = article.title;

  const source = document.createElement("small");
  source.textContent = `Source: ${article.source}`;

  card.append(meta, title, source);
  return card;
}

async function renderFeaturedArticles() {
  if (!els.featuredArticleGrid) return;

  try {
    const response = await fetch("articles/index.json");
    if (!response.ok) throw new Error("Failed to load articles");
    const articles = await response.json();
    const featured = [0, 5, 10, 35, 55, 90].map((index) => articles[index]).filter(Boolean);

    els.metricArticles.textContent = articles.length;
    els.featuredArticleGrid.replaceChildren(...featured.map(createArticleCard));
  } catch (error) {
    els.featuredArticleGrid.innerHTML =
      '<p class="article-load-error">The article list could not be loaded. Open the article index directly.</p>';
  }
}

function resetFilters() {
  state.category = "all";
  state.query = "";
  state.featuredOnly = false;
  state.freeOnly = false;
  els.searchInput.value = "";
  els.featuredOnly.checked = false;
  els.freeOnly.checked = false;
  render();
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderTools();
  });

  els.clearSearch.addEventListener("click", () => {
    state.query = "";
    els.searchInput.value = "";
    renderTools();
    els.searchInput.focus();
  });

  els.featuredOnly.addEventListener("change", (event) => {
    state.featuredOnly = event.target.checked;
    renderTools();
  });

  els.freeOnly.addEventListener("change", (event) => {
    state.freeOnly = event.target.checked;
    renderTools();
  });

  els.resetFilters.addEventListener("click", resetFilters);
  document.querySelector("[data-reset]").addEventListener("click", resetFilters);

  els.toolGrid.addEventListener("click", (event) => {
    const toolLink = event.target.closest("[data-tool-click]");
    if (toolLink && window.va) {
      window.va("event", {
        name: "Tool click",
        data: {
          tool: toolLink.dataset.toolClick,
          category: toolLink.dataset.toolCategory,
        },
      });
      return;
    }

    const button = event.target.closest("[data-favorite]");
    if (!button) return;

    const name = button.dataset.favorite;
    if (state.favorites.has(name)) {
      state.favorites.delete(name);
    } else {
      state.favorites.add(name);
    }
    saveFavorites();
    renderTools();
  });
}

function render() {
  renderTabs();
  renderTools();
}

function init() {
  els.metricCategories.textContent = categories.length - 1;
  els.metricTools.textContent = tools.length;
  els.metricArticles.textContent = "100";
  renderSummary();
  render();
  renderFeaturedArticles();
  bindEvents();
}

init();
