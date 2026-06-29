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
    <header className="sticky top-0 z-20 border-b border-white/10 bg-galaxy-900/40 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-galaxy-600 text-white">
            ★
          </span>
          <span className="text-white">OpenSkill Galaxy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
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
