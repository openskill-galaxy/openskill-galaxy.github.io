import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 组织首页仓库 openskill-galaxy.github.io，部署在根路径，base 用 "/"
export default defineConfig({
  base: "/",
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: "dist",
    target: "es2020",
    minify: "esbuild",
    cssCodeSplit: true,
    reportCompressedSize: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
});
