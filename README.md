# OpenSkill Galaxy Portal

OpenSkill Galaxy（开放技能星河）总入口站 —— 聚合所有技能模块、分类、学习路径与最新动态，并提供检索与导航。

访问地址：<https://openskill-galaxy.github.io/>

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- 静态 JSON 数据（无后端、无数据库、无 AI API）
- GitHub Actions 自动部署到 GitHub Pages

## 目录结构

```text
01-portal/
├─ public/data/         # 静态 JSON 数据
│  ├─ modules.json
│  ├─ categories.json
│  ├─ learning-paths.json
│  └─ updates.json
├─ src/
│  ├─ components/       # 通用组件
│  ├─ pages/            # 路由页面
│  ├─ data/             # 数据加载
│  ├─ search/           # 搜索索引与查询
│  ├─ styles/           # 全局样式
│  ├─ types.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ .github/workflows/deploy.yml
├─ index.html
├─ vite.config.ts
└─ package.json
```

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器
npm run build      # 生产构建，输出到 dist/
npm run preview    # 本地预览构建产物
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

仓库：<https://github.com/openskill-galaxy/openskill-galaxy.github.io>

部署配置见 `.github/workflows/deploy.yml`，使用 GitHub Pages 官方 Actions（`configure-pages` / `upload-pages-artifact` / `deploy-pages`）。

Pages Source 需在仓库 Settings → Pages → Build and deployment → Source 中选择 **GitHub Actions**。

## 许可

MIT License
