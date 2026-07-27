import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ModulesPage from "./pages/ModulesPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import LearningPathsPage from "./pages/LearningPathsPage";
import AboutPage from "./pages/AboutPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // 带锚点的跳转（如 /paths#slug）交由页面自身处理滚动
    if (!hash) {
      // body 因 height:100% + overflow-y:auto 可能是实际滚动容器
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/:slug" element={<ModuleDetailPage />} />
          <Route path="/paths" element={<LearningPathsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
