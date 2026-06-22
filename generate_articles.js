const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "articles");

const topics = [
  ["AI工具", "个人效率", "筛选常用工具", "减少反复试用成本"],
  ["AI写作", "内容运营", "搭建选题到成稿流程", "稳定输出文章"],
  ["AI绘画", "设计新手", "生成海报和配图", "降低视觉制作门槛"],
  ["AI视频生成", "短视频团队", "批量制作脚本和分镜", "提升素材产出速度"],
  ["AI搜索", "研究人员", "快速整理资料来源", "缩短调研时间"],
  ["AI办公", "职场新人", "处理邮件、纪要和周报", "减少重复工作"],
  ["AI编程", "开发者", "理解项目并修改代码", "提升交付效率"],
  ["AI客服", "中小商家", "回答高频售前问题", "降低客服压力"],
  ["AI营销", "增长团队", "生成活动方案和素材", "提升转化测试速度"],
  ["AI数据分析", "运营团队", "读懂表格和指标", "更快发现问题"],
  ["AI教育", "老师", "设计课程和练习题", "提升备课效率"],
  ["AI论文", "学生", "梳理论文结构和文献摘要", "改善写作节奏"],
  ["AI简历", "求职者", "优化简历表达", "提高岗位匹配度"],
  ["AI电商", "店铺运营", "生成标题、详情页和客服话术", "提升上架速度"],
  ["AI短视频", "创作者", "拆解爆款脚本", "形成稳定内容模板"],
  ["AI提示词", "普通用户", "写出更清晰的指令", "得到更可控结果"],
  ["AI自动化", "运营人员", "连接表单、邮件和表格", "减少手动搬运"],
  ["AI图片生成", "品牌团队", "制作活动主视觉", "降低外包沟通成本"],
  ["AI语音", "播客和课程作者", "生成配音和旁白", "提升音频制作效率"],
  ["AI会议纪要", "项目团队", "整理录音和行动项", "避免会后遗漏"],
  ["AI知识库", "企业团队", "沉淀内部文档", "让新人更快上手"],
  ["AI数字人", "直播团队", "制作讲解和导购内容", "延长内容服务时间"],
  ["AI翻译", "跨境团队", "处理多语言文案", "提升本地化效率"],
  ["AI产品经理", "产品团队", "整理需求和原型说明", "提高沟通清晰度"],
  ["AI创业", "早期团队", "验证想法和制作方案", "降低试错成本"],
  ["AI设计", "UI设计师", "生成灵感板和组件说明", "加快方案探索"],
  ["AI财务", "小微企业", "整理报销和经营数据", "提升账务协作效率"],
  ["AI法务", "创业公司", "初步梳理合同风险点", "提高审阅效率"],
  ["AI人力资源", "HR团队", "写岗位 JD 和面试题", "提升招聘协作"],
  ["AI销售", "销售团队", "生成跟进话术和客户摘要", "提高线索转化"],
  ["AI跨境电商", "跨境卖家", "生成多语言商品内容", "提升上新效率"],
  ["AI内容运营", "新媒体团队", "规划栏目和发布节奏", "稳定内容供给"],
  ["AI私域运营", "社群运营", "设计欢迎语和活动话术", "提高触达质量"],
  ["AI SEO", "站长", "规划关键词和内容结构", "提升自然流量"],
  ["AI自媒体", "个人博主", "建立选题库和写作流程", "提升更新频率"],
  ["AI小红书", "种草账号", "生成笔记标题和正文", "提高内容测试效率"],
  ["AI公众号", "公众号作者", "规划长文和推送标题", "提升阅读完成率"],
  ["AI直播", "直播运营", "准备脚本和场控话术", "减少冷场"],
  ["AI表格", "行政和运营", "清洗数据并生成公式", "减少表格错误"],
  ["AI文档", "团队协作者", "整理规范、方案和说明", "提升文档质量"],
  ["AI PPT", "商务人员", "生成汇报结构和页面文案", "缩短做稿时间"],
  ["AI思维导图", "学习者", "梳理知识框架", "增强记忆线索"],
  ["AI学习", "自学者", "制定学习路径和复习计划", "提高学习连续性"],
  ["AI效率工具", "知识工作者", "搭建日常工作流", "节省碎片时间"],
  ["AI智能体", "技术团队", "拆分任务并调用工具", "提升自动执行能力"],
  ["AI代理", "业务团队", "处理固定流程任务", "减少人工等待"],
  ["AI工作流", "企业运营", "串联内容、审批和发布", "提高流程稳定性"],
  ["AI低代码", "非技术团队", "制作内部小工具", "降低开发门槛"],
  ["AI客户画像", "市场团队", "整理用户标签和需求", "提升投放精准度"],
  ["AI竞品分析", "产品和市场", "比较功能、价格和定位", "快速找到差异"],
  ["AI品牌营销", "品牌负责人", "统一卖点和表达", "提高传播一致性"],
  ["AI广告投放", "投放优化师", "生成素材方向和测试文案", "提升测试效率"],
  ["AI数据可视化", "管理者", "解释图表和业务趋势", "提升决策速度"],
  ["AI商业计划书", "创业者", "梳理市场、产品和财务假设", "提高融资材料质量"],
  ["AI项目管理", "项目经理", "拆解任务和跟踪风险", "提升交付确定性"],
  ["AI产品原型", "产品经理", "生成页面说明和交互文案", "加快评审"],
  ["AI用户研究", "体验团队", "整理访谈记录和洞察", "提升研究效率"],
  ["AI面试", "求职者", "模拟问答和复盘表达", "提升面试准备"],
  ["AI招聘", "招聘团队", "筛选简历和设计面试流程", "提高沟通效率"],
  ["AI培训", "企业内训", "生成课程大纲和练习", "降低培训准备成本"],
  ["AI合同审查", "业务负责人", "标记条款疑点", "提升合同沟通效率"],
  ["AI风险控制", "运营管理", "识别流程异常和重复问题", "提升预警能力"],
  ["AI医疗科普", "科普作者", "整理通俗解释和问答", "提高内容清晰度"],
  ["AI心理陪伴", "内容产品", "设计情绪记录和陪伴话术", "提升体验温度"],
  ["AI健身计划", "健身教练", "生成训练记录和课程文案", "提升服务效率"],
  ["AI旅游规划", "旅行博主", "设计路线和预算清单", "提升攻略质量"],
  ["AI餐饮菜单", "餐饮商家", "优化菜品命名和促销文案", "提高点单转化"],
  ["AI房地产文案", "房产顾问", "生成楼盘介绍和客户问答", "提高沟通效率"],
  ["AI保险内容", "保险从业者", "解释产品概念和服务流程", "提升内容透明度"],
  ["AI金融分析", "财经作者", "整理公开数据和观点框架", "提高写作效率"],
  ["AI投资研究", "投资学习者", "汇总公开资料和风险清单", "提升研究纪律"],
  ["AI股票复盘", "财经自媒体", "整理交易记录和市场事件", "提高复盘质量"],
  ["AI法律文书", "法律从业者", "起草常见文书框架", "提升初稿效率"],
  ["AI公文写作", "行政人员", "生成通知、总结和请示", "提升文字规范"],
  ["AI邮件写作", "商务人士", "撰写开发信和跟进邮件", "提高回复率"],
  ["AI脚本写作", "视频创作者", "设计开头、冲突和结尾", "提升完播率"],
  ["AI故事生成", "小说作者", "搭建人物和情节线", "突破创作卡点"],
  ["AI游戏策划", "游戏团队", "生成玩法、关卡和道具设定", "提高原型速度"],
  ["AI音乐生成", "音乐爱好者", "生成旋律、歌词和编曲方向", "降低创作门槛"],
  ["AI播客", "播客主", "准备选题、提纲和标题", "提升节目生产效率"],
  ["AI字幕生成", "视频团队", "生成字幕和摘要", "提升剪辑效率"],
  ["AI图片修复", "摄影师", "修补老照片和产品图", "减少后期时间"],
  ["AI Logo设计", "创业团队", "探索品牌符号和配色", "加快视觉验证"],
  ["AI UI设计", "产品设计师", "生成页面草图和文案", "提升迭代速度"],
  ["AI网页设计", "站长", "生成落地页结构和模块", "提升上线速度"],
  ["AI前端开发", "前端工程师", "生成组件和样式思路", "提高开发效率"],
  ["AI后端开发", "后端工程师", "整理接口和测试用例", "降低沟通成本"],
  ["AI测试用例", "测试团队", "生成边界场景和回归清单", "提升测试覆盖"],
  ["AI运维", "运维人员", "整理告警和排障步骤", "缩短响应时间"],
  ["AI安全", "安全团队", "梳理风险清单和检查项", "提升防护意识"],
  ["AI数据库", "数据团队", "生成 SQL 和解释查询结果", "提高分析效率"],
  ["AI CRM", "销售管理", "整理客户记录和跟进提醒", "提升客户维护"],
  ["AI ERP", "制造企业", "辅助整理订单和库存说明", "提升流程透明度"],
  ["AI供应链", "采购团队", "分析需求、库存和交付风险", "提高协同效率"],
  ["AI客服质检", "客服主管", "分析对话质量和改进点", "提升服务标准"],
  ["AI舆情监测", "公关团队", "整理评论、媒体和风险信号", "提升响应速度"],
  ["AI社区运营", "社区负责人", "设计活动和用户分层", "提升活跃度"],
  ["AI知识付费", "课程团队", "生成课程包装和交付材料", "提升转化效率"],
  ["AI本地部署", "技术爱好者", "搭建私有模型环境", "提升数据控制感"],
  ["AI模型选择", "企业团队", "比较模型能力、成本和安全边界", "减少选型偏差"],
];

