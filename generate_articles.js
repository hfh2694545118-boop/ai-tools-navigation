const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "articles");

const topics = [
  ["AI工具", "个人效率", "筛选常用工具", "减少反复试用成本", "general"],
  ["AI写作", "内容运营", "搭建选题到成稿流程", "稳定输出文章", "work"],
  ["AI绘画", "设计新手", "生成海报和配图", "降低视觉制作门槛", "design"],
  ["AI视频生成", "短视频团队", "批量制作脚本和分镜", "提升素材产出速度", "video"],
  ["AI搜索", "研究人员", "快速整理资料来源", "缩短调研时间", "research"],
  ["AI办公", "职场新人", "处理邮件、纪要和周报", "减少重复工作", "work"],
  ["AI编程", "开发者", "理解项目并修改代码", "提升交付效率", "code"],
  ["AI客服", "中小商家", "回答高频售前问题", "降低客服压力", "service"],
  ["AI营销", "增长团队", "生成活动方案和素材", "提升转化测试速度", "marketing"],
  ["AI数据分析", "运营团队", "读懂表格和指标", "更快发现问题", "data"],
  ["AI教育", "老师", "设计课程和练习题", "提升备课效率", "education"],
  ["AI论文", "学生", "梳理论文结构和文献摘要", "改善写作节奏", "research"],
  ["AI简历", "求职者", "优化简历表达", "提高岗位匹配度", "career"],
  ["AI电商", "店铺运营", "生成标题、详情页和客服话术", "提升上架速度", "ecommerce"],
  ["AI短视频", "创作者", "拆解爆款脚本", "形成稳定内容模板", "video"],
  ["AI提示词", "普通用户", "写出更清晰的指令", "得到更可控结果", "general"],
  ["AI自动化", "运营人员", "连接表单、邮件和表格", "减少手动搬运", "workflow"],
  ["AI图片生成", "品牌团队", "制作活动主视觉", "降低外包沟通成本", "design"],
  ["AI语音", "播客和课程作者", "生成配音和旁白", "提升音频制作效率", "video"],
  ["AI会议纪要", "项目团队", "整理录音和行动项", "避免会后遗漏", "meeting"],
  ["AI知识库", "企业团队", "沉淀内部文档", "让新人更快上手", "knowledge"],
  ["AI数字人", "直播团队", "制作讲解和导购内容", "延长内容服务时间", "video"],
  ["AI翻译", "跨境团队", "处理多语言文案", "提升本地化效率", "ecommerce"],
  ["AI产品经理", "产品团队", "整理需求和原型说明", "提高沟通清晰度", "product"],
  ["AI创业", "早期团队", "验证想法和制作方案", "降低试错成本", "startup"],
  ["AI设计", "UI设计师", "生成灵感板和组件说明", "加快方案探索", "design"],
  ["AI财务", "小微企业", "整理报销和经营数据", "提升账务协作效率", "professional"],
  ["AI法务", "创业公司", "初步梳理合同风险点", "提高审阅效率", "legal"],
  ["AI人力资源", "HR团队", "写岗位 JD 和面试题", "提升招聘协作", "career"],
  ["AI销售", "销售团队", "生成跟进话术和客户摘要", "提高线索转化", "sales"],
  ["AI跨境电商", "跨境卖家", "生成多语言商品内容", "提升上新效率", "ecommerce"],
  ["AI内容运营", "新媒体团队", "规划栏目和发布节奏", "稳定内容供给", "marketing"],
  ["AI私域运营", "社群运营", "设计欢迎语和活动话术", "提高触达质量", "service"],
  ["AI SEO", "站长", "规划关键词和内容结构", "提升自然流量", "marketing"],
  ["AI自媒体", "个人博主", "建立选题库和写作流程", "提升更新频率", "marketing"],
  ["AI小红书", "种草账号", "生成笔记标题和正文", "提高内容测试效率", "marketing"],
  ["AI公众号", "公众号作者", "规划长文和推送标题", "提升阅读完成率", "marketing"],
  ["AI直播", "直播运营", "准备脚本和场控话术", "减少冷场", "sales"],
  ["AI表格", "行政和运营", "清洗数据并生成公式", "减少表格错误", "data"],
  ["AI文档", "团队协作者", "整理规范、方案和说明", "提升文档质量", "work"],
  ["AI PPT", "商务人员", "生成汇报结构和页面文案", "缩短做稿时间", "work"],
  ["AI思维导图", "学习者", "梳理知识框架", "增强记忆线索", "education"],
  ["AI学习", "自学者", "制定学习路径和复习计划", "提高学习连续性", "education"],
  ["AI效率工具", "知识工作者", "搭建日常工作流", "节省碎片时间", "work"],
  ["AI智能体", "技术团队", "拆分任务并调用工具", "提升自动执行能力", "workflow"],
  ["AI代理", "业务团队", "处理固定流程任务", "减少人工等待", "workflow"],
  ["AI工作流", "企业运营", "串联内容、审批和发布", "提高流程稳定性", "workflow"],
  ["AI低代码", "非技术团队", "制作内部小工具", "降低开发门槛", "workflow"],
  ["AI客户画像", "市场团队", "整理用户标签和需求", "提升投放精准度", "marketing"],
  ["AI竞品分析", "产品和市场", "比较功能、价格和定位", "快速找到差异", "research"],
  ["AI品牌营销", "品牌负责人", "统一卖点和表达", "提高传播一致性", "marketing"],
  ["AI广告投放", "投放优化师", "生成素材方向和测试文案", "提升测试效率", "marketing"],
  ["AI数据可视化", "管理者", "解释图表和业务趋势", "提升决策速度", "data"],
  ["AI商业计划书", "创业者", "梳理市场、产品和财务假设", "提高融资材料质量", "startup"],
  ["AI项目管理", "项目经理", "拆解任务和跟踪风险", "提升交付确定性", "meeting"],
  ["AI产品原型", "产品经理", "生成页面说明和交互文案", "加快评审", "product"],
  ["AI用户研究", "体验团队", "整理访谈记录和洞察", "提升研究效率", "research"],
  ["AI面试", "求职者", "模拟问答和复盘表达", "提升面试准备", "career"],
  ["AI招聘", "招聘团队", "筛选简历和设计面试流程", "提高沟通效率", "career"],
  ["AI培训", "企业内训", "生成课程大纲和练习", "降低培训准备成本", "education"],
  ["AI合同审查", "业务负责人", "标记条款疑点", "提升合同沟通效率", "legal"],
  ["AI风险控制", "运营管理", "识别流程异常和重复问题", "提升预警能力", "finance"],
  ["AI医疗科普", "科普作者", "整理通俗解释和问答", "提高内容清晰度", "health"],
  ["AI心理陪伴", "内容产品", "设计情绪记录和陪伴话术", "提升体验温度", "health"],
  ["AI健身计划", "健身教练", "生成训练记录和课程文案", "提升服务效率", "education"],
  ["AI旅游规划", "旅行博主", "设计路线和预算清单", "提升攻略质量", "research"],
  ["AI餐饮菜单", "餐饮商家", "优化菜品命名和促销文案", "提高点单转化", "sales"],
  ["AI房地产文案", "房产顾问", "生成楼盘介绍和客户问答", "提高沟通效率", "sales"],
  ["AI保险内容", "保险从业者", "解释产品概念和服务流程", "提升内容透明度", "finance"],
  ["AI金融分析", "财经作者", "整理公开数据和观点框架", "提高写作效率", "finance"],
  ["AI投资研究", "投资学习者", "汇总公开资料和风险清单", "提升研究纪律", "finance"],
  ["AI股票复盘", "财经自媒体", "整理交易记录和市场事件", "提高复盘质量", "finance"],
  ["AI法律文书", "法律从业者", "起草常见文书框架", "提升初稿效率", "legal"],
  ["AI公文写作", "行政人员", "生成通知、总结和请示", "提升文字规范", "work"],
  ["AI邮件写作", "商务人士", "撰写开发信和跟进邮件", "提高回复率", "sales"],
  ["AI脚本写作", "视频创作者", "设计开头、冲突和结尾", "提升完播率", "video"],
  ["AI故事生成", "小说作者", "搭建人物和情节线", "突破创作卡点", "video"],
  ["AI游戏策划", "游戏团队", "生成玩法、关卡和道具设定", "提高原型速度", "video"],
  ["AI音乐生成", "音乐爱好者", "生成旋律、歌词和编曲方向", "降低创作门槛", "video"],
  ["AI播客", "播客主", "准备选题、提纲和标题", "提升节目生产效率", "video"],
  ["AI字幕生成", "视频团队", "生成字幕和摘要", "提升剪辑效率", "video"],
  ["AI图片修复", "摄影师", "修补老照片和产品图", "减少后期时间", "design"],
  ["AI Logo设计", "创业团队", "探索品牌符号和配色", "加快视觉验证", "design"],
  ["AI UI设计", "产品设计师", "生成页面草图和文案", "提升迭代速度", "design"],
  ["AI网页设计", "站长", "生成落地页结构和模块", "提升上线速度", "design"],
  ["AI前端开发", "前端工程师", "生成组件和样式思路", "提高开发效率", "code"],
  ["AI后端开发", "后端工程师", "整理接口和测试用例", "降低沟通成本", "code"],
  ["AI测试用例", "测试团队", "生成边界场景和回归清单", "提升测试覆盖", "code"],
  ["AI运维", "运维人员", "整理告警和排障步骤", "缩短响应时间", "code"],
  ["AI安全", "安全团队", "梳理风险清单和检查项", "提升防护意识", "code"],
  ["AI数据库", "数据团队", "生成 SQL 和解释查询结果", "提高分析效率", "data"],
  ["AI CRM", "销售管理", "整理客户记录和跟进提醒", "提升客户维护", "sales"],
  ["AI ERP", "制造企业", "辅助整理订单和库存说明", "提升流程透明度", "workflow"],
  ["AI供应链", "采购团队", "分析需求、库存和交付风险", "提高协同效率", "workflow"],
  ["AI客服质检", "客服主管", "分析对话质量和改进点", "提升服务标准", "service"],
  ["AI舆情监测", "公关团队", "整理评论、媒体和风险信号", "提升响应速度", "marketing"],
  ["AI社区运营", "社区负责人", "设计活动和用户分层", "提升活跃度", "service"],
  ["AI知识付费", "课程团队", "生成课程包装和交付材料", "提升转化效率", "education"],
  ["AI本地部署", "技术爱好者", "搭建私有模型环境", "提升数据控制感", "code"],
  ["AI模型选择", "企业团队", "比较模型能力、成本和安全边界", "减少选型偏差", "general"],
];

