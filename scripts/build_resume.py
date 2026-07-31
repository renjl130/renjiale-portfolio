from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "RenJiale-Resume.pdf"
FONT = Path("C:/Windows/Fonts/msyh.ttc")
FONT_BOLD = Path("C:/Windows/Fonts/msyhbd.ttc")

pdfmetrics.registerFont(TTFont("MicrosoftYaHei", str(FONT), subfontIndex=0))
pdfmetrics.registerFont(TTFont("MicrosoftYaHeiBold", str(FONT_BOLD), subfontIndex=0))

INK = HexColor("#111311")
MUTED = HexColor("#5D625D")
ACID = HexColor("#D8FF3E")
LINE = HexColor("#CED1C9")


def style(name, size, leading=None, bold=False, color=INK, **kwargs):
    return ParagraphStyle(
        name,
        fontName="MicrosoftYaHeiBold" if bold else "MicrosoftYaHei",
        fontSize=size,
        leading=leading or size * 1.5,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
        **kwargs,
    )


body = style("body", 8.2, 12.2)
small = style("small", 7.2, 10.5, color=MUTED)
label = style("label", 7.4, 10, bold=True)
role = style("role", 9.2, 12, bold=True)
section = style("section", 10.2, 13, bold=True)


def entry(period, title, position, copy):
    return Table(
        [[Paragraph(period, small), Paragraph(f"<b>{title}</b><br/><font color='#527000'>{position}</font><br/>{copy}", body)]],
        colWidths=[31 * mm, 143 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 2.2 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
            ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
        ]),
    )


def section_heading(text):
    return Table(
        [[Paragraph(text, section), ""]],
        colWidths=[42 * mm, 132 * mm],
        style=TableStyle([
            ("BACKGROUND", (0, 0), (0, 0), ACID),
            ("LINEBELOW", (1, 0), (1, 0), 0.7, INK),
            ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.2 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
        ]),
    )


doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=14 * mm,
    bottomMargin=13 * mm,
    title="任佳乐个人简历",
    author="任佳乐",
)

story = [
    Table(
        [[Paragraph("任佳乐", style("name", 25, 29, bold=True)), Paragraph("AI 产品经理 / AI PRODUCT BUILDER", style("title", 11, 15, bold=True))],
         [Paragraph("西安外国语大学 · 网络与新媒体 · 本科", small), Paragraph("17691130265　2685257219@qq.com", small)]],
        colWidths=[91 * mm, 83 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
            ("ALIGN", (1, 0), (1, -1), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("LINEBELOW", (0, -1), (-1, -1), 1.4, INK),
        ]),
    ),
    Spacer(1, 4 * mm),
    Paragraph("聚焦 Agent、AI 内容生产与复杂服务产品，能够从用户问题、产品定义和工作流设计推进到可交互原型与工程验证。", style("summary", 9.2, 14)),
    Spacer(1, 4 * mm),
    section_heading("实习与工作经历"),
    entry("2026.01 — 至今", "西安奇点能源股份有限公司", "品牌宣传专员 · AI 数字化方向", "参与储能品牌市场策略、行业展会与新媒体矩阵建设；重点推进数字人模型、AI 视频生成与 Agent 工作流在内容生产中的落地。"),
    entry("2025.09 — 2026.01", "艺藤新创（西安）科技有限公司", "AI 产品经理", "定义 AI 漫剧生产流程与能力边界，推动剧本生成、分镜拆解、提示词转换的 Multi-Agent 工作流；协同 SFT / DPO、RAG 与长记忆方案，减少内容抽卡并提升长篇一致性。"),
    entry("2025.05 — 2025.11", "影像与国际传播项目", "摄影摄像 · 内容策划", "在杭州八万春影业与西安外国语大学国际传播中心完成脚本、拍摄、素材管理和多语种协作，形成对内容生产一线流程的完整理解。"),
    entry("2025.08 — 2025.09", "西安硕歌文化传媒有限公司", "新媒体运营", "负责甲方 YouTube 矩阵的选题、素材制作、发布排期与效果追踪。"),
    Spacer(1, 4 * mm),
    section_heading("代表项目"),
    entry("产品 / 原型", "西安家教通", "AI 匹配双边服务平台", "完成用户画像、PRD、信息架构与双端交互原型；设计规则 + AI 混合匹配，将距离、时间、预算和认证风险转化为可解释推荐。"),
    entry("Agent / PoC", "DriveMind AI", "主动式智能座舱 Agent", "设计“感知—规划—执行—记忆”闭环，将摄像头状态、车辆遥测与对话上下文编排为主动事件，并明确隐私、降级和量产边界。"),
    entry("产品 / AI", "AI 考研规划助手", "个性化备考系统", "完成用户调研与需求定义，设计知识图谱驱动的学习路径生成、AI 弱项分析与自适应练习推荐；明确 AI 辅助边界，核心知识掌握与复习节奏由用户控制，AI 负责信息压缩与个性化建议。"),
    entry("工作流 / 概念", "本地 AI 视频工作台", "模型与生成任务管理", "统一模型能力、生成任务、素材版本与失败重试，重点解决长任务不可见、参数难复用和产物难追溯。"),
    Spacer(1, 4 * mm),
    section_heading("能力与经历"),
    Table(
        [[Paragraph("产品", label), Paragraph("用户研究 · PRD · 信息架构 · 原型 · 路线图 · 风险边界", body)],
         [Paragraph("AI", label), Paragraph("Agent 工作流 · RAG · 长记忆 · SFT / DPO 协同 · 模型评测", body)],
         [Paragraph("构建", label), Paragraph("Next.js / React · Python · LangGraph / LangChain · 快速原型", body)],
         [Paragraph("校园与奖项", label), Paragraph("大广赛省级二等奖 · 漾工作室社长 · 模拟联合国技术总监", body)]],
        colWidths=[31 * mm, 143 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.4 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4 * mm),
        ]),
    ),
]

doc.build(story)
print(OUTPUT)
