export default function AboutPage() {
  return (
    <article className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-wide text-white">ℹ️ 关于 OpenSkill Galaxy</h1>
        <p className="text-xs text-white/40">开放技能星河的愿景、体系架构与技术底座介绍。</p>
      </header>

      <section className="card p-6 md:p-8 space-y-4 text-sm text-white/70 leading-relaxed">
        <p>
          <strong>OpenSkill Galaxy（开放技能星河）</strong> 是一个由社区共建的模块化静态技能学习与自测平台。
          平台秉持“**学练一体，开箱即用，免后端维护**”的理念，每一个技能模块都是独立、可自由组合、高度可复用的学习单元。
        </p>
        <p>
          本门户站作为 OpenSkill Galaxy 的官方总入口，汇总了分布在 GitHub 组织下的全部 60 个学习仓库。
          所有数据采用纯静态 JSON 进行索引与存储，不依赖任何后端数据库或外部 AI Api。得益于这种纯静态设计，平台支持 100% 离线运行，具备秒级开屏响应的极致体验。
        </p>
      </section>

      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-base font-bold text-white tracking-wide border-b border-white/[0.04] pb-2">🛠️ 精简现代的技术栈</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-white/60">
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> Vite + React + TypeScript
          </li>
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> Tailwind CSS
          </li>
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> React Router
          </li>
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> 纯静态 JSON 数据库
          </li>
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> GitHub Actions 自动化 CI/CD
          </li>
          <li className="flex items-center gap-2">
            <span className="text-galaxy-400">✦</span> GitHub Pages 静态托管
          </li>
        </ul>
      </section>

      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-base font-bold text-white tracking-wide border-b border-white/[0.04] pb-2">🤝 参与社区共建</h2>
        <p className="text-xs text-white/60 leading-relaxed">
          OpenSkill Galaxy 是一个完全开源、由社区驱动的共建项目。
          无论您是想提交全新方向的技能模块、规划更合理的学习路线，还是修补现有的题库和讲义缺陷，都非常欢迎！
        </p>
        <div className="pt-2">
          <a
            className="btn-primary"
            href="https://github.com/openskill-galaxy"
            target="_blank"
            rel="noreferrer"
          >
            前往 GitHub 组织参与贡献 →
          </a>
        </div>
      </section>

      <section className="card p-6 md:p-8 space-y-2 text-xs text-white/50">
        <h2 className="text-xs font-bold text-white/80 tracking-wider uppercase">许可协议</h2>
        <p className="leading-relaxed">本平台内容与工程底座遵循开源的 **MIT License** 协议发布。你可以自由复制、分发、修改和构建新版本的技能树，唯需在复用时附带原作者版权声明。</p>
      </section>
    </article>
  );
}