function slugify(index, keyword) {
  return `article-${String(index + 1).padStart(3, "0")}`;
}

function titleFor(keyword, audience, scene) {
  return `${keyword}怎么用：${audience}${scene}的SEO实操指南`;
}

function buildArticle(topic, index) {
  const [keyword, audience, scene, benefit] = topic;
  const title = titleFor(keyword, audience, scene);
  const description = `本文围绕${keyword}，讲清楚${audience}如何在${scene}中落地应用，并用可执行步骤帮助读者${benefit}。`;
  const caution =
    keyword.includes("医疗") || keyword.includes("法务") || keyword.includes("法律")
      ? "涉及专业判断时，AI 只能做资料整理和初稿辅助，最终内容应由专业人士确认。"
      : keyword.includes("投资") || keyword.includes("金融") || keyword.includes("股票")
        ? "涉及资金决策时，AI 只能辅助整理公开信息和风险点，不能替代独立判断。"
        : "不要把 AI 输出直接发布，至少要核对事实、改写表达，并补充自己的经验。";

  return `---
title: "${title}"
keyword: "${keyword}"
description: "${description}"
---

# ${title}

${description}很多人第一次接触 ${keyword}，只关心“哪个工具最强”。真正影响效果的，是任务是否拆清楚：输入什么资料、输出什么格式、用什么标准验收。

## 先从一个具体场景开始

假设你是${audience}，现在要${scene}。不要直接输入“帮我做个方案”，而是说明背景、目标、受众、限制和样例。上下文越具体，AI 越容易给出可编辑的初稿。

## ${keyword}的三步使用流程

第一步，准备真实资料，包括产品信息、反馈、案例或竞品要点。第二步，写清提示词，把角色、任务、格式、语气和禁区放进去。第三步，复核并追问，让 AI 补证据、改标题、压缩废话。

## SEO友好的内容结构

围绕 ${keyword} 写文章，标题要出现核心关键词，开头回答读者最想知道的问题，中间用二级标题覆盖使用方法、适合人群、工具选择和 FAQ。正文自然加入“AI工具推荐”“提示词模板”“应用场景”等相关词即可。

## 常见错误和避坑建议

常见错误是把 AI 当成最终作者。它能列结构、补角度、改表达，却不一定理解真实业务。${caution}输出后检查四点：具体、准确、符合语气、能让读者行动。

## 可直接套用的提示词

你可以这样写：“你是一名熟悉 SEO 的内容顾问。请围绕 ${keyword}，面向${audience}，写一份用于${scene}的文章大纲。标题包含关键词，结构包含步骤、工具选择、避坑和 FAQ，语气务实。”

## 总结

${keyword}的价值不是替人完成所有工作，而是让重复、零散、难启动的部分变快。先定义场景，再给足上下文，最后人工把关，就能帮助${audience}${benefit}。做 SEO 时，可继续扩展案例、工具对比和模板下载。

## FAQ

**${keyword}适合新手吗？** 适合。先用固定模板生成结构，再逐段修改。

**文章要堆关键词吗？** 不需要。标题、开头、小标题和 FAQ 自然出现即可。
`;
}

