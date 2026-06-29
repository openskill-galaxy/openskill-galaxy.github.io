export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-galaxy-900/40">
      <div className="container-page py-8 text-sm text-white/60">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <p className="text-white/80 font-medium">OpenSkill Galaxy</p>
            <p>开放技能星河 · 模块化技能学习与路径导航</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="hover:text-white"
              href="https://github.com/openskill-galaxy"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-white"
              href="https://openskill-galaxy.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              Pages
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} OpenSkill Galaxy. MIT License.
        </p>
      </div>
    </footer>
  );
}
