# 快速续作摘要

这是任佳乐的 AI 产品经理个人网站，目录为 renjiale-portfolio。运行 `npm run dev` 启动。

## 当前版本

第四版：首页展示 7 个案例，并通过“职业实践 / 可运行工程 / 产品原型”筛选器明确区分证据类型。新增艺藤新创的 AI 漫剧内容工作流和奇点能源的 AI 内容生产协同台；每个项目都有独立案例详情页。

## 关键文件

- src/data/projects.ts — 所有项目数据集中管理
- src/components/portfolio.tsx — 首页组件（从 data/projects.ts 导入数据）
- src/components/case-study.tsx — 案例详情页组件
- src/app/work/[slug]/page.tsx — 案例页路由
- src/app/globals.css — 全局样式 + 案例页样式
- src/app/layout.tsx — 根布局（主题配置已修复为 light）
- public/RenJiale-Resume.pdf — 与网站同步的一页版简历（已含考研系统）
- scripts/build_resume.py — PDF 简历生成脚本
- scripts/gen_mockups.py — 项目展示图生成脚本
- scripts/gen_work_images.py — 职业实践工作流展示图生成脚本

## 规则

- 艺藤新创职位必须始终显示为"AI 产品经理"
- 不得虚构用户量、营收、转化率和效率百分比
- 本地 AI 视频工作台使用程序化生成的 UI 展示图（local-ai-video.png）
- 考研系统使用程序化生成的 UI 展示图（kaoyan-ai.png）
- AI 漫剧内容工作流和 AI 内容生产协同台使用程序化工作流图，不作为线上产品截图
- 首页项目分类与案例页均从 src/data/projects.ts 读取；修改项目内容时只改这一份数据
- 项目链接同样维护在 src/data/projects.ts；仅添加可核验的公开 GitHub 或线上地址
- 修改内容后运行 npm run build 验证，运行 scripts/build_resume.py 重新生成简历

## 续作入口

每次开始先读 PROJECT_CONTEXT.md → PROJECT_PROGRESS.md → DECISIONS.md。
