import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

type TaskInput = { auto: true } | string;

// -----------------------------------------------------------------------------
// Generated and output files
// -----------------------------------------------------------------------------

const generatedPatterns = ["src/routeTree.gen.ts"];
const outputPatterns = ["dist", ".output", "coverage"];

// -----------------------------------------------------------------------------
// Task cache inputs
// -----------------------------------------------------------------------------

// Automatic input tracking keeps task cache keys accurate without manually
// listing every source/config file. The exclusions remove generated, output, and
// tool-owned files that can be read and rewritten during a task. Generated files
// are derived from source files, so they should not independently affect cache
// keys.
const taskInput = [
  { auto: true },
  "!**/node_modules/**",
  "!**/.vite/**",
  "!**/.vite-temp/**",
  "!**/coverage/**",
  "!**/dist/**",
  "!**/.output/**",
  ...generatedPatterns.map((pattern) => `!**/${pattern}`),
] satisfies TaskInput[];

// Environment variables that can affect client/server build output.
const appEnv = ["NODE_ENV", "VITE_*"];

export default defineConfig({
  // ---------------------------------------------------------------------------
  // Dev server
  // ---------------------------------------------------------------------------

  server: {
    port: 3000,
  },

  // ---------------------------------------------------------------------------
  // Module resolution
  // ---------------------------------------------------------------------------

  resolve: {
    tsconfigPaths: true,
  },

  // ---------------------------------------------------------------------------
  // Vite plugins
  // ---------------------------------------------------------------------------

  plugins: [
    tanstackStart(),
    // React's Vite plugin must come after Start's Vite plugin.
    viteReact(),
    tailwindcss(),
  ],

  // ---------------------------------------------------------------------------
  // Formatting
  // ---------------------------------------------------------------------------

  fmt: {
    ignorePatterns: [...outputPatterns, ...generatedPatterns],

    sortImports: {
      internalPattern: ["#/"],
    },

    sortTailwindcss: {
      functions: ["clsx", "cn", "cva"],
      stylesheet: "src/styles.css",
    },
  },

  // ---------------------------------------------------------------------------
  // Linting
  // ---------------------------------------------------------------------------

  lint: {
    env: {
      browser: true,
      es2022: true,
    },

    ignorePatterns: [...outputPatterns, ...generatedPatterns],

    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],

    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },

    options: {
      reportUnusedDisableDirectives: "error",
      typeAware: true,
      typeCheck: true,
    },
  },

  // ---------------------------------------------------------------------------
  // Tests
  // ---------------------------------------------------------------------------

  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    reporters: ["tree"],
  },

  // ---------------------------------------------------------------------------
  // Task graph
  // ---------------------------------------------------------------------------

  run: {
    tasks: {
      "task:app:dev": {
        command: "vp dev",
        cache: false,
      },

      "task:app:fmt": {
        command: "vp fmt",
        cache: false,
      },

      "task:app:lint": {
        command: "vp lint",
        env: appEnv,
        input: taskInput,
      },

      "task:app:check": {
        command: "vp check",
        env: appEnv,
        input: taskInput,
      },

      "task:app:test": {
        command: "vp test",
        env: appEnv,
        input: taskInput,
      },

      "task:app:build": {
        command: "vp build",
        env: appEnv,
        input: taskInput,
        output: ["dist/**", ".output/**"],
      },

      "task:ready": {
        command: ["vp run task:app:check", "vp run task:app:test", "vp run task:app:build"],
      },
    },
  },
});
