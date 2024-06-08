import { defineConfig } from "vite";
import { resolve } from "path";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": dotenv.config({ path: resolve(__dirname, ".env") }).parsed,
  },
});
