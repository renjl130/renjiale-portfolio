"use client";


import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  ClipboardCheck,
  Download,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import {
  AnimatedMetric,
  fadeLeft,
  fadeRight,
  fadeUp,
  MotionImage,
  motionEase,
  staggerChildren,
  viewportOnce,
} from "@/components/motion-system";

const experience = [
  {
    period: "2026.01 — 至今",
    company: "西安奇点能源股份有限公司",
    role: "品牌宣传专员实习生",
    copy: "负责储能品牌内容、活动与展会传播支持；从 0 到 1 搭建百度数字人栏目，将单条视频制作周期由约 1 天缩短至约 3 小时，并带来 5 次以上潜在客户咨询。",
  },
  {
    period: "2025.09 — 2026.01",
    company: "艺藤新创（西安）科技有限公司",
    role: "AI 产品实习生 · 大模型应用",
    copy: "梳理文件解析、任务拆解、内容生成、Prompt 管理与结果审核流程，参与前后端、API、数据处理及 LangChain / LangGraph 工作流建设，把分散操作整合为本地生成式 AI 工作流。",
  },
  {
    period: "2025.08 — 2025.09",
    company: "西安硕歌文化传媒有限公司",
    role: "海外新媒体运营实习生",
    copy: "运营 6 个 YouTube 账号，周均发布约 60 条内容；推动单个账号单月从 0 增长至 1 万粉丝，并独立开发 15 语种 SRT 批量翻译工具。",
  },
  {
    period: "2025.05 — 2025.08",
    company: "杭州八万春影业传媒有限公司",
    role: "摄影 / 摄像实习生",
    copy: "月均驻组 15—20 天，担任 B / C 机摄影，参与 3—5 部已上线短剧，负责分镜执行、稳定器操作、机位调度、构图跟焦与现场素材交接。",
  },
  {
    period: "2024.11 — 2025.11",
    company: "西安外国语大学国际传播中心",
    role: "国际传播内容制作 · 校内项目",
    copy: "参与海外选题、脚本、资源协调、摄影摄像、多语种校对与素材归档，完成 5 个对外传播视频，并根据留学生、外籍教师与海外受众反馈优化表达。",
  },
];

const methods = [
  { id: "01", title: "理解问题", copy: "通过访谈、数据和一线观察理解真实需求，先弄清楚为什么做。", icon: Search },
  { id: "02", title: "组织方案", copy: "把复杂任务拆成清晰路径，协调产品、内容、技术与传播资源。", icon: Layers3 },
  { id: "03", title: "动手落地", copy: "能写方案，也能做原型、写代码、拍视频，把想法推进到可用结果。", icon: Camera },
  { id: "04", title: "复盘沉淀", copy: "用数据、反馈和文档完成验收，让一次实践变成可继续迭代的资产。", icon: ClipboardCheck },
];

const capabilities = [
  { label: "产品与 AI", title: "从需求到可运行产品", copy: "用户访谈、需求分析、产品规划、信息架构、AI 编程、Agent 工作流与产品验收。" },
  { label: "内容与增长", title: "从选题到数据复盘", copy: "账号矩阵、内容策划、发布排期、用户反馈、YouTube 运营与海外平台增长。" },
  { label: "品牌与影像", title: "从现场到传播内容", copy: "品牌栏目、数字人、摄影摄像、剪辑包装、活动展会与中英文内容制作。" },
  { label: "组织与交付", title: "从多人协作到按期完成", copy: "曾统筹约 120 人融媒体团队，负责招新培训、任务分工、项目管理与成果验收。" },
];

