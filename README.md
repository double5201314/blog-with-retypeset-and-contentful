# 多模态数据处理实验室 · 官网（LMDP）

合肥师范学院计算机与人工智能学院 · 多模态数据处理实验室官方网站。

纯静态站点（HTML + CSS + 原生 JS），零依赖、零构建，可直接部署到 EdgeOne Pages。

## 本地预览

直接双击 `index.html` 即可查看。更接近线上的方式：

```bash
cd lab-site
python -m http.server 8000
# 打开 http://localhost:8000
```

## 页面结构

```
lab-site/
├── index.html            首页（通栏轮播 → 实验室介绍 → 科学研究 → 新闻和学术活动 → 更多内容）
├── about.html            实验室概况（简介、团队构成、方向总览、实验条件、培养方式）
├── research.html         研究方向（五个方向详细说明 + 开源与资料）
├── members.html          团队成员（教师 3 人 / 研究生 4 人 / 合作团队）
├── publications.html     论文成果（按年份筛选，含 TMM 2026 的 SMART）
├── news.html             新闻动态（按分类筛选 + 会议现场照片 + 例行活动）
├── join.html             加入我们（招生对象、基础要求、申请流程、常见问题）
├── guide.html            入组须知（组会制度、资源、管理、论文规范等 12 节）
├── contact.html          联系我们（地址、邮箱、来访指引）
├── 404.html              错误页
├── robots.txt / sitemap.xml
└── assets/
    ├── css/style.css     设计系统与全部样式（单文件，约 30KB）
    ├── js/site.js        导航、滚动入场、年份与分类筛选
    └── img/
        ├── banner-conf-keynote.jpg  首页轮播用（1400×560，129KB）
        ├── banner-conf-hall.jpg    同上（168KB）
        ├── banner-cicc-keynote.jpg 同上（109KB）
        ├── banner-cicc-hall.jpg    同上（158KB）
        ├── conference-keynote.jpg   2026 人工智能前沿学术会议 · 大会报告（3:2，223KB）
        ├── conference-hall.jpg      同上 · 主会场（236KB）
        ├── cicc-keynote.jpg         中国工业计算机大会 · 大会报告（213KB）
        ├── cicc-hall.jpg            同上 · 主会场（280KB）
        ├── lab-room.jpg             实验室环境（AI 生成，900×1125，141KB）
        ├── research-hero.jpg        更多内容 · 科研成果（750×900，57KB）
        ├── r-vision.jpg            计算机视觉（800×600，30KB）
        ├── r-matching.jpg          图文匹配（800×600，69KB）
        ├── r-text.jpg              文本识别（800×600，21KB）
        ├── r-speech.jpg            语音识别（800×600，38KB）
        ├── r-avse.jpg              视听语音增强（800×600，37KB）
        ├── r-intl.jpg              国际合作（800×600，62KB）
        ├── more-team.jpg           更多内容 · 科研团队（750×900，65KB）
        ├── more-faq.jpg            更多内容 · 常见问题（750×900，37KB）
        └── more-collab.jpg         更多内容 · 合作支持（750×900，34KB）
        └── alt/                     备用素材：上一版「清华未来实验室风格」用的 5 张 AI 生成
                                     抽象插画（research-hero / r-*.jpg），当前页面未引用
```

**导航为二级菜单**：实验室概况 / 科研成果 / 新闻动态 / 加入我们 四个一级项带下拉，桌面端悬停展开，移动端默认展开为缩进列表（不做二次点击，避免手机上点不到）。

## 部署到 EdgeOne Pages

### 方式 A：连接 Git（推荐）

1. 把 `lab-site` 推到 GitHub / GitLab / Gitee（公开或私有均可）。
2. EdgeOne 控制台 → Pages / Makers → 新建项目 → 导入 Git 仓库。
3. 构建配置：
   - **框架预设**：其他 / 静态站点（Other / Static）
   - **构建命令**：留空
   - **输出目录**：`/`（要求必填时填 `.`）
   - **根目录**：若 `lab-site` 是仓库子目录，填该子目录名
4. 部署后系统分配默认域名，可直接访问。
5. 绑定自定义域名：项目设置 → 域名管理 → 添加域名，按提示到域名服务商配置解析。

> 使用中国大陆节点加速要求域名已完成 **ICP 备案**；未备案可先用默认域名预览。

### 方式 B：直接上传

控制台支持上传静态文件或压缩包创建项目，把整个 `lab-site` 目录打包上传即可，配置同上。

### 上线后检查

