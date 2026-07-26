import { useEffect } from "react";
import { IconArrowRight, IconGithub } from "../components/icons";

const stack = [
  "Vite + React + TypeScript",
  "Tailwind CSS",
  "React Router",
  "纯静态 JSON 数据",
  "GitHub Actions CI/CD",
  "GitHub Pages 静态托管",
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "关于我们 | OpenSkill Galaxy";
  }, []);

  return (
    <article className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-body">关于 OpenSkill Galaxy</h1>
        <p className="text-sm text-muted">开放技能星河的愿景、体系架构与技术底座介绍。</p>
      </header>

      <section className="card p-6 md:p-8 space-y-4 text-sm text-muted leading-relaxed">
        <p>
          <strong className="text-body font-semibold">OpenSkill Galaxy（开放技能星河）</strong>{" "}
          是一个由社区共建的模块化静态技能学习与自测平台。平台秉持「学练一体、开箱即用、免后端维护」的理念，
          每一个技能模块都是独立、可自由组合、高度可复用的学习单元。
        </p>
        <p>
          本门户站作为官方总入口，汇总了分布在 GitHub 组织下的全部 60 个学习仓库。
          所有数据采用纯静态 JSON 索引与存储，不依赖任何后端数据库或外部 AI API。
          得益于纯静态设计，平台支持 100% 离线运行，具备秒级开屏响应体验。
        </p>
      </section>

      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-base font-semibold text-body">精简现代的技术栈</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-muted">
          {stack.map((s) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-base font-semibold text-body">参与社区共建</h2>
        <p className="text-sm text-muted leading-relaxed">
          OpenSkill Galaxy 是一个完全开源、由社区驱动的共建项目。
          无论你想提交全新方向的技能模块、规划更合理的学习路线，还是修补现有的题库与讲义缺陷，都非常欢迎。
        </p>
        <div>
          <a className="btn-primary" href="https://github.com/openskill-galaxy" target="_blank" rel="noreferrer">
            <IconGithub size={16} /> 前往 GitHub 参与贡献 <IconArrowRight size={15} />
          </a>
        </div>
      </section>

      <section className="card p-6 md:p-8 space-y-2 text-sm text-muted">
        <h2 className="text-xs font-semibold text-subtle tracking-wider uppercase">许可协议</h2>
        <p className="leading-relaxed">
          本平台内容与工程底座遵循开源的 <strong className="text-body font-semibold">MIT License</strong> 协议发布。
          你可以自由复制、分发、修改和构建新版本，唯需在复用时附带原作者版权声明。
        </p>
      </section>
    </article>
  );
}
