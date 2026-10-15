# 人工智能实验室主页

蒋峰岭课题组的实验室主页。站点基于 [Astro](https://astro.build/) 构建，为纯静态输出，页面风格偏学术，可直接部署到任意静态托管平台（EdgeOne Pages、Vercel、Netlify 等）。

页面为单页结构，包含以下板块：

- 实验室简介
- 研究方向（图像描述生成 / 视听语音增强 / 多模态融合与目标跟踪）
- 团队成员
- 学术成果
- 合作交流

## 内容维护

所有正文内容集中在 [`src/data/lab.ts`](./src/data/lab.ts)，修改该文件即可更新页面，无需改动组件：

| 导出项 | 对应板块 |
| --- | --- |
| `lab` | 实验室名称、简介段落、顶部数据 |
| `advisor` / `members` | 导师与成员 |
| `researchDirections` | 研究方向 |
| `publications` | 学术成果 |
| `collaborations` | 合作交流 |

站点标题、副标题、配色、导航文案等外观配置位于 [`src/config.ts`](./src/config.ts) 与 [`src/i18n/ui.ts`](./src/i18n/ui.ts)。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器（默认 http://localhost:4321）：

```bash
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，本地预览：

```bash
npm run preview
```

## 部署到 EdgeOne Pages

1. 将项目推送到 GitHub 仓库。
2. 在 [EdgeOne Pages 控制台](https://edgeone.ai/pages) 新建项目并关联该仓库。
3. 框架预设选择 **Astro**，构建命令 `npm run build`，输出目录 `dist`。
4. 部署完成后按需绑定自定义域名。

项目不含任何需要配置的环境变量，无需额外的 CMS 或后端服务。

## 目录结构

```text
src/
├─ data/lab.ts               # 站点正文数据
├─ pages/[...index].astro    # 首页
├─ components/               # 页面组件
├─ layouts/                  # 布局与 <head>
├─ i18n/                     # 文案与语言配置
├─ styles/                   # 字体与全局样式
└─ config.ts                 # 站点信息与主题配置
public/
├─ font/                     # 本地字体
└─ icon/                     # favicon 与社交分享图
```

## 致谢

站点样式基于 [astro-theme-retypeset](https://github.com/radishzzz/astro-theme-retypeset) 二次开发，感谢原作者的贡献。
