import type { UserConfig } from "vite-plus";

import { buildOutputPatterns, generatedPatterns, outputPatterns } from "./patterns";

type TaskInput = { auto: true } | string;

const ignoredDependencyPatterns = ["node_modules", ".vite", ".vite-temp"];

// Environment variables that can affect client/server build output.
const appEnv = ["NODE_ENV", "VITE_*"];

function ignoredDirectoryInput(pattern: string): string[] {
  return [`!**/${pattern}`, `!**/${pattern}/**`];
}

function ignoredFileInput(pattern: string): string {
  return `!**/${pattern}`;
}

function outputDirectory(pattern: string): string[] {
  return [pattern, `${pattern}/**`];
}

// Automatic input tracking keeps task cache keys accurate without manually
// listing every source/config file. The exclusions remove dependency, generated,
// output, and tool-owned paths that can be read and rewritten during a task.
const taskInput = [
  { auto: true },
  ...ignoredDependencyPatterns.flatMap(ignoredDirectoryInput),
  ...outputPatterns.flatMap(ignoredDirectoryInput),
  ...generatedPatterns.map(ignoredFileInput),
] satisfies TaskInput[];

export const tasks = {
  "task:app:dev": {
    command: "vp dev",
    cache: false,
  },

  // Formatting mutates source files, so it should always run instead of using a
  // cached result.
  "task:app:fmt": {
    command: "vp fmt",
    cache: false,
  },

  "task:app:lint": {
    command: "vp lint",
    env: appEnv,
    input: taskInput,
  },

  // Vite+ check already includes formatting/linting behavior, so ready can call
  // check instead of repeating fmt/lint as separate steps.
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
    output: buildOutputPatterns.flatMap(outputDirectory),
  },

  "task:ready": {
    command: ["vp run task:app:check", "vp run task:app:test", "vp run task:app:build"],
  },
} satisfies NonNullable<NonNullable<UserConfig["run"]>["tasks"]>;
