import type { UserConfig } from "vite-plus";

import { generatedPatterns, outputPatterns } from "./patterns";

export const fmt = {
  ignorePatterns: [...outputPatterns, ...generatedPatterns],

  sortImports: {
    customGroups: [
      {
        groupName: "project-alias",
        elementNamePattern: ["#/**"],
      },
    ],

    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "project-alias",
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },

  sortTailwindcss: {
    functions: ["clsx", "cn", "cva"],
    stylesheet: "src/styles.css",
  },
} satisfies NonNullable<UserConfig["fmt"]>;