const evidence = {
  general: {
    source: "McKinsey 2025 State of AI",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    data: "McKinsey 2025 调研显示，88% 的受访组织已经在至少一个业务职能中常规使用 AI；上一年是 78%。",
    case: "这说明 AI 工具导航页不能只做“热门工具榜”，更要标出适用场景、付费门槛、数据输入风险和替代方案。",
  },
  work: {
    source: "Microsoft Work Trend Index 2024",
    url: "https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part",
    data: "Microsoft 与 LinkedIn 的 2024 Work Trend Index 显示，75% 的全球知识工作者已经在工作中使用生成式 AI，78% 的 AI 用户会自带工具上班。",
    case: "一家团队如果不提供统一规范，员工会各用各的 AI：邮件、周报、PPT 和纪要分散在不同账号里，知识无法沉淀，安全边界也不清楚。",
  },
  code: {
    source: "GitHub Copilot productivity research",
    url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
    data: "GitHub 的受控实验中，使用 Copilot 的开发者完成同一 JavaScript HTTP server 任务平均快 55%，用时 1 小时 11 分钟；对照组为 2 小时 41 分钟。",
    case: "这个结果适合解释 AI 编程的边界：它对样板代码、测试草稿和 API 调用很有帮助，但仍需要开发者做架构判断、权限校验和代码审查。",
  },
  service: {
    source: "OpenAI Klarna customer story",
    url: "https://openai.com/index/klarna/",
    data: "Klarna 的 AI 助手上线首月处理 230 万次对话，占客服聊天量的三分之二；重复咨询下降 25%，客户解决问题时间从 11 分钟降到 2 分钟以内。",
    case: "适合中小商家的做法不是一开始替代所有客服，而是先覆盖物流查询、退款进度、商品规格、营业时间这类高频问题，并保留人工转接。",
  },
  marketing: {
    source: "Canva Visual Economy Report 2024",
    url: "https://www.canva.com/newsroom/news/visual-economy-report-2024/",
    data: "Canva 2024 视觉经济报告称，82% 的受访领导者过去一年用过 AI 工具制作视觉内容，77% 认为视觉沟通提升了业务表现。",
    case: "营销团队用 AI 不是为了多发低质素材，而是把同一卖点快速改成首页横幅、短视频封面、社媒图和邮件头图，再用数据筛选有效版本。",
  },
  design: {
    source: "Coca-Cola Create Real Magic",
    url: "https://www.coca-colacompany.com/media-center/coca-cola-invites-digital-artists-to-create-real-magic-using-new-ai-platform",
    data: "Coca-Cola 的 Create Real Magic 活动让数字艺术家使用品牌素材与 AI 生成创意作品，并邀请 4 位 AI 艺术家先行创作示范。",
    case: "这个案例说明品牌使用 AI 设计时，最重要的不是“生成得像不像”，而是把可用素材、品牌禁区、字体色彩和审核流程先规定清楚。",
  },
  video: {
    source: "AP: Runway AI Film Festival 2025",
    url: "https://apnews.com/article/3b5d40e4c2e20f7a4d34f1f5d4907ba7",
    data: "AP 报道，Runway 2025 AI Film Festival 收到约 6,000 部作品投稿，而 2023 年首届约为 300 部，生成式视频创作的供给正在快速增加。",
    case: "短视频团队应把 AI 用在分镜预演、镜头替代方案和粗剪节奏上，真正决定完播率的仍是选题、冲突、人物和剪辑判断。",
  },
  data: {
    source: "Stanford AI Index 2025",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    data: "Stanford HAI 2025 AI Index 显示，2024 年美国私人 AI 投资达到 1091 亿美元，生成式 AI 全球私人投资为 339 亿美元。",
    case: "数据分析文章应提醒读者：市场投入很大，但业务价值要落到指标上，例如节省多少分析时间、减少多少人工清洗、发现多少异常线索。",
  },
  education: {
    source: "Duolingo Max GPT-4 launch",
    url: "https://blog.duolingo.com/duolingo-max/",
    data: "Duolingo Max 使用 GPT-4 做了两个明确功能：Role Play 作为 AI 对话伙伴，Explain My Answer 用来解释用户为什么答错。",
    case: "教育产品使用 AI 的重点不是替老师讲完所有内容，而是把练习、反馈和纠错做得更及时，让学习者知道下一步该改什么。",
  },
  research: {
    source: "Morgan Stanley OpenAI customer story",
    url: "https://openai.com/index/morgan-stanley/",
    data: "Morgan Stanley 财富管理团队的 AI Assistant 日常采用率超过 98%，内部文档访问覆盖率从 20% 提升到 80%。",
    case: "研究类工作最适合从“找资料”切入：先限定可信来源，再让 AI 摘要、对比和列出不确定点，而不是直接让它下结论。",
  },
  ecommerce: {
    source: "OpenAI Klarna customer story",
    url: "https://openai.com/index/klarna/",
    data: "Klarna 的 AI 助手支持 23 个市场、35 种以上语言，并预计为 2024 年带来 4,000 万美元利润改善。",
    case: "跨境电商可以把 AI 用在多语言客服、退换货说明、商品 FAQ 和本地化标题上，但价格、库存、物流时效必须接入真实系统。",
  },
  workflow: {
    source: "OpenAI Moderna customer story",
    url: "https://openai.com/index/moderna/",
    data: "Moderna 在公司内部部署了 750 个 GPT；40% 的周活跃用户创建过 GPT，每名用户平均每周有 120 次 ChatGPT Enterprise 对话。",
    case: "这不是“买一个聊天工具”的故事，而是把法务、研发、制造、商业化等部门的重复流程拆成可复用助手。",
  },
  legal: {
    source: "A&O Shearman Harvey launch",
    url: "https://www.aoshearman.com/en/news/ao-announces-exclusive-launch-partnership-with-harvey",
    data: "Allen & Overy 将 Harvey 部署给 43 个办公室、超过 3,500 名律师，用于生成和检索法律内容。",
    case: "法律场景不能把 AI 输出当结论。更稳妥的用法是做条款清单、尽调问题、初稿结构和多语言摘要，最后由律师逐条确认。",
  },
  health: {
    source: "Google Cloud and Mayo Clinic",
    url: "https://www.prnewswire.com/news-releases/google-cloud-collaborates-with-mayo-clinic-to-transform-healthcare-with-generative-ai-301844437.html",
    data: "Google Cloud 与 Mayo Clinic 的合作从 Enterprise Search 切入，用生成式 AI 帮助临床人员和研究人员更快找到医疗信息。",
    case: "医疗内容页必须写清楚边界：AI 可以辅助检索、解释和整理科普，但诊断、用药和治疗方案必须由专业医生确认。",
  },
  finance: {
    source: "IMF AI and jobs analysis",
    url: "https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
    data: "IMF 分析称，全球近 40% 的就业暴露于 AI 影响；在发达经济体，这一比例约为 60%。",
    case: "金融内容不能让 AI 给买卖建议。更好的定位是整理公开资料、列风险点、做复盘框架，并保留数据来源和人工判断记录。",
  },
  career: {
    source: "World Economic Forum Future of Jobs 2025",
    url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/",
    data: "世界经济论坛 2025 未来就业报告把 AI 与大数据列为增长最快的技能之一，同时强调创造性思维、韧性和终身学习的重要性。",
    case: "求职和招聘内容应把 AI 当成准备工具：它能帮你拆岗位、改简历和模拟面试，但真实项目经历和可证明成果仍是核心。",
  },
  sales: {
    source: "Morgan Stanley Debrief launch",
    url: "https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch",
    data: "Morgan Stanley Debrief 会在客户同意后生成会议纪要、提炼行动项、起草可编辑邮件，并把记录保存到 Salesforce。",
    case: "销售团队可以照这个思路做客户跟进：每次沟通后沉淀痛点、预算、决策人、下一步和邮件草稿，而不是只让 AI 写一段漂亮话术。",
  },
  professional: {
    source: "Thomson Reuters Future of Professionals 2024",
    url: "https://www.thomsonreuters.com/en/press-releases/2024/july/ai-set-to-save-professionals-12-hours-per-week-by-2029",
    data: "Thomson Reuters 调研显示，专业人士预计 AI 未来一年可每周节省 4 小时，五年内可达每周 12 小时。",
    case: "财务、税务、法务等专业场景要优先处理标准化资料整理，再把节省的时间投向判断、沟通和复核。",
  },
  knowledge: {
    source: "OpenAI Morgan Stanley customer story",
    url: "https://openai.com/index/morgan-stanley/",
    data: "Morgan Stanley 的案例中，AI Assistant 让内部文档访问覆盖率从 20% 提升到 80%，说明知识库价值取决于检索覆盖和权限治理。",
    case: "企业知识库不应只是上传 PDF，而要设计文档标签、权限、更新时间、引用来源和无法回答时的升级路径。",
  },
  meeting: {
    source: "Morgan Stanley Debrief launch",
    url: "https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch",
    data: "Morgan Stanley Debrief 的流程包括生成会议摘要、提取行动项、起草邮件并写入 Salesforce。",
    case: "项目团队可以照搬这个闭环：会前列议题，会中记录决策，会后输出负责人、截止时间和风险，而不是只存一份泛泛纪要。",
  },
  product: {
    source: "Adobe Digital Trends 2026",
    url: "https://business.adobe.com/resources/digital-trends-report.html",
    data: "Adobe 2026 Digital Trends 报告称，53% 的组织内容供应链仍然线性且资源密集，只有 47% 在旅程设计或全渠道激活中使用生成式或智能体 AI。",
    case: "产品团队落地 AI 原型时，要先把用户旅程、内容状态和数据口径打通，否则只会得到一堆孤立页面和不可复用文案。",
  },
  startup: {
    source: "Stanford AI Index 2025",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    data: "Stanford HAI 2025 AI Index 显示，2024 年生成式 AI 全球私人投资为 339 亿美元，比 2023 年增长 18.7%。",
    case: "创业者不要只写“AI 概念”。商业计划书应回答：数据从哪来、谁付费、比人工流程省多少、失败时由谁兜底。",
  },
};

