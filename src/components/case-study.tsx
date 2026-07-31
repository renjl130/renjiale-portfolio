"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  MotionImage,
  motionEase,
  staggerChildren,
  viewportOnce,
} from "@/components/motion-system";

interface Props {
  project: Project;
  allProjects: Project[];
}

export function CaseStudyPage({ project, allProjects }: Props) {
  const reduceMotion = useReducedMotion();
  const idx = allProjects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;
  const imageClassName = "cs-image" + (project.imageOrientation === "portrait" ? " cs-image-portrait" : "");

  return (
    <main className="cs">
      <motion.header
        className="cs-header"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: motionEase }}
      >
        <motion.div whileHover={reduceMotion ? undefined : { x: -4 }} transition={{ duration: 0.25, ease: motionEase }}>
          <Link href="/" className="cs-back"><ArrowLeft size={16} />返回首页</Link>
        </motion.div>
        <span className="cs-label">CASE STUDY</span>
      </motion.header>

      <motion.section className="cs-hero" initial="hidden" animate="visible" variants={staggerChildren}>
        <motion.span className="cs-num" variants={fadeUp}>{project.number}</motion.span>
        <motion.h1 variants={fadeUp}>{project.title}</motion.h1>
        <motion.p className="cs-sub" variants={fadeUp}>{project.subtitle}</motion.p>
        <motion.div className="cs-meta" variants={fadeUp}><span>{project.category}</span><span>{project.period}</span></motion.div>
        <motion.div className="cs-tags" variants={staggerChildren}>{project.tags.map((t) => <motion.span variants={fadeUp} key={t}>{t}</motion.span>)}</motion.div>
        <motion.div className="cs-facts" variants={staggerChildren}>{project.facts.map((f) => <motion.span variants={fadeUp} key={f}><Check size={14}/>{f}</motion.span>)}</motion.div>
        <motion.div className="cs-project-links" aria-label={project.title + " 项目链接"} variants={fadeUp}>
          {project.links?.map((link) => (
            <motion.a key={link.href} href={link.href} target="_blank" rel="noreferrer" whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
              {link.kind === "github" ? <Github /> : <ExternalLink />}{link.label}<ArrowRight />
            </motion.a>
          )) ?? <span>源码未公开</span>}
        </motion.div>
      </motion.section>

      {project.image ? (
        <motion.div
          className={imageClassName}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: motionEase }}
        >
          <MotionImage
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes={project.imageOrientation === "portrait" ? "(max-width: 720px) 92vw, 420px" : "(max-width: 1100px) 93vw, 1040px"}
            priority
          />
        </motion.div>
      ) : (
        <motion.div className="cs-image cs-image-status" aria-label="项目视觉材料状态" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: motionEase }}>
          <span>VISUAL RECORD</span>
          <strong>授权脱敏截图待补充</strong>
          <p>这是岗位实践项目。为保护公司信息与未公开功能，不展示未经授权的内部产品界面。</p>
        </motion.div>
      )}

      {project.screenshots?.length ? (
        <motion.section className="cs-gallery" aria-label={project.title + " 真实界面记录"} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
          <motion.div className="cs-gallery-heading" variants={fadeUp}>
            <span>REAL INTERFACE RECORD</span>
            <h2>真实界面记录</h2>
          </motion.div>
          <motion.div className="cs-gallery-grid" variants={staggerChildren}>
            {project.screenshots.map((screenshot) => (
              <motion.figure className={"cs-gallery-shot cs-gallery-shot-" + (screenshot.orientation ?? "landscape")} key={screenshot.src} variants={fadeUp}>
                <div className="cs-gallery-image">
                  <MotionImage src={screenshot.src} alt={screenshot.alt} fill sizes={screenshot.orientation === "portrait" ? "(max-width: 720px) 92vw, 330px" : "(max-width: 720px) 92vw, 510px"} />
                </div>
                <figcaption>{screenshot.caption}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </motion.section>
      ) : null}

      <motion.section className="cs-sec" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        <motion.h2 variants={fadeLeft}>问题与背景</motion.h2>
        <motion.div className="cs-sec-body" variants={fadeRight}>
          <p className="cs-problem">{project.caseStudy.problem}</p>
          <p className="cs-ctx">{project.caseStudy.context}</p>
        </motion.div>
      </motion.section>

      <motion.section className="cs-sec" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        <motion.h2 variants={fadeLeft}>产品方法</motion.h2>
        <motion.div className="cs-sec-body" variants={fadeRight}>
          <motion.ol className="cs-steps" variants={staggerChildren}>{project.caseStudy.approach.map((s, i) => <motion.li variants={fadeUp} key={i}>{s}</motion.li>)}</motion.ol>
        </motion.div>
      </motion.section>

      <motion.section className="cs-sec" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        <motion.h2 variants={fadeLeft}>关键决策</motion.h2>
        <motion.div className="cs-sec-body cs-grid" variants={staggerChildren}>
          {project.caseStudy.decisions.map((d) => (
            <motion.article key={d.title} className="cs-card" variants={fadeUp} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: 0.25, ease: motionEase }}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="cs-sec" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        <motion.h2 variants={fadeLeft}>成果</motion.h2>
        <motion.div className="cs-sec-body" variants={fadeRight}>
          <motion.ul className="cs-results" variants={staggerChildren}>{project.caseStudy.outcomes.map((o) => <motion.li variants={fadeUp} key={o}>{o}</motion.li>)}</motion.ul>
        </motion.div>
      </motion.section>

      <motion.nav className="cs-nav" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerChildren}>
        {prev ? (
          <motion.div variants={fadeLeft} whileHover={reduceMotion ? undefined : { x: -5 }} transition={{ duration: 0.25, ease: motionEase }}>
            <Link href={`/work/${prev.slug}`} className="cs-nav-link"><ArrowLeft size={16}/><div><span>上一个项目</span><strong>{prev.title}</strong></div></Link>
          </motion.div>
        ) : <div/>}
        {next ? (
          <motion.div variants={fadeRight} whileHover={reduceMotion ? undefined : { x: 5 }} transition={{ duration: 0.25, ease: motionEase }}>
            <Link href={`/work/${next.slug}`} className="cs-nav-link cs-nav-r"><div><span>下一个项目</span><strong>{next.title}</strong></div><ArrowRight size={16}/></Link>
          </motion.div>
        ) : <div/>}
      </motion.nav>
    </main>
  );
}