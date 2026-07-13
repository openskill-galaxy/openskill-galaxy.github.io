import { Link, NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/modules", label: "技能模块" },
  { to: "/paths", label: "学习路径" },
  { to: "/about", label: "关于" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-slate-950/40 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-3 font-bold transition hover:opacity-90">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-galaxy-600 to-indigo-500 text-white shadow-md shadow-galaxy-600/20 text-sm">
            ✦
          </span>
          <span className="text-white tracking-wider text-base font-semibold">OpenSkill <span className="text-transparent bg-clip-text bg-gradient-to-r from-galaxy-400 to-cyan-300">Galaxy</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-white/[0.06] text-white shadow-inner"
                    : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto w-full max-w-xs">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
