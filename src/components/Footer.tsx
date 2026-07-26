import { IconLogo, IconGithub } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-8">
      <div className="container-page py-12 text-sm">
        <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-brand">
              <IconLogo size={20} />
            </span>
            <div>
              <p className="text-body font-semibold tracking-tight">OpenSkill Galaxy</p>
              <p className="mt-0.5 text-xs text-subtle">开放技能星河 · 模块化自学底座</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <a
              className="inline-flex items-center gap-1.5 text-muted hover:text-body transition duration-200"
              href="https://github.com/openskill-galaxy"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub size={16} /> GitHub 组织
            </a>
            <a
              className="text-muted hover:text-body transition duration-200"
              href="https://openskill-galaxy.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              在线体验
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-5 flex flex-col sm:flex-row justify-between text-xs text-subtle gap-2">
          <p>© {new Date().getFullYear()} OpenSkill Galaxy · MIT License</p>
          <p>Made for student self-learners</p>
        </div>
      </div>
    </footer>
  );
}
