export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950/20">
      <div className="container-page py-10 text-sm text-white/50">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <p className="text-white/80 font-bold tracking-wide">OpenSkill Galaxy</p>
            <p className="mt-1 text-xs text-white/40">开放技能星河 · 构建面向未来的模块化自学底座</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <a
              className="text-white/60 hover:text-white transition duration-200"
              href="https://github.com/openskill-galaxy"
              target="_blank"
              rel="noreferrer"
            >
              GitHub 组织
            </a>
            <a
              className="text-white/60 hover:text-white transition duration-200"
              href="https://openskill-galaxy.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              在线体验
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-white/[0.04] pt-4 flex flex-col sm:flex-row justify-between text-xs text-white/30 gap-2">
          <p>© {new Date().getFullYear()} OpenSkill Galaxy. MIT License.</p>
          <p>Made with ✦ for student self-learners</p>
        </div>
      </div>
    </footer>
  );
}