const filters: Array<"全部" | ProjectCategory> = ["全部", "职业实践", "可运行工程", "产品原型"];
const navItems = [
  { id: "about", label: "关于" },
  { id: "work", label: "项目" },
  { id: "experience", label: "经历" },
];

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"全部" | ProjectCategory>("全部");
  const [activeSection, setActiveSection] = useState("top");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: experienceScroll } = useScroll({
    target: experienceRef,
    offset: ["start 75%", "end 75%"],
  });
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, reduceMotion ? 0 : -64]);
  const heroTitleOpacity = useTransform(heroScroll, [0, 0.88], [1, reduceMotion ? 1 : 0.48]);

  const visibleProjects = useMemo(
    () => selectedFilter === "全部" ? projects : projects.filter((project) => project.category === selectedFilter),
    [selectedFilter],
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const sections = ["top", "about", "work", "approach", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-38% 0px -50%", threshold: [0.01, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("2685257219@qq.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:2685257219@qq.com";
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <motion.a className="wordmark" href="#top" aria-label="返回首页" initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: motionEase }} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}>RJ<span>.</span></motion.a>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.id} href={"#" + item.id} aria-current={activeSection === item.id ? "page" : undefined}>{item.label}</a>
          ))}
        </nav>
        <motion.a className="header-contact" href="#contact" whileHover={reduceMotion ? undefined : { scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>联系我 <ArrowDownRight /></motion.a>
        <motion.button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="打开导航" whileTap={reduceMotion ? undefined : { scale: 0.9 }}><Menu /></motion.button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="移动端导航"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: motionEase }}
          >
            <div className="mobile-menu-head"><span>任佳乐</span><motion.button onClick={closeMenu} aria-label="关闭导航" whileTap={reduceMotion ? undefined : { scale: 0.9, rotate: 4 }}><X /></motion.button></div>
            <motion.nav variants={staggerChildren} initial="hidden" animate="visible">
              {[...navItems, { id: "contact", label: "联系" }].map((item) => <motion.a variants={fadeUp} onClick={closeMenu} href={"#" + item.id} key={item.id}>{item.label}</motion.a>)}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-intro" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: motionEase }}>
          <p>任佳乐 / 个人作品集</p>
          <span>西安 · 2027 届本科生</span>
        </motion.div>
        <motion.h1 style={{ y: heroTitleY, opacity: heroTitleOpacity }}>
          <motion.strong initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: motionEase }}>任佳乐</motion.strong><br/>
          <motion.span initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease: motionEase }}>把想法做成<br/>产品、内容与作品。</motion.span>
        </motion.h1>
        <motion.div className="hero-foot" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: motionEase }}>
          <p>西安外国语大学网络与新媒体本科生。我在产品、内容、品牌、海外传播与影像制作之间工作，习惯从真实问题出发，把方案推进到可以运行、发布或交付。</p>
          <motion.a href="#about" aria-label="了解任佳乐" whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }}><ArrowDownRight /><span>继续了解我</span></motion.a>
        </motion.div>
      </section>

      <motion.section className="proof-strip" aria-label="作品集概览" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        <motion.div variants={fadeUp}><AnimatedMetric value={7} pad={2} suffix="个项目案例" /></motion.div>
        <motion.div variants={fadeUp}><AnimatedMetric value={6} pad={2} suffix="个海外账号" /></motion.div>
        <motion.div variants={fadeUp}><AnimatedMetric value={15} suffix="语种工具" /></motion.div>
        <motion.div variants={fadeUp}><AnimatedMetric value={120} suffix="人团队统筹" /></motion.div>
      </motion.section>
      <section className="about section-shell" id="about">
        <motion.div className="section-heading about-heading" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
          <motion.p variants={fadeLeft}>ABOUT / 任佳乐</motion.p>
          <motion.div variants={fadeRight}>
            <h2>我不想用一个岗位名，<br/>框住自己。</h2>
            <p className="about-lede">我喜欢进入真实现场：和用户聊需求，在电脑前做产品，在片场扛机器，也在团队里把一百多人的协作安排清楚。不同经历最终指向同一件事——理解问题，并把它做完。</p>
          </motion.div>
        </motion.div>
        <motion.div className="capability-grid" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
          {capabilities.map((item, index) => (
            <motion.article key={item.label} variants={fadeUp} whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ duration: 0.25, ease: motionEase }}>
              <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
      <motion.section
        className="work section-shell"
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="section-heading section-heading-work" variants={staggerChildren}>
          <motion.p variants={fadeLeft}>SELECTED WORK / 2025—2026</motion.p>
          <motion.div variants={fadeRight}>
            <h2>这是我真正做过、<br/>并持续推进的项目。</h2>
            <p className="section-lede">项目是我的一部分，不是我的全部。这里保留产品、工程与职业实践案例，用真实界面、代码、文档和结果说明我如何把事情推进下去。</p>
          </motion.div>
        </motion.div>
        <motion.div className="work-controls" aria-label="项目筛选" variants={fadeUp}>
          <div className="filter-tabs" role="tablist" aria-label="项目类别">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                role="tab"
                aria-selected={selectedFilter === filter}
                className={selectedFilter === filter ? "is-active" : ""}
                onClick={() => setSelectedFilter(filter)}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                transition={{ duration: 0.15, ease: motionEase }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          <p aria-live="polite">显示 <strong>{visibleProjects.length}</strong> / {projects.length} 个案例</p>
        </motion.div>
        <motion.div className="project-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                className={"project-card project-" + project.tone}
                key={project.slug}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2), ease: motionEase }}
              >
                <Link href={"/work/" + project.slug} className="project-card-link" aria-label={"查看" + project.title + "案例详情"}>
                  {project.image ? (
                    <div className="project-image">
                      <MotionImage
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 42vw"
                      />
                    </div>
                  ) : (
                    <div className="project-image project-image-status" aria-label="项目视觉材料状态">
                      <span>VISUAL RECORD</span>
                      <strong>授权脱敏截图待补充</strong>
                      <p>岗位实践项目，不展示未授权的内部产品界面。</p>
                    </div>
                  )}
                  <div className="project-card-copy">
                    <div className="project-meta"><span>{project.number}</span><span>{project.category}</span><span>{project.period}</span></div>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-description">{project.description}</p>
                    <ul>{project.facts.slice(0, 2).map((fact) => <li key={fact}><Check />{fact}</li>)}</ul>
                    <div className="project-card-bottom"><div className="tag-row">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-open">查看案例 <ArrowUpRight /></span></div>
                  </div>
                </Link>
                <div className="project-external-links" aria-label={project.title + " 项目链接"}>
                  {project.links?.map((link) => (
                    <motion.a key={link.href} href={link.href} target="_blank" rel="noreferrer" whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
                      {link.kind === "github" ? <Github /> : <ExternalLink />}{link.label}<ArrowUpRight />
                    </motion.a>
                  )) ?? <span>源码未公开</span>}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      <section className="approach" id="approach">
        <div className="section-shell">
          <motion.div className="section-heading light" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
            <motion.p variants={fadeLeft}>HOW I WORK</motion.p>
            <motion.h2 variants={fadeRight}>面对陌生问题，<br/>我会这样推进。</motion.h2>
          </motion.div>
          <motion.div className="method-list" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <motion.article key={method.id} variants={fadeUp} whileHover={reduceMotion ? undefined : { x: 6 }} transition={{ duration: 0.25, ease: motionEase }}>
                  <span>{method.id}</span><h3>{method.title}</h3><p>{method.copy}</p><Icon />
                </motion.article>
              );
            })}
          </motion.div>
          <motion.blockquote initial={reduceMotion ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: motionEase }}>
            “比起给自己贴标签，<br/>我更愿意用完成的事情介绍自己。”
          </motion.blockquote>
        </div>
      </section>

      <motion.section className="experience section-shell" id="experience" ref={experienceRef} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div className="section-heading" variants={staggerChildren}>
          <motion.p variants={fadeLeft}>EXPERIENCE</motion.p>
          <motion.h2 variants={fadeRight}>每段经历，<br/>都让我多一种解决问题的方法。</motion.h2>
        </motion.div>
        <motion.div className="timeline" variants={staggerChildren}>
          <motion.div className="timeline-progress" style={{ scaleY: reduceMotion ? 1 : experienceScroll }} aria-hidden="true" />
          {experience.map((item) => (
            <motion.article key={item.company} variants={fadeUp}>
              <time>{item.period}</time><div><h3>{item.company}</h3><h4>{item.role}</h4></div><p>{item.copy}</p>
            </motion.article>
          ))}
        </motion.div>
        <motion.div className="education" variants={fadeUp} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.25, ease: motionEase }}>
          <span>EDUCATION & CAMPUS</span><strong>西安外国语大学</strong><p>网络与新媒体本科 · 2023.09—2027.06</p><small>大广赛省级二等奖 / 漾工作室社长兼团支书 / 模拟联合国技术总监 / XISU 视频工作室技术部</small>
        </motion.div>
      </motion.section>

      <motion.section className="contact" id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={staggerChildren}>
        <motion.div className="contact-top" variants={fadeUp}><p>想聊一个岗位、项目或合作？</p><ArrowUpRight /></motion.div>
        <motion.h2 variants={fadeUp}>认识一下，<br/><em>看看能一起<br/>做什么。</em></motion.h2>
        <motion.div className="contact-content" variants={staggerChildren}>
          <motion.div className="contact-actions" variants={fadeLeft}>
            <motion.button onClick={copyEmail} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}>{copied ? <Check /> : <Mail />}{copied ? "邮箱已复制" : "2685257219@qq.com"}</motion.button>
            <motion.a href="tel:+8613201634405" aria-label="拨打电话 13201634405" whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}><Phone />13201634405</motion.a>
            <motion.a href="tel:+8617691130265" aria-label="拨打电话 17691130265" whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}><Phone />17691130265</motion.a>
            <motion.a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/RenJiale-Resume.docx`} download whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}><Download />下载综合简历</motion.a>
          </motion.div>
          <motion.aside className="contact-qr" aria-label="任佳乐微信二维码" variants={fadeRight} whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }} transition={{ duration: 0.25, ease: motionEase }}>
            <MotionImage src="/wechat-qr.jpg" alt="任佳乐微信二维码" width={180} height={180} unoptimized />
            <span>微信扫码联系</span>
          </motion.aside>
        </motion.div>
        <motion.footer variants={fadeUp}><span>任佳乐 · 产品 / 内容 / 品牌 / 影像</span><span>© 2026 PERSONAL PORTFOLIO</span><a href="#top">回到顶部 <ChevronRight /></a></motion.footer>
      </motion.section>
    </main>
  );
}
