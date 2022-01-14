import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "../package.json";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, "../src/renderer"),
  plugins: [vue()],
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../../dist/renderer",
  },
  server: {
    host: "::",
    port: pkg.env.PORT,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src/renderer", import.meta.url)),
    },
  },
});
