# 多模态数据处理实验室 · 官网（LMDP）

合肥师范学院计算机与人工智能学院 · 多模态数据处理实验室官方网站。

纯静态站点（HTML + CSS + 原生 JS），零构建、零外部 CDN，可直接部署到 EdgeOne Pages。

版式参照 [USTC Lab for Data Science](https://data-science.ustc.edu.cn/tour.htm)，风格低调、留白多、以文字为主。

---

## 页面

| 文件 | 中文 | English |
| --- | --- | --- |
| `index.html` | 首页（实验室简介 + 研究方向 + 最新动态） | Home |
| `news.html` | 动态 | News |
| `people.html` | 团队成员（教师 3 / 研究生 4） | People |
| `publications.html` | 论文（蒋峰岭近五年 18 篇，附 DOI） | Publications |
| `gallery.html` | 相册 | Gallery |
| `contact.html` | 联系（地址、邮箱、招生、地图） | Contact |
| `404.html` | 页面不存在 | Page not found |

共 7 个页面，导航固定为「首页 / 动态 / 成员 / 论文 / 相册 / 联系」。

## 目录结构

```
lab-site/
├── index.html / news.html / people.html / publications.html
├── gallery.html / contact.html / 404.html
├── assets/
│   ├── css/style.css        全部样式（单文件，约 13KB）
│   ├── js/site.js           中英切换、移动端菜单、论文筛选（约 5KB）
│   ├── fonts/               Jura 400/600、B612 400/700（woff2，共 81KB）
│   ├── img/                 4 张照片 + favicon.svg
│   └── vendor/leaflet/      Leaflet 1.9.4（本地托管，仅联系页地图用）
├── sitemap.xml
└── README.md
```

## 设计取值（来自参考站样式表，不是凭印象）

| 项 | 参考站 | 本站 |
| --- | --- | --- |
| 主色 | `#3f51b5`（靛蓝，Bootstrap indigo） | 同 |
| 标题色 | `#313131` | 同 |
| 正文色 | `#212529` / 次要 `#6c757d` | `#2a2f36` / `#6c757d` |
| 分隔线 | `#dee2e6` | `#e4e7ec` |
| 标题字体 | Jura 400 | Jura 400（本地 woff2） |
| 正文字体 | B612 | B612（本地 woff2） |
| 标题字号 | `h1` 36px / `h2` 32px，Jura 400 | `h1` 36px，`h2` 28px |
| 内容宽度 | 约 800px 居中 | 820px（`--container`） |
| 顶栏 | 通栏靛蓝、白字、右侧菜单 | 同（66px 高） |

中文字体自动回落到 `PingFang SC / Microsoft YaHei`——Jura 与 B612 都没有中文字形，这与参考站的表现一致。

## 中英双语

- **默认中文**，右上角 `中文 / EN` 切换，选择记在 `localStorage`（键名 `lmdp-lang`）。
- 实现方式：所有需要翻译的节点同时带 `data-zh` 与 `data-en`，JS 读取对应属性写入 `innerHTML`，同时更新 `<html lang>`、`<title>`、`meta description` 与输入框 `placeholder`。
- 也可以用 URL 直接进英文：`index.html?lang=en`；参数优先于本地记忆。
- **只有中文内容不需要改成双语**的节点（例如论文标题、作者）不要加 `data-*` 属性，否则会被覆盖。

新增一句双语文案：

```html
<p data-zh="中文内容" data-en="English text">中文内容</p>
```

> 属性值里的双引号会被截断，值中如必须含 HTML（`<a>`、`<br>`），请改用单引号或把该节点移出 i18n（参见 `contact.html` 的邮箱行）。

## 内容维护

### 加一条动态

`news.html` 与 `index.html` 各有一份列表（首页只放前 3 条）。复制一个 `<li class="news-item">`：

```html
<li class="news-item">
  <div class="news-item__main">
    <p class="news-item__meta">2026.11.02</p>
    <h3 class="news-item__title" data-zh="中文标题" data-en="English title">中文标题</h3>
    <p class="news-item__excerpt" data-zh="中文摘要" data-en="English summary">中文摘要</p>
  </div>
  <p class="news-item__badge">AAAI</p>
</li>
```

`news-item__badge` 是右侧的灰色小字（会议/期刊缩写），没有就留空字符串。

### 加一位成员

`people.html` 里复制一个 `<li class="person">`。头像目前是「姓氏字 + 浅灰圆」占位，有照片时替换为：

```html
<div class="person__avatar"><img src="assets/img/people/wangxiurui.jpg" alt="王修瑞" width="400" height="400"></div>
```

建议 1:1、400×400、压缩到 80KB 以内，放 `assets/img/people/`。

### 换相册照片

`gallery.html` 里复制一个 `<figure>`，图片按 **3:2** 裁好（建议 1400×933），`figcaption` 写中英两版。

相册为单列大图：每张按视口宽度的 **75%** 居中（`width: 75vw`，上限 1200px），会突破 820px 内容栏；窗口宽度 ≤900px 时回落到 100%。所以相册照片的横向分辨率不能太低，**低于 1200px 宽的图在大屏上会发虚**。

### 改联系信息 / 地图点位

`contact.html`：文字在 `.info-row` 里；地图点位在页面底部脚本的 `var pos = [31.750345, 117.228568];`，注意这是 **GCJ-02（火星坐标）**，与高德瓦片一致；若拿到的是 WGS84（GPS/OSM）坐标，需先做 WGS84→GCJ02 转换，否则会偏移约 500 米。

## 论文页（重要：论文必须真实）

`publications.html` 收录 **蒋峰岭（Fengling Jiang, Hefei Normal University）** 在 OpenAlex 作者档案（`A5076256814`）下 **2022—2026 年（近五年）的 18 篇**论文，每条都带 DOI 链接，可逐条核验。

> 该作者档案共 24 篇（2018 年起），按「只展示近五年」的要求，2018—2021 年的 6 篇未上页面；需要时从 git 历史（`6489e95` 之前）或 OpenAlex 直接取回。

- 数据来自 OpenAlex API：`https://api.openalex.org/works?filter=author.id:A5076256814`
- 页面上每条为 `<article class="pub" data-year="2026" data-type="journal">`，`data-type` 只有 `journal` / `conference` 两种，筛选与年份下拉都依赖这两个属性。
- 按年份倒序排列，同年按被引次数排序。
- 作者列表里 **Fengling Jiang** 用 `<strong>` 加粗标注本人。
- 本页**没有任何编造的论文、PDF 或代码链接**；只有 DOI，因为 PDF 直链无法保证长期有效。

新增一篇论文时，请先确认 DOI 能打开，再手动插入一条：

```html
<article class="pub" data-year="2027" data-type="journal">
  <svg class="pub__icon" ...></svg>
  <div class="pub__body">
    <p class="pub__authors">作者1, <strong>Fengling Jiang</strong> <span class="pub__year">(2027)</span>.
      <a class="pub__title" href="https://doi.org/10.xxxx/xxxx" target="_blank" rel="noopener">标题</a>.
      <span class="pub__venue">In 期刊名, 卷(期), 页码.</span></p>
    <div class="pub__links"><a class="pill" href="https://doi.org/10.xxxx/xxxx" target="_blank" rel="noopener">DOI</a></div>
  </div>
</article>
```

同时把 `<option>` 里的年份补上，并把「共 N 篇」与 `data-zh` / `data-en` 里的数字改掉。

## 部署

仓库根目录就是站点根目录。

1. EdgeOne Pages → 导入 Git 仓库
2. 框架：**其他 / 静态站点**
3. 构建命令：留空
4. 输出目录：`/`
5. 绑定自定义域名需要 ICP 备案

本地预览：

```bash
cd lab-site
python -m http.server 8000
# 打开 http://localhost:8000
```

## 几个实现细节

- **顶栏下划线**用 `border-bottom` 画在导航项上，`.nav` 高度与顶栏等高（66px），否则下划线会跑到靛蓝色块外面看不见。
- **`[hidden]` 需要 `display:none !important`**：论文条目是 `display:flex`，否则 JS 设置的 `hidden` 不生效。
- **Leaflet 样式必须先于 `style.css` 引入**，本项目的 `img { display:block }` 等全局规则会干扰瓦片布局；同时地图容器要有确定高度，初始化后调用一次 `invalidateSize()`。
- 没有滚动入场动画，也没有用 `opacity: 0` 做初始状态——禁用 JS 时内容照常可见。

## 与旧版的关系

这一版是整体重做。上一版（深蓝科技风、通栏轮播、7 个成员详情页、研究方向页等）已从工作区移除，需要时从 git 历史取回：

```bash
git log --oneline
git checkout <旧提交> -- .
```