- [ ] 8 个内容页 + 404 全部可打开，导航一级/二级高亮正确
- [ ] 手机宽度（375px）下菜单可展开，二级菜单显示正常
- [ ] 三张照片正常显示（`assets/img/` 下）
- [ ] 页脚地址、邮箱、备案号替换为正式信息
- [ ] 绑定域名后 `http://` 自动跳 `https://`

## 仍需补充的信息

| 项目 | 当前状态 | 需要改成 |
| --- | --- | --- |
| 联系电话 | 页面显示「待补充」 | 学院办公室或实验室电话 |
| ICP 备案号 | `皖 ICP 备 00000000 号` | 真实备案号（备案通过后） |
| 研究生研究方向 | 统一写「多模态数据处理」 | 各人的具体方向（可选） |
| 教师主页链接 | 指向学院官网首页 | 三位老师各自的个人主页 URL |
| 校园地图 | 已接入在线地图（Leaflet + 高德瓦片，定位锦绣校区） | 如需换点位，改 `contact.html` 里的 `pos` 坐标 |
| 学院名称 | 计算机与人工智能学院 | 若贵院对外仍用「计算机科学与技术学院」，全局替换即可 |

> 学院名称说明：学院官网与百科显示 2023 年已更名为「计算机与人工智能学院」，本站按此填写；如对外称谓不同，执行一次全局替换。

## 日常维护

**加一条新闻**：复制 `news.html` 里任意 `<a class="news-item" ...>` 整块，粘贴到列表最上方，改日期、标题、摘要与 `data-cat`（取值：`交流` / `成果` / `动态`）。

**加一篇论文**：复制 `publications.html` 里任意 `<article class="paper" ...>` 整块，改标题、作者（成员用 `<b>` 包裹会加粗）、期刊标签与 `data-year`；年份筛选按钮无需改动，只要 `data-year` 与按钮 `data-value` 对得上。

**加一名成员**：复制 `members.html` 里任意 `<div class="member">` 块，改姓氏首字、姓名、身份与方向。

**改导航**：导航在 9 个 HTML 文件中各有一份（静态站点无构建步骤），改的时候建议用编辑器「全局替换」，或直接改 `assets/js/site.js` 之外的地方保持一致。

## 换真实照片

| 用途 | 位置 | 建议尺寸 |
| --- | --- | --- |
| 首页简介配图 | `index.html` 的 `.figure-frame` | 900×1200 竖图，< 200KB |
| 首页头条 | `index.html` 的 `.news-feature__media` | 1280×720 |
| 新闻页画廊 | `news.html` 的 `.gallery__item` | 1280×720 |
| 成员照片 | `.member__avatar` 换成 `<img>` | 400×400 正方形，< 80KB |

替换示例：

```html
<div class="figure-frame has-photo" style="aspect-ratio:3/4;">
  <img src="assets/img/lab-hero.jpg" alt="实验室实验平台" width="900" height="1200" loading="lazy">
  <span class="figure-caption figure-caption--photo">躬行楼 201 · 实验室工位</span>
</div>
```

图片上传前务必压缩（Squoosh / TinyPNG）。当前三张照片已压到 213KB / 236KB / 83KB。

## 图片规格（按版位裁好，别用 CSS 硬撑）

所有图片都已经按版位比例裁切过，`object-fit: cover` 只是兜底。换图时**按下面的尺寸裁好再放进去**，否则会被裁掉关键部分或显得模糊：

| 版位 | 比例 | 像素 | 对应文件 |
| --- | --- | --- | --- |
| 首页通栏轮播 | **5:2** | 1400×560 | `banner-*.jpg`（与轮播区同比例，不再二次裁切）|
| 新闻区左侧小图集 | 3:2 | 1400×933 | `conference-*.jpg` / `cicc-*.jpg` |
| 科学研究卡片 | 4:3 | 800×600 | `r-*.jpg` |
| 更多内容图块 | 5:6 | 750×900 | `more-*.jpg`、`research-hero.jpg` |
| 实验室介绍大图 | 4:5 | 900×1125 | `lab-room.jpg`（高度自动对齐左侧文字块） |

裁切脚本逻辑（Pillow）：先 `crop_ratio` 居中裁到目标比例，再 `resize` 到目标宽度，最后 `quality=84, progressive=True` 存 JPEG。单张控制在 300KB 以内，全站图片约 1.5MB。

## 首页透明页头（滚动变白）

