export default function AboutPage() {
  return (
    <article className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold text-white">关于 OpenSkill Galaxy</h1>
      </header>

      <section className="space-y-3 text-white/80">
        <p>
          OpenSkill Galaxy（开放技能星河）是一个由社区共建的模块化技能学习平台。
          每一个技能模块都是独立、可组合、可复用的学习单元，
          学习者可以按需挑选模块，也可以跟随精心编排的学习路径系统化进阶。
        </p>
        <p>
          本站是 OpenSkill Galaxy 的总入口站，聚合所有模块、分类、学习路径与最新动态，
          并提供检索与导航能力。所有数据均为静态 JSON，由前端直接读取，
          不依赖任何后端服务、数据库或外部 AI 接口。
        </p>
      </section>

      <section className="space-y-2 text-white/80">
        <h2 className="text-xl font-semibold text-white">技术栈</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Vite + React + TypeScript</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
          <li>静态 JSON 数据</li>
          <li>GitHub Actions 自动部署到 GitHub Pages</li>
        </ul>
      </section>

      <section className="space-y-2 text-white/80">
        <h2 className="text-xl font-semibold text-white">参与共建</h2>
        <p>
          欢迎在 GitHub 上提交 Issue 或 Pull Request，贡献新的技能模块、
          学习路径或改进建议。
        </p>
        <a
          className="btn-primary"
          href="https://github.com/openskill-galaxy"
          target="_blank"
          rel="noreferrer"
        >
          前往 GitHub 组织 →
        </a>
      </section>

      <section className="space-y-2 text-white/60 text-sm">
        <h2 className="text-base font-semibold text-white">许可</h2>
        <p>本平台内容遵循 MIT License 发布。</p>
      </section>
    </article>
  );
}
