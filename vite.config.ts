import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

// 组织首页仓库 openskill-galaxy.github.io，部署在根路径，base 用 "/"
export default defineConfig({
  base: "/",
  plugins: [react as unknown as PluginOption],
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
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor";
            }
            if (id.includes("fuse")) {
              return "fuse";
            }
          }
        },
      },
    },
  },
});