function visibleLength(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/[#>*`"-]/g, "")
    .replace(/\s/g, "").length;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
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
      return `<p>${inlineMarkdown(text).replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}

function articleHtml({ title, keyword, description, markdown, prev, next }) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keyword)}, AI, 人工智能, AI工具" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="nav-shell" aria-label="文章导航">
        <a class="brand" href="../index.html">
          <span class="brand-mark">AI</span>
          <span><strong>AI Pilot</strong><small>AI SEO 文章</small></span>
        </a>
        <div class="nav-links">
          <a href="../index.html">工具导航</a>
          <a href="index.html">文章索引</a>
        </div>
      </nav>
    </header>
    <main class="article-layout section-shell">
      <article class="article-page">
        <p class="eyebrow">${escapeHtml(keyword)}</p>
        ${markdownBodyToHtml(markdown)}
        <nav class="article-pager" aria-label="上一篇和下一篇">
          ${prev ? `<a class="button secondary" href="${prev}">上一篇</a>` : "<span></span>"}
          ${next ? `<a class="button secondary" href="${next}">下一篇</a>` : "<span></span>"}
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
        <span>${String(item.id).padStart(3, "0")} · ${escapeHtml(item.keyword)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>约 ${item.length} 字</small>
      </a>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI SEO 文章库 | 100 篇 AI 关键词文章</title>
    <meta name="description" content="100 篇 AI 主题 SEO 文章，覆盖 AI工具、AI写作、AI绘画、AI营销、AI编程、AI办公等长尾关键词。" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="nav-shell" aria-label="文章索引导航">
        <a class="brand" href="../index.html">
          <span class="brand-mark">AI</span>
          <span><strong>AI Pilot</strong><small>AI SEO 文章库</small></span>
        </a>
        <div class="nav-links">
          <a href="../index.html">工具导航</a>
          <a href="#article-list">文章列表</a>
        </div>
      </nav>
    </header>
    <main class="section-shell article-index">
      <section class="article-index-hero">
        <p class="eyebrow">AI content library</p>
        <h1>100 篇 AI 主题 SEO 文章</h1>
        <p>每篇约 800 字，标题包含关键词，正文包含场景、步骤、避坑建议和 FAQ，可直接用于内容站、导航站或后续改写发布。</p>
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

  const index = topics.map((topic, i) => {
    const [keyword, audience, scene] = topic;
    const title = titleFor(keyword, audience, scene);
    const slug = slugify(i, keyword);
    const file = `${slug}.md`;
    const html = `${slug}.html`;
    const content = buildArticle(topic, i);
    fs.writeFileSync(path.join(outDir, file), content, "utf8");

    return {
      id: i + 1,
      title,
      keyword,
      file: `articles/${file}`,
      html,
      length: visibleLength(content),
      description: `本文围绕${keyword}，讲清楚${audience}如何在${scene}中落地应用，并用可执行步骤帮助读者${topic[3]}。`,
      markdown: content,
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
    "# AI SEO 文章库",
    "",
    "本目录包含 100 篇 AI 主题 SEO 文章，每篇 Markdown 都包含标题、关键词、描述、正文结构和 FAQ。",
    "",
    "| 序号 | 关键词 | 标题 | 文件 | 字数估算 |",
    "| --- | --- | --- | --- | --- |",
    ...jsonIndex.map(
      (item) => `| ${item.id} | ${item.keyword} | ${item.title} | ${item.file.replace("articles/", "")} | ${item.length} |`,
    ),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, "README.md"), readme, "utf8");

  const min = Math.min(...index.map((item) => item.length));
  const max = Math.max(...index.map((item) => item.length));
  const avg = Math.round(index.reduce((sum, item) => sum + item.length, 0) / index.length);
  console.log(`Generated ${index.length} articles.`);
  console.log(`Length range: ${min}-${max}, average ${avg}.`);
}

run();
