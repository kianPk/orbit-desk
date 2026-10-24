import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site: https://kianpk.github.io/orbit-desk/
  base: "/orbit-desk/",
});
