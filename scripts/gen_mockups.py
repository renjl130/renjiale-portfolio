
from PIL import Image, ImageDraw, ImageFont
import os

# Match site palette
PAPER = (245, 245, 240)      # #f5f5f0
INK = (16, 18, 17)           # #101211
MUTED = (102, 106, 101)      # #666a65
LINE = (207, 208, 201)       # #cfd0c9
GREEN = (82, 112, 0)         # #527000
ORANGE = (255, 173, 105)     # #ffad69
WHITE = (255, 255, 255)

def get_font(size, bold=False):
    """Get a font that supports Chinese characters"""
    paths = [
        "C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf",
        "C:/Windows/Fonts/msyh.ttc",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                continue
    return ImageFont.load_default()


def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_ui_card(draw, x, y, w, h, title, items, accent_color, font_sm, font_md, font_lg):
    """Draw a UI card element"""
    draw_rounded_rect(draw, (x, y, x+w, y+h), 8, fill=WHITE, outline=LINE, width=1)
    # Accent bar at top
    draw.rectangle((x, y, x+w, y+4), fill=accent_color)
    # Title
    draw.text((x+16, y+16), title, fill=INK, font=font_md)
    # Items
    for i, item in enumerate(items):
        iy = y + 48 + i * 28
        # Checkbox
        draw.rectangle((x+16, iy+2, x+28, iy+14), outline=GREEN, width=1)
        draw.text((x+36, iy), item, fill=MUTED, font=font_sm)


def generate_kaoyan():
    """Generate AI考研规划助手 mockup"""
    W, H = 1600, 1000
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    font_xs = get_font(11)
    font_sm = get_font(13)
    font_md = get_font(16)
    font_lg = get_font(22, bold=True)
    font_xl = get_font(32, bold=True)
    font_title = get_font(48, bold=True)

    # Background grid pattern (subtle)
    for gx in range(0, W, 40):
        draw.line((gx, 0, gx, H), fill=(238, 238, 233), width=1)
    for gy in range(0, H, 40):
        draw.line((0, gy, W, gy), fill=(238, 238, 233), width=1)

    # Main dashboard frame
    margin = 60
    frame_x, frame_y = margin, margin
    frame_w, frame_h = W - margin*2, H - margin*2
    draw_rounded_rect(draw, (frame_x, frame_y, frame_x+frame_w, frame_y+frame_h), 12, fill=WHITE, outline=LINE, width=2)

    # Header bar
    draw.rectangle((frame_x, frame_y, frame_x+frame_w, frame_y+56), fill=INK)
    draw.text((frame_x+20, frame_y+16), "AI 考研规划助手", fill=PAPER, font=font_lg)
    # Traffic lights
    for i, c in enumerate([(255,95,87), (255,189,46), (39,201,63)]):
        draw.ellipse((frame_x+frame_w-120+i*22, frame_y+18, frame_x+frame_w-104+i*22, frame_y+34), fill=c)

    # Left sidebar - Knowledge Graph
    sx, sy = frame_x+16, frame_y+72
    sw, sh = 320, frame_h-88
    draw_rounded_rect(draw, (sx, sy, sx+sw, sy+sh), 8, fill=(250, 250, 247), outline=LINE)
    draw.text((sx+16, sy+16), "知识图谱 · 备考规划", fill=INK, font=font_md)
    
    # Subject tree
    subjects = [
        ("政治", ["马原", "毛概", "史纲", "思修"], GREEN),
        ("英语", ["阅读", "写作", "翻译", "完形"], (145, 184, 255)),
        ("数学", ["高数", "线代", "概率论"], ORANGE),
        ("专业课", ["数据结构", "操作系统", "计网"], (255, 159, 199)),
    ]
    for si, (subj, topics, color) in enumerate(subjects):
        sy2 = sy + 56 + si * 130
        draw.rectangle((sx+16, sy2, sx+sw-16, sy2+4), fill=color)
        draw.text((sx+16, sy2+14), subj, fill=INK, font=font_md)
        for ti, topic in enumerate(topics):
            ty = sy2 + 40 + ti * 22
            draw.ellipse((sx+24, ty+4, sx+32, ty+12), fill=color)
            draw.text((sx+40, ty), topic, fill=MUTED, font=font_xs)

    # Center - Study plan timeline
    cx, cy = sx + sw + 16, sy
    cw, ch = frame_w - sw - 48, sh
    draw_rounded_rect(draw, (cx, cy, cx+cw, cy+ch), 8, fill=WHITE, outline=LINE)
    draw.text((cx+16, cy+16), "AI 个性化学习路径", fill=INK, font=font_md)
    draw.text((cx+16, cy+44), "基于知识图谱与弱项分析，自动生成每日计划", fill=MUTED, font=font_xs)

    # Timeline rows
    days = [
        ("Day 1-3", "马原 · 唯物辩证法", "薄弱点强化", 85, GREEN),
        ("Day 4-6", "英语 · 阅读理解精读", "真题训练", 72, (145, 184, 255)),
        ("Day 7-9", "数学 · 高数·中值定理", "错题回顾", 68, ORANGE),
        ("Day 10-12", "专业课 · 数据结构·树", "框架梳理", 90, (255, 159, 199)),
        ("Day 13-15", "政治 · 毛概·新时代", "关键词记忆", 78, GREEN),
    ]
    for di, (day, topic, method, pct, color) in enumerate(days):
        dy = cy + 80 + di * 72
        draw_rounded_rect(draw, (cx+16, dy, cx+cw-16, dy+60), 6, fill=(250, 250, 247), outline=LINE)
        # Day label
        draw.rectangle((cx+24, dy+8, cx+100, dy+28), fill=color)
        draw.text((cx+30, dy+9), day, fill=WHITE, font=font_xs)
        # Topic
        draw.text((cx+112, dy+10), topic, fill=INK, font=font_sm)
        # Method tag
        draw.text((cx+112, dy+34), method, fill=MUTED, font=font_xs)
        # Progress bar
        bar_x = cx + cw - 200
        bar_w = 140
        draw.rectangle((bar_x, dy+18, bar_x+bar_w, dy+28), fill=LINE)
        draw.rectangle((bar_x, dy+18, bar_x+int(bar_w*pct/100), dy+28), fill=color)
        draw.text((bar_x+bar_w+8, dy+18), f"{pct}%", fill=color, font=font_xs)

    # Right side - AI analysis panel
    rx, ry = cx + cw - 240, cy + 80 + 5*72 + 16
    draw_rounded_rect(draw, (cx+16, ry, cx+cw-16, ry+100), 8, fill=(82, 112, 0, 20), outline=GREEN, width=1)
    draw.text((cx+32, ry+12), "AI 分析建议", fill=GREEN, font=font_md)
    draw.text((cx+32, ry+38), "数学中值定理正确率 68%，建议增加专项练习", fill=INK, font=font_xs)
    draw.text((cx+32, ry+56), "英语阅读速度提升明显，保持每日精读节奏", fill=INK, font=font_xs)
    draw.text((cx+32, ry+74), "政治记忆曲线良好，可适当减少复习频率", fill=INK, font=font_xs)

    img.save("C:/Users/jd-liverr/Documents/New project/renjiale-portfolio/public/projects/kaoyan-ai.png", "PNG")
    print("kaoyan-ai.png generated")


def generate_video_workbench():
    """Generate 本地AI视频工作台 mockup"""
    W, H = 1600, 1000
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    font_xs = get_font(11)
    font_sm = get_font(13)
    font_md = get_font(16)
    font_lg = get_font(22, bold=True)
    font_xl = get_font(32, bold=True)

    # Subtle grid
    for gx in range(0, W, 40):
        draw.line((gx, 0, gx, H), fill=(238, 238, 233), width=1)
    for gy in range(0, H, 40):
        draw.line((0, gy, W, gy), fill=(238, 238, 233), width=1)

    # Main frame
    margin = 60
    fx, fy = margin, margin
    fw, fh = W - margin*2, H - margin*2
    draw_rounded_rect(draw, (fx, fy, fx+fw, fy+fh), 12, fill=WHITE, outline=LINE, width=2)

    # Header
    draw.rectangle((fx, fy, fx+fw, fy+56), fill=INK)
    draw.text((fx+20, fy+16), "本地 AI 视频工作台", fill=PAPER, font=font_lg)
    draw.text((fx+fw-300, fy+20), "v1.0.0  ·  模型: CogVideoX", fill=(180, 180, 175), font=font_xs)
    for i, c in enumerate([(255,95,87), (255,189,46), (39,201,63)]):
        draw.ellipse((fx+fw-120+i*22, fy+18, fx+fw-104+i*22, fy+34), fill=c)

    # Left panel - Model capabilities
    lx, ly = fx+16, fy+72
    lw, lh = 280, fh-88
    draw_rounded_rect(draw, (lx, ly, lx+lw, ly+lh), 8, fill=(250, 250, 247), outline=LINE)
    draw.text((lx+16, ly+16), "模型能力", fill=INK, font=font_md)

    models = [
        ("CogVideoX", "文生视频", GREEN, "就绪"),
        ("AnimateDiff", "图生视频", (145, 184, 255), "就绪"),
        ("SVD-XT", "视频延伸", ORANGE, "忙碌"),
        ("VideoComposer", "风格迁移", (255, 159, 199), "离线"),
    ]
    for mi, (name, cap, color, status) in enumerate(models):
        my = ly + 52 + mi * 90
        draw_rounded_rect(draw, (lx+12, my, lx+lw-12, my+76), 6, fill=WHITE, outline=LINE)
        draw.rectangle((lx+12, my, lx+16, my+76), fill=color)
        draw.text((lx+28, my+12), name, fill=INK, font=font_md)
        draw.text((lx+28, my+36), cap, fill=MUTED, font=font_xs)
        # Status badge
        sc = GREEN if status == "就绪" else ORANGE if status == "忙碌" else MUTED
        draw_rounded_rect(draw, (lx+lw-72, my+12, lx+lw-20, my+30), 4, fill=sc)
        draw.text((lx+lw-64, my+13), status, fill=WHITE, font=font_xs)

    # Center - Task queue
    cx, cy = lx + lw + 16, ly
    cw, ch = fw - lw - 48, lh * 0.55
    draw_rounded_rect(draw, (cx, cy, cx+cw, cy+ch), 8, fill=WHITE, outline=LINE)
    draw.text((cx+16, cy+16), "任务队列", fill=INK, font=font_md)
    
    # Status indicator
    draw.ellipse((cx+cw-32, cy+18, cx+cw-20, cy+30), fill=GREEN)
    draw.text((cx+cw-80, cy+18), "运行中", fill=GREEN, font=font_xs)

    tasks = [
        ("#0042", "城市夜景延时", "CogVideoX", "生成中", "67%", ORANGE),
        ("#0041", "产品展示动画", "AnimateDiff", "排队中", "—", MUTED),
        ("#0040", "自然风光航拍", "CogVideoX", "完成", "100%", GREEN),
        ("#0039", "人物动作捕捉", "SVD-XT", "失败", "43%", (255, 95, 87)),
        ("#0038", "风格迁移测试", "VideoComposer", "完成", "100%", GREEN),
    ]
    for ti, (tid, name, model, status, pct, color) in enumerate(tasks):
        ty = cy + 52 + ti * 60
        draw_rounded_rect(draw, (cx+12, ty, cx+cw-12, ty+48), 6, fill=(250, 250, 247), outline=LINE)
        # Task ID
        draw.rectangle((cx+20, ty+8, cx+72, ty+28), fill=color)
        draw.text((cx+26, ty+9), tid, fill=WHITE, font=font_xs)
        # Name
        draw.text((cx+82, ty+10), name, fill=INK, font=font_sm)
        # Model
        draw.text((cx+82, ty+30), model, fill=MUTED, font=font_xs)
        # Status + progress
        draw.text((cx+cw-160, ty+10), status, fill=color, font=font_sm)
        if pct != "—":
            bar_x = cx+cw-100
            bar_w = 60
            draw.rectangle((bar_x, ty+14, bar_x+bar_w, ty+24), fill=LINE)
            draw.rectangle((bar_x, ty+14, bar_x+int(bar_w*int(pct.rstrip('%'))/100), ty+24), fill=color)
            draw.text((bar_x+bar_w+4, ty+13), pct, fill=color, font=font_xs)

    # Bottom panel - Parameters & Versioning
    bx, by = cx, cy + ch + 16
    bw, bh = cw, lh - ch - 16
    draw_rounded_rect(draw, (bx, by, bx+bw, by+bh), 8, fill=WHITE, outline=LINE)
    draw.text((bx+16, by+16), "参数版本管理", fill=INK, font=font_md)

    versions = [
        ("v3", "CogVideoX · 768×512 · 120帧 · CFG=6.0", GREEN, "最佳"),
        ("v2", "CogVideoX · 768×512 · 96帧 · CFG=7.5", MUTED, ""),
        ("v1", "CogVideoX · 512×384 · 64帧 · CFG=8.0", MUTED, ""),
    ]
    for vi, (ver, params, color, badge) in enumerate(versions):
        vy = by + 48 + vi * 36
        draw_rounded_rect(draw, (bx+12, vy, bx+bw-12, vy+28), 4, fill=(250, 250, 247) if color == MUTED else (232, 245, 233), outline=LINE if color == MUTED else GREEN)
        draw.text((bx+20, vy+6), ver, fill=color, font=font_sm)
        draw.text((bx+50, vy+6), params, fill=INK if color == GREEN else MUTED, font=font_xs)
        if badge:
            draw.text((bx+bw-60, vy+6), badge, fill=GREEN, font=font_xs)

    img.save("C:/Users/jd-liverr/Documents/New project/renjiale-portfolio/public/projects/local-ai-video.png", "PNG")
    print("local-ai-video.png generated")


generate_kaoyan()
generate_video_workbench()
