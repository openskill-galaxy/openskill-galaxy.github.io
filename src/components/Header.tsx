import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";
import {
  IconLogo,
  IconSun,
  IconMoon,
  IconCloud,
  IconArchive,
  IconMenu,
  IconClose,
} from "./icons";

// Appwrite SDK 体积大且大多数访客用不到，按需加载
const AppwriteModal = lazy(() => import("./AppwriteModal"));

const navItems = [
  { to: "/", label: "首页" },
  { to: "/modules", label: "技能模块" },
  { to: "/paths", label: "学习路径" },
  { to: "/about", label: "关于" },
];

function BackupModal({ onClose }: { onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleExport = () => {
    try {
      const backup: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("openskill-") || key === "theme")) {
          const val = localStorage.getItem(key);
          if (val) backup[key] = val;
        }
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `openskill_galaxy_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setError(e.message || "导出失败");
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string);
        if (typeof data !== "object" || data === null) {
          throw new Error("无效的备份文件格式");
        }
        Object.entries(data).forEach(([key, val]) => {
          if (key.startsWith("openskill-") || key === "theme") {
            localStorage.setItem(key, val as string);
          }
        });
        setSuccess(true);
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        setError(err.message || "导入失败，文件格式有误");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="备份与同步"
        className="card w-[380px] max-w-full p-6 relative flex flex-col gap-5"
        style={{ boxShadow: "var(--shadow-lg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="icon-btn absolute right-4 top-4"
          type="button"
          aria-label="关闭"
        >
          <IconClose size={16} />
        </button>
        <div>
          <h3 className="text-base font-semibold text-body">备份与同步</h3>
          <p className="text-xs text-muted mt-1">
            导出或恢复你在全站 60 个模块的完整学习进度与收藏夹数据。
          </p>
        </div>

        {error && (
          <div className="text-xs text-rose-600 dark:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="text-xs text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
            操作成功！页面即将重载…
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button onClick={handleExport} className="btn-primary w-full text-sm" type="button">
            导出进度备份 (.json)
          </button>
          <label className="btn-ghost w-full text-sm text-center cursor-pointer">
            导入进度备份 (.json)
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
  const [showBackup, setShowBackup] = useState(false);
  const [showAppwrite, setShowAppwrite] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme !== "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center gap-4 sm:gap-6">
        <button
          onClick={() => setMobileNavOpen((v) => !v)}
          className="icon-btn md:hidden"
          type="button"
          aria-label={mobileNavOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <IconClose size={18} /> : <IconMenu size={18} />}
        </button>
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-[var(--shadow-accent)] transition-transform group-hover:scale-105">
            <IconLogo size={20} />
          </span>
          <span className="text-body tracking-tight text-[15px] font-bold hidden sm:block">
            OpenSkill <span className="text-gradient">Galaxy</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-body bg-surface-2"
                    : "text-muted hover:text-body hover:bg-surface-2"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 w-full max-w-xs justify-end">
          <div className="w-full">
            <SearchBox />
          </div>
          <button
            onClick={() => setShowAppwrite(true)}
            className="icon-btn hidden sm:inline-flex"
            title="Appwrite 云端数据同步与认证"
            type="button"
            aria-label="云同步"
          >
            <IconCloud size={17} />
          </button>
          <button
            onClick={() => setShowBackup(true)}
            className="icon-btn"
            title="本地 JSON 进度备份"
            type="button"
            aria-label="备份"
          >
            <IconArchive size={17} />
          </button>
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="icon-btn"
            title={theme === "dark" ? "切换至亮色模式" : "切换至暗色模式"}
            type="button"
            aria-label="切换主题"
          >
            {theme === "dark" ? <IconSun size={17} /> : <IconMoon size={17} />}
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <nav className="md:hidden border-t border-line bg-page px-4 py-2 flex flex-col gap-1 animate-fade-in">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-body bg-surface-2"
                    : "text-muted hover:text-body hover:bg-surface-2"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
      {showBackup && <BackupModal onClose={() => setShowBackup(false)} />}
      {showAppwrite && (
        <Suspense fallback={null}>
          <AppwriteModal onClose={() => setShowAppwrite(false)} />
        </Suspense>
      )}
    </header>
  );
}
