import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pkg = JSON.parse(readFileSync(resolve("package.json")).toString()) as {
  version: string;
};

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "build",
  manifest: {
    name: "Trainers Web Plus",
    description: "Enhances user experience for Pokémon TCG Asia website.",
    version: pkg.version,
    permissions: ["storage"],
    host_permissions: ["*://asia.pokemon-card.com/*"],
    browser_specific_settings: {
      gecko: {
        id: "trainers-web-plus@peioris.dev",
        data_collection_permissions: {
          required: ["none"],
        },
      },
    },
  },
  vite: (ctx) => ({
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
      cssMinify: "esbuild",
    },
    resolve: {
      alias: [
        { find: /^react$/, replacement: "preact/compat" },
        { find: /^react-dom$/, replacement: "preact/compat" },
        { find: /^react\/jsx-runtime$/, replacement: "preact/jsx-runtime" },
        { find: /^react\/jsxs$/, replacement: "preact/jsx-runtime" },
      ],
    },
    jsx: {
      pragma: "preact/core-jsx-dev",
      importPragma: "preact/core-jsx-dev",
    },
    plugins: [tailwindcss()],
  }),
});
