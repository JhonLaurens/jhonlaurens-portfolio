import { defineConfig } from "vite";
import { resolve } from "node:path";

const root = resolve(__dirname);

export default defineConfig({
  root,
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        sobreMi: resolve(root, "sobre-mi/index.html"),
        experiencia: resolve(root, "experiencia/index.html"),
        proyectos: resolve(root, "proyectos/index.html"),
        stack: resolve(root, "stack/index.html"),
        contacto: resolve(root, "contacto/index.html")
      }
    }
  }
});