首页的导航栏覆盖在轮播图上：到页面顶部时背景透明、文字白色；向下滚动超过 8px 后自动变成半透明白底 + 深色文字 + 细边线（`.is-scrolled`）。

实现方式：

- `<body class="page-home">` 是开关。`.page-home .site-header` 改为 `position: fixed`，所以轮播图从页面顶端开始、直接垫在导航下面。
- `.page-home .topbar { display: none }`：首页隐藏最上方那条「合肥师范学院 | 学院」信息条，让画面更干净；**内页不变**（顶部信息条 + 白色 sticky 导航）。
- 轮播图顶部有一条 150px 的深色渐变（`.page-home .banner::before`），保证白字在浅色照片上也读得清。
- 滚动状态由 `site.js` 里的 `scrollY > 8` 切换 `.is-scrolled`，无需额外监听。
- 移动端菜单展开时，导航项自动切回深色（下拉面板是白底），避免白字白底。

要给新页面也做成这种沉浸式页头，只需给该页 `<body>` 加 `page-home` 类，并让首个区块是通栏图。

## 个人主页（成员详情页）

每位教师和研究生都有自己的页面，链接来自 `members.html` 的成员卡片（头像/姓名与「个人主页」都可点）。

页面结构（参考清华未来实验室的教师页）：

- 左侧固定栏（`.profile__side`，桌面 sticky）：照片占位块 → 姓名 → 身份 → 研究方向 → 「联系方式」（黑色下划线标题）
- 右侧正文（`.profile__main`）：「简介」黑色下划线标题 + 若干段落

现有页面：`jiangfengling` / `wangfan` / `fangaoyan` / `wangxiurui` / `liyongchen` / `kuangwenchao` / `liuwenjing`。

### 加一个人

1. 复制任意一个详情页（例如 `wangxiurui.html`），改文件名（建议用拼音）。
2. 改 `<title>`、`meta description`、面包屑、姓名首字（`.profile__photo` 里的那个字）、姓名、身份、研究方向、联系方式、简介段落。
3. 在 `members.html` 对应卡片里，把 `member__link` 与「个人主页」的 `href` 指向新文件。

### 换成真实照片

`.profile__photo` 目前是「姓氏首字 + 浅蓝渐变」的占位。有照片时替换成：

```html
<div class="profile__photo">
  <img src="assets/img/people/wangxiurui.jpg" alt="王修瑞" width="600" height="750">
</div>
```

建议 **4:5 竖图、600×750、压缩到 100KB 以内**（CSS 已按 4:5 裁切）。照片目录建议新建 `assets/img/people/`。

> 说明：这些页面目前用的是文字占位而不是 AI 生成的人像——给真实姓名配 AI 脸会造成误认，等有实拍照片再替换。

## 首页结构（照着清华未来实验室的顺序）

| 顺序 | 区块 | 内容 | 点击行为 |
| --- | --- | --- | --- |
| 1 | `.banner` | 通栏活动图集（5 张，可拖动） | 每张图跳到对应活动图集 |
| 2 | `.about-section` | 实验室介绍：h1 + 两段导入 + 4 个数字 + 按钮 | 右侧照片与按钮都进 `about.html` |
| 3 | 科学研究 | **两列 × 三行**，每张卡左边图、右边文字（6 张：5 个方向 + 国际合作） | 每张卡进 `research.html#方向锚点` |
| 4 | 新闻和学术活动 | 左：3:2 小图集（4 张淡入轮播，底部深蓝色标题条）；右：4 条新闻（MM.DD / 年份 + 标题 + 摘要） | 图片进活动图集，新闻进对应页面 |
| 5 | 更多内容 | 4 个图块 + 1 个通栏 CTA 块 | 胶囊标签分别进团队/成果/问答/联系/招生 |

改内容时对应的类名：`about-text`、`research-grid > .rtile`、`news-showcase`、`more-grid > .more-tile`。

> 「加入我们」块目前写的是「只招收硕士研究生」；以后要招博士或研究助理，改这一块的 `more-tile__note` 与胶囊标签即可。

## 首页横幅怎么换图

首页顶部是**通栏横向滑动图集**：像手机相册一样，按住鼠标/手指左右拖动即可切换，松手自动吸附到最近一张；也支持左右箭头、底部圆点、每 5.5 秒自动播放（悬停暂停）。**每张图都是链接，点击跳到对应活动**。

当前 5 张：AI 前沿会议 2 张、中国工业计算机大会 2 张、实验室环境 1 张。

