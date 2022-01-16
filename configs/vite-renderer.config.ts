import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "../package.json";
import { fileURLToPath } from "url";
import electron from "vitejs-plugin-electron"
// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, "../src/renderer"),
  plugins: [vue(), electron({
    resolve: {
      'electron-store': `const Store = require('electron-store');\nexport { Store as default }`,
    },
  }) as any],
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
