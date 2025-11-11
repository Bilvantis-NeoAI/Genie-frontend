import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@ant-design/icons-svg/es/asn": path.resolve(
        __dirname,
        "node_modules/@ant-design/icons-svg/es/asn"
      ),
    },
  },
  optimizeDeps: {
    include: ["@ant-design/icons", "@ant-design/icons-svg"],
  },
});