function slugify(index) {
  return `article-${String(index + 1).padStart(3, "0")}`;
}

function titleFor(keyword, audience, scene) {
  return `${keyword}怎么用：${audience}${scene}的真实案例和SEO指南`;
}

function pickEvidence(kind) {
  return evidence[kind] || evidence.general;
}

function safetyNote(kind) {
  if (kind === "health") return "健康、诊断、用药和治疗方案必须交给专业医生，文章只能做科普和信息整理。";
  if (kind === "legal") return "合同、诉讼和合规判断必须由律师复核，AI 输出只能作为清单或初稿。";
  if (kind === "finance") return "投资、保险和金融决策要基于合规信息和个人风险承受能力，AI 不能替你做买卖判断。";
  if (kind === "code") return "代码必须经过测试、权限检查和人工 review，尤其是鉴权、支付、数据删除和外部接口。";
  return "不要直接发布 AI 原文，至少要核对事实、改写表达、补充业务细节，并记录来源。";
}

function buildArticle(topic, index) {
  const [keyword, audience, scene, benefit, kind] = topic;
  const item = pickEvidence(kind);
  const title = titleFor(keyword, audience, scene);
  const description = `围绕${keyword}，用真实数据和案例说明${audience}如何在${scene}中落地，避免空泛模板文。`;
  const guardrail = safetyNote(kind);
  const metric = `${scene}的耗时、返工次数、人工介入率、转化率或错误率`;

  return `---
title: "${title}"
keyword: "${keyword}"
description: "${description}"
---

# ${title}

${description}如果只写“AI 能提升效率”，这篇文章就没有价值。更好的写法是先给读者一个可核验的参照，再说明自己应该怎样照着落地。

## 真实数据

${item.data} 来源：[${item.source}](${item.url})。这个数据对 ${keyword} 的启发很直接：AI 已经不是少数人尝鲜，而是进入了具体岗位、具体流程和具体指标。对${audience}来说，第一步不是追热点，而是把${metric}先量出来。

## 具体案例

${item.case} 放到“${scene}”这个场景里，可以拆成三个动作：先收集真实资料，再让 AI 生成可编辑初稿，最后用人工标准验收。比如做一篇内容，不只让 AI 写正文，还要提供目标用户、搜索关键词、竞品标题、产品截图和禁用说法。这样产出的内容才有信息密度。

## 可落地做法

第一，建立输入模板：背景、目标、受众、限制、已有资料、输出格式。第二，建立验收表：事实是否有来源，数字是否可追溯，案例是否具体，结论是否过度承诺。第三，建立复用库：把好用的提示词、标题、FAQ、检查项保存下来，下一次不从零开始。

## 不要这样做

不要把 ${keyword} 写成万能工具。${guardrail} 也不要机械堆关键词。SEO 友好的内容不是重复“${keyword}、${keyword}工具、${keyword}推荐”，而是让读者看完后知道该选什么、怎么试、怎么判断是否有效。

## SEO结构建议

标题保留核心关键词，开头直接回答“能解决什么问题”。正文用“数据、案例、步骤、风险、FAQ”组织。文章内自然出现相关词，如 AI工具、提示词、应用场景、真实案例、效率提升。最后放来源链接，这会比空泛形容词更容易建立可信度。

## FAQ

**${keyword}适合新手吗？** 适合，但新手要从低风险任务开始，例如资料整理、初稿生成、标题备选和检查清单。

**如何判断有没有效果？** 不看感觉，看指标。至少比较使用前后的${metric}，连续记录两到四周，再决定是否扩大使用范围。
`;
}

