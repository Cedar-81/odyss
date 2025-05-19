import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "hobbies-effort-printer-attach.trycloudflare.com" // 👈 your tunnel domain
    ]
  }
});
