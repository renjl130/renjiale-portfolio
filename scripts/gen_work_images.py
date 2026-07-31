from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
OUT = Path(r"C:\Users\jd-liverr\Documents\New project\renjiale-portfolio\public\projects")
PAPER, INK, MUTED, LINE, WHITE = (245,245,240), (16,18,17), (102,106,101), (207,208,201), (255,255,255)
LIME, BLUE, ORANGE, PINK = (216,255,62), (145,184,255), (255,173,105), (255,159,199)
def font(size, bold=False): return ImageFont.truetype("C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc", size)
def card(draw,x,y,w,h,title,accent,items):
    draw.rounded_rectangle((x,y,x+w,y+h),radius=10,fill=WHITE,outline=LINE,width=2)
    draw.rectangle((x,y,x+w,y+6),fill=accent)
    draw.text((x+22,y+24),title,fill=INK,font=font(22,True))
    for i,item in enumerate(items):
        iy=y+76+i*38
        draw.ellipse((x+23,iy+4,x+33,iy+14),fill=accent)
        draw.text((x+47,iy),item,fill=MUTED,font=font(16))
def base(title,meta):
    image=Image.new("RGB",(1600,1000),PAPER); draw=ImageDraw.Draw(image)
    for x in range(0,1600,40): draw.line((x,0,x,1000),fill=(235,235,230))
    for y in range(0,1000,40): draw.line((0,y,1600,y),fill=(235,235,230))
    draw.rounded_rectangle((60,60,1540,940),radius=16,fill=WHITE,outline=LINE,width=2)
    draw.rectangle((60,60,1540,122),fill=INK)
    draw.text((84,78),title,fill=PAPER,font=font(23,True)); draw.text((1130,82),meta,fill=(190,190,184),font=font(14))
    return image,draw
def comic():
    image,draw=base("漫剧内容生产工作流","Workspace / Episode 008")
    draw.text((94,158),"故事上下文",fill=INK,font=font(18,True))
    card(draw,84,196,302,245,"世界观资料库",LIME,["角色设定：林雾","主线冲突：北港事件","已检索 12 条可用片段"])
    card(draw,84,468,302,245,"长记忆状态",BLUE,["上一集结尾已同步","人物关系已校验","冲突设定：0 条"])
    draw.text((456,158),"协作节点",fill=INK,font=font(18,True))
    for x,y,no,label,color in [(456,196,"01","剧本规划",LIME),(456,350,"02","分镜拆解",BLUE),(456,504,"03","提示词转换",ORANGE),(456,658,"04","人工复核",PINK)]:
        draw.rounded_rectangle((x,y,x+350,y+116),radius=10,fill=(251,251,247),outline=LINE,width=2); draw.rectangle((x,y,x+12,y+116),fill=color)
        draw.text((x+34,y+24),no,fill=MUTED,font=font(14)); draw.text((x+34,y+52),label,fill=INK,font=font(23,True)); draw.text((x+220,y+58),"已完成",fill=MUTED,font=font(14))
    for y in (312,466,620): draw.line((631,y,631,y+38),fill=INK,width=3); draw.polygon([(622,y+28),(640,y+28),(631,y+42)],fill=INK)
    draw.text((892,158),"本集输出",fill=INK,font=font(18,True))
    card(draw,882,196,572,342,"分镜检查",ORANGE,["24 个镜头已生成","4 处角色状态待确认","提示词版本：v2.4","结构化输出可导出"])
    draw.rounded_rectangle((882,568,1454,830),radius=10,fill=INK); draw.text((910,596),"一致性检查",fill=PAPER,font=font(20,True))
    for i,(label,status,color) in enumerate([("角色身份","通过",LIME),("地点连续性","通过",LIME),("人物动机","待复核",ORANGE)]):
        y=648+i*52; draw.text((912,y),label,fill=(195,196,190),font=font(16)); draw.rounded_rectangle((1290,y-7,1418,y+24),radius=5,fill=color); draw.text((1310,y-3),status,fill=INK,font=font(14,True))
    image.save(OUT/"ai-comic-agent.png","PNG")
def ops():
    image,draw=base("AI 内容生产协同台","CONTENT OPS / JULY")
    draw.rounded_rectangle((88,158,506,830),radius=10,fill=(251,251,247),outline=LINE,width=2); draw.text((116,188),"内容任务",fill=INK,font=font(20,True))
    for i,(name,kind,color,state) in enumerate([("海外展会预热视频","AI 视频",ORANGE,"制作中"),("储能站项目采访","现场素材",BLUE,"待编排"),("数字人产品讲解","数字人",PINK,"待复核"),("官网案例更新","图文",LIME,"已发布")]):
        y=244+i*128; draw.rounded_rectangle((110,y,482,y+104),radius=8,fill=WHITE,outline=LINE); draw.rectangle((110,y,120,y+104),fill=color); draw.text((142,y+20),name,fill=INK,font=font(18,True)); draw.text((142,y+55),kind,fill=MUTED,font=font(15)); draw.text((392,y+55),state,fill=MUTED,font=font(14))
    draw.text((574,188),"工作流状态",fill=INK,font=font(20,True))
    for label,x,color in [("Brief",596,LIME),("素材",782,BLUE),("生成",968,ORANGE),("审核",1154,PINK),("归档",1340,LIME)]: draw.ellipse((x,262,x+92,354),fill=color,outline=INK,width=2); draw.text((x+20,296),label,fill=INK,font=font(16,True))
    for x in (696,882,1068,1254): draw.line((x,307,x+70,307),fill=INK,width=3); draw.polygon([(x+60,298),(x+60,316),(x+74,307)],fill=INK)
    card(draw,574,422,386,288,"素材资产",BLUE,["场景素材：48 条","已标注可复用片段","多语种校对待处理"]); card(draw,986,422,442,288,"内容规则",ORANGE,["品牌口径已同步","发布渠道：官网 / 社媒","人工审核节点：2 个"])
    draw.rounded_rectangle((574,746,1428,830),radius=10,fill=INK); draw.text((606,772),"目标不是增加生成数量，而是让内容、素材与审校状态能够被团队接力。",fill=PAPER,font=font(20,True))
    image.save(OUT/"ai-content-ops.png","PNG")
if __name__ == "__main__": OUT.mkdir(parents=True,exist_ok=True); comic(); ops()