function visibleLength(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
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
    <meta name="keywords" content="${escapeHtml(keyword)}, AI, 人工智能, AI工具, 真实案例" />
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
        <small>约 ${item.length} 字 · 含真实数据和案例</small>
      </a>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI SEO 文章库 | 100 篇 AI 关键词真实案例文章</title>
    <meta name="description" content="100 篇 AI 主题 SEO 文章，覆盖 AI工具、AI写作、AI绘画、AI营销、AI编程、AI办公等长尾关键词，每篇包含真实数据、案例和来源。" />
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
        <h1>100 篇 AI 真实案例文章</h1>
        <p>每篇包含可核验数据、具体公司案例、落地步骤、风险边界和来源链接，不再是泛泛而谈的模板文。</p>
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
    const [keyword, audience, scene, benefit, kind] = topic;
    const title = titleFor(keyword, audience, scene);
    const slug = slugify(i);
    const file = `${slug}.md`;
    const html = `${slug}.html`;
    const content = buildArticle(topic, i);
    const ev = pickEvidence(kind);
    fs.writeFileSync(path.join(outDir, file), content, "utf8");

    return {
      id: i + 1,
      title,
      keyword,
      file: `articles/${file}`,
      html,
      length: visibleLength(content),
      source: ev.source,
      sourceUrl: ev.url,
      description: `围绕${keyword}，用真实数据和案例说明${audience}如何在${scene}中落地，避免空泛模板文。`,
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
    "本目录包含 100 篇 AI 主题 SEO 文章。每篇都包含真实数据、具体案例、落地步骤、风险边界和来源链接。",
    "",
    "| 序号 | 关键词 | 标题 | 来源 | 文件 | 字数估算 |",
    "| --- | --- | --- | --- | --- | --- |",
    ...jsonIndex.map(
      (item) =>
        `| ${item.id} | ${item.keyword} | ${item.title} | ${item.source} | ${item.file.replace("articles/", "")} | ${item.length} |`,
    ),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, "README.md"), readme, "utf8");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url><loc>https://ai-tools-navigation-chi.vercel.app/</loc></url>',
    '  <url><loc>https://ai-tools-navigation-chi.vercel.app/articles</loc></url>',
    ...jsonIndex.map((item) => `  <url><loc>https://ai-tools-navigation-chi.vercel.app/articles/${item.html.replace(".html", "")}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf8");

  const min = Math.min(...jsonIndex.map((item) => item.length));
  const max = Math.max(...jsonIndex.map((item) => item.length));
  const avg = Math.round(jsonIndex.reduce((sum, item) => sum + item.length, 0) / jsonIndex.length);
  console.log(`Generated ${jsonIndex.length} articles.`);
  console.log(`Length range: ${min}-${max}, average ${avg}.`);
}

run();
