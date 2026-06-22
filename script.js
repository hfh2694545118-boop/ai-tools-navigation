const categories = [
  { id: "all", name: "全部" },
  { id: "writing", name: "写作办公" },
  { id: "image", name: "图像设计" },
  { id: "code", name: "代码开发" },
  { id: "video", name: "音视频" },
  { id: "productivity", name: "效率自动化" },
  { id: "research", name: "搜索研究" },
];

const tools = [
  {
    name: "ChatGPT",
    category: "writing",
    desc: "通用 AI 助手，适合问答、写作、分析、代码和日常办公。",
    url: "https://chatgpt.com/",
    tags: ["对话", "写作", "办公"],
    featured: true,
    free: true,
  },
  {
    name: "Claude",
    category: "writing",
    desc: "擅长长文档理解、结构化写作、代码协作和复杂推理。",
    url: "https://claude.ai/",
    tags: ["长文本", "分析", "写作"],
    featured: true,
    free: true,
  },
  {
    name: "Gemini",
    category: "research",
    desc: "Google 出品的多模态 AI 工具，适合资料整理和跨应用协作。",
    url: "https://gemini.google.com/",
    tags: ["搜索", "多模态", "Google"],
    featured: true,
    free: true,
  },
  {
    name: "Perplexity",
    category: "research",
    desc: "带来源引用的 AI 搜索工具，适合快速调研和信息核验。",
    url: "https://www.perplexity.ai/",
    tags: ["AI 搜索", "引用", "研究"],
    featured: true,
    free: true,
  },
  {
    name: "Midjourney",
    category: "image",
    desc: "高质量 AI 图像生成工具，适合概念图、视觉探索和创意海报。",
    url: "https://www.midjourney.com/",
    tags: ["绘图", "创意", "海报"],
    featured: true,
    free: false,
  },
  {
    name: "Runway",
    category: "video",
    desc: "AI 视频生成和编辑平台，适合短片、广告素材和动态视觉。",
    url: "https://runwayml.com/",
    tags: ["视频", "生成", "剪辑"],
    featured: true,
    free: true,
  },
  {
    name: "Cursor",
    category: "code",
    desc: "AI 原生代码编辑器，可理解项目上下文并辅助修改代码。",
    url: "https://cursor.com/",
    tags: ["IDE", "编程", "代码助手"],
    featured: true,
    free: true,
  },
  {
    name: "GitHub Copilot",
    category: "code",
    desc: "集成在常见 IDE 中的代码补全和编程助手。",
    url: "https://github.com/features/copilot",
    tags: ["补全", "GitHub", "IDE"],
    featured: false,
    free: false,
  },
  {
    name: "Notion AI",
    category: "productivity",
    desc: "把 AI 写作、总结和知识库问答集成到 Notion 工作区。",
    url: "https://www.notion.com/product/ai",
    tags: ["知识库", "文档", "团队"],
    featured: false,
    free: true,
  },
  {
    name: "Gamma",
    category: "writing",
    desc: "用 AI 快速生成演示文稿、网页式文档和方案稿。",
    url: "https://gamma.app/",
    tags: ["PPT", "方案", "演示"],
    featured: false,
    free: true,
  },
  {
    name: "Canva AI",
    category: "image",
    desc: "集成在 Canva 里的图片、文案和版式生成能力。",
    url: "https://www.canva.com/ai/",
    tags: ["设计", "图片", "模板"],
    featured: false,
    free: true,
  },
  {
    name: "Zapier AI",
    category: "productivity",
    desc: "用自然语言连接应用、搭建自动化流程和内部工具。",
    url: "https://zapier.com/ai",
    tags: ["自动化", "工作流", "集成"],
    featured: false,
    free: true,
  },
  {
    name: "ElevenLabs",
    category: "video",
    desc: "AI 语音生成与配音平台，适合播客、视频解说和多语言声音。",
    url: "https://elevenlabs.io/",
    tags: ["语音", "配音", "音频"],
    featured: true,
    free: true,
  },
  {
    name: "Suno",
    category: "video",
    desc: "AI 音乐创作工具，可生成带人声的完整歌曲片段。",
    url: "https://suno.com/",
    tags: ["音乐", "音频", "创作"],
    featured: false,
    free: true,
  },
  {
    name: "Kimi",
    category: "research",
    desc: "中文长文本 AI 助手，适合文档阅读、资料整理和知识问答。",
    url: "https://kimi.moonshot.cn/",
    tags: ["中文", "长文档", "阅读"],
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
  favorite.setAttribute("aria-label", `${favoriteActive ? "取消收藏" : "收藏"} ${tool.name}`);
  favorite.textContent = "★";

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
    featured.textContent = "精选";
    meta.append(featured);
  }

  const pricing = document.createElement("span");
  pricing.className = `badge ${tool.free ? "free" : ""}`;
  pricing.textContent = tool.free ? "含免费版" : "付费";
  meta.append(pricing);

  const link = document.createElement("a");
  link.className = "tool-link";
  link.href = tool.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "访问";

  footer.append(meta, link);
  card.append(head, desc, tags, footer);

  return card;
}

function renderTools() {
  const filtered = filterTools();
  els.toolGrid.replaceChildren(...filtered.map(createToolCard));
  els.resultCount.textContent = `${filtered.length} 个工具`;
  els.emptyState.hidden = filtered.length > 0;
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
  renderSummary();
  render();
  bindEvents();
}

init();
