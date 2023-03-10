import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/personal-website",
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "@views": "/src/views",
            "@router": "/src/router",
            "@layout": "/src/layout",
            "@styles": "/src/styles",
            "@assets": "/src/assets",
            "@components": "/src/components",
        },
    },
    server: { open: true },
    build: { outDir: "docs" },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${resolve(
                    __dirname,
                    "src/styles/mixins.less"
                )}";`,
            },
        },
    },
});
