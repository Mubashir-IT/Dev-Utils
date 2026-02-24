import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const plugins: any[] = [react(), runtimeErrorOverlay()];
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID) {
    const [cartographer, devBanner] = await Promise.all([
      import("@replit/vite-plugin-cartographer").then((m) => m.cartographer()),
      import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
    ]);
    plugins.push(cartographer, devBanner);
  }
  return {
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: ".",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  };
});