```html
<a class="banner__slide" href="news.html#cicc-2026-photos" aria-label="查看活动：活动名称">
  <img src="assets/img/你的图.jpg" alt="图片说明" width="1400" height="932" loading="lazy">
  <span class="banner__caption">
    <span class="wrap">
      <time datetime="2026-09-12">2026.09.12</time>
      <span>活动名称 · 环节</span>
      <em>查看活动 →</em>
    </span>
  </span>
</a>
```

- **加一张**：复制整段 `<a class="banner__slide">…</a>` 放进 `.banner__track`；`is-active` 只能保留在**一张**上（默认第一张）。
- **减一张**：删掉对应的 `<a>` 即可，圆点数量由 JS 按实际张数重建。
- **改跳转**：改 `href`。新闻类活动指向 `news.html#<活动锚点>-photos`，实验室图可指向 `about.html#platform`。
- 图片建议 **1400×930 横图**，单张 < 300KB；竖图（如实验室照片）会被居中裁切。
- 只有 1 张时不自动播放，也不显示箭头与圆点。

### 已知坑（已修复）

旧版 `site.js` 里轮播代码残留了两份（一份淡入淡出版、一份滑动版），两份都绑定了箭头事件，导致「点一次跳两张」。现已删除旧代码，文件里只保留一份实现——**后续若从别处粘贴代码，务必先确认没有重复的 `querySelector('.banner')`**。

## 设计说明

- **配色（天蓝）**：`--ink #0b3f63` → `--navy #11608f` → `--navy-2 #1a77b4` → `--blue #2f9ee0` → `--cyan #6cc7f5`，浅色底 `--cyan-soft #e6f4fd`。
  - 小字号文字统一用 `--navy`（#11608f）而不是亮蓝，因为 #2f9ee0 在白底上对比度不足，13px 以下会发虚。
  - 深色仍用于 topbar、页脚、内页头部与 CTA，保证白字可读。
- **首屏**：导航下方直接是 `clamp(300px, 42vw, 560px)` 高的通栏轮播，图片 `object-fit: cover`，激活页有 7 秒缓慢放大（Ken Burns）效果；底部深色渐变上叠日期胶囊 + 活动名称；左右圆形按钮半透明玻璃质感。
- **字体**：系统中文字体栈（思源黑体 / 苹方 / 微软雅黑），不引外部字体，避免境外 CDN 影响首屏。
- **版式**：1200px 容器、8px 间距基；区块留白 92px；标题 24–32px，正文 15px / 行高 1.8；圆角 3–4px，细线分隔，阴影只在 hover 出现。
- **二级菜单**：桌面悬停展开（带 2px 蓝色顶边），移动端展开为浅灰缩进块。
- 无 jQuery、无 CDN 图标库、无统计脚本，样式与脚本合计约 36KB；轮播为原生 JS，尊重 `prefers-reduced-motion`（系统开启「减少动态效果」时不自动播放）。

## 以后要在线编辑后台

EdgeOne Pages 托管静态产物，跑不了 Python 后端。需要后台时有三条路：

1. **接 CMS**：Contentful / Plasmic / Strapi，构建时拉取（EdgeOne 官方有集成文档）；
2. **Edge Functions / Cloud Functions + KV**：可做登录与内容增删改，但后台界面要自己写；
3. **前后端分离**：FastAPI 部署在云服务器，静态站调用其 API。

按目前规模（每年几条新闻、几篇论文），直接改 HTML 的成本最低。


## 联系页的在线地图

`contact.html` 里的地图用 **Leaflet 1.9.4**（本地托管在 `assets/vendor/leaflet/`，不依赖 CDN）+ **高德瓦片**，定位在合肥师范学院锦绣校区。

- 坐标写死在初始化脚本里：`var pos = [31.750345, 117.228568];`
- 这是 **GCJ-02（火星坐标）**，与高德瓦片一致。拿到的如果是 WGS84（GPS/OSM 坐标），需要先做 WGS84→GCJ02 转换，否则位置会偏 500 米左右。
- 标的点是「多模态数据处理实验室 · 躬行楼 201」，弹窗文案也在同一段脚本里。
- 地图右下角保留了「在高德地图打开」与「在 OpenStreetMap 查看」两个出口。
- 没做滚动缩放（`scrollWheelZoom: false`），避免用户滚页面时把地图放大；要缩放请点左上角 +/− 或双击。

> 说明：高德瓦片是通过公开的地图瓦片地址读取的，未使用密钥。如果以后访问量大或要商用合规，建议到高德开放平台申请 Key，改用官方 JS API。
