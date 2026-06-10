import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import type { PluginOption } from "vite-plus";

function isTestMode(mode: string) {
  return mode === "test" || process.env["VITEST"] === "true";
}

// Vitest loads the Vite config, but Start/Nitro wire app runtime behavior.
// Tests still need React/Tailwind transforms without booting runtime plugins.
function getRuntimePlugins(mode: string) {
  if (isTestMode(mode)) {
    return [] satisfies PluginOption[];
  }

  return [tanstackStart(), nitro()] satisfies PluginOption[];
}

export function getPlugins(mode: string) {
  return [
    ...getRuntimePlugins(mode),
    // React's Vite plugin must come after Start's Vite plugin.
    viteReact(),
    tailwindcss(),
  ] satisfies PluginOption[];
}
