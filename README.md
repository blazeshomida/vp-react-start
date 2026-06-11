# vp-react-start

A React application starter built with [Vite+](https://viteplus.dev/guide/), [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch), [TanStack Router](https://tanstack.com/router/latest/docs/api/router/RouterOptionsType), [Nitro](https://nitro.build/docs), [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite), [React Compiler](https://react.dev/learn/react-compiler/installation), TypeScript, and Vitest.

This template is intentionally minimal. It includes app infrastructure, routing, metadata helpers, CI, GitHub planning templates, and tooling defaults without adding a styled example app.

## Template Setup Checklist

When using this template for a real project:

- [ ] Update the root `package.json` name.
- [ ] Update `src/site.config.ts`.
- [ ] Add or replace `public/og-image.png`.
- [ ] Replace the home route placeholder.
- [ ] Style or replace root error and not-found fallbacks.
- [ ] Choose a deployment target and Nitro preset if needed.
- [ ] Update GitHub workflow names or paths if the project layout changes.
- [ ] Set up GitHub branch protection rules for `main` and require the Ready workflow before merging.
- [ ] Update issue templates if the project needs different planning prompts.
- [ ] Update this README for the real project.
- [ ] Run `vpr fmt`.
- [ ] Run `vpr ready`.

## Stack

- [React 19](https://react.dev)
- [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)
- [TanStack Router](https://tanstack.com/router/latest/docs/api/router/RouterOptionsType)
- [TanStack Router Devtools](https://tanstack.com/router/latest/docs/devtools)
- [Nitro](https://nitro.build/docs)
- [React Compiler](https://react.dev/learn/react-compiler/installation)
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-vite)
- [Base UI](https://base-ui.com)
- [Tabler Icons](https://tabler.io/icons)
- [TypeScript](https://www.typescriptlang.org)
- [Vite+](https://viteplus.dev/guide/)
- [Vitest](https://vitest.dev/guide/)
- [OXC](https://oxc.rs/docs/guide/usage/linter/config.html) linting and formatting through Vite+
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub issue forms](https://docs.github.com/en/issues/tracking-your-work-with-issues/configuring-issues/configuring-issue-templates-for-your-repository)
- pnpm catalogs

## Requirements

Use the Node version supported by `package.json`.

CI uses Node 24, so Node 24 is the safest local default.

Install dependencies with Vite+:

```sh
vp install
```

## Creating From This Template

Use this repository as a GitHub template for new TanStack Start app projects.

You can also create a project from this template with Vite+:

```sh
vp create github:blazeshomida/vp-react-start --directory my-app
```

After creating a new repository or project from the template, follow the setup checklist above and run:

```sh
vp install
vpr fmt
vpr ready
```

See the [Vite+ create guide](https://viteplus.dev/guide/create) for other template creation options.

## Commands

Vite+ runs package scripts and configured tasks through `vp run`.

The `vpr` command is the shorthand for `vp run`.

```sh
# Start the dev server
vpr dev

# Format files
vpr fmt

# Lint files
vpr lint

# Run format, lint, and type checks
vpr check

# Run tests
vpr test

# Build the app
vpr build

# Run the full local readiness check
vpr ready
```

Run `vpr fmt` before `vpr ready` when finalizing changes.

## Project Structure

```txt
src/
  lib/
    seo.ts
    utils.ts
  routes/
    __root.tsx
    index.tsx
  routeTree.gen.ts
  router.ts
  site.config.ts
  styles.css

tooling/
  format.ts
  lint.ts
  patterns.ts
  plugins.ts
  tasks.ts
  test.ts

.github/
  workflows/
    ready.yml
  ISSUE_TEMPLATE/
    bug_report.yml
    config.yml
    feature_request.yml
    task.yml
  pull_request_template.md

AGENTS.md
components.json
package.json
README.md
vite.config.ts
tsconfig.json
tsconfig.base.json
pnpm-workspace.yaml
```

## Application Layout

This template separates app source, shared app helpers, and root tooling:

- `src/routes` owns TanStack Router file routes.
- `src/lib` owns small reusable app helpers.
- `src/router.ts` owns TanStack Router creation and app router registration.
- `src/site.config.ts` owns replaceable site metadata defaults.
- `src/styles.css` owns global Tailwind CSS entry styles.
- `tooling` owns root Vite+ formatting, linting, testing, plugin, task, and pattern configuration.
- `.github` owns CI, pull request, and issue templates.
- `AGENTS.md` owns repo-specific instructions for coding agents.

The root `vite.config.ts` is the app tooling composition point.

## Routing

TanStack Router is configured in `src/router.ts`.

The router enables:

- intent-based route preloading
- structural sharing
- scroll restoration

The root route lives in `src/routes/__root.tsx`. It owns the document shell, root error fallback, root not-found fallback, global CSS import, and development-only router devtools.

`src/routeTree.gen.ts` is generated by TanStack Router/Start. It is committed so the template is immediately inspectable and type-checkable after install, but it is excluded from formatting, linting, and Vite+ task cache inputs.

Relevant docs:

- [TanStack Start: Build a Project from Scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)
- [TanStack Start: CSS Styling](https://tanstack.com/start/latest/docs/framework/react/guide/css-styling)
- [TanStack Router: Router Options](https://tanstack.com/router/latest/docs/api/router/RouterOptionsType)
- [TanStack Router: Document Head Management](https://tanstack.com/router/latest/docs/guide/document-head-management)
- [TanStack Router: Scroll Restoration](https://tanstack.com/router/latest/docs/guide/scroll-restoration)
- [TanStack Router: Render Optimizations](https://tanstack.com/router/latest/docs/guide/render-optimizations)
- [TanStack Router: Devtools](https://tanstack.com/router/latest/docs/devtools)

## Styling

Tailwind CSS is configured through `src/styles.css` and the Tailwind Vite plugin.

`src/lib/utils.ts` includes a `cn()` helper using `clsx` and `tailwind-merge`.

The template does not include a styled app shell. Route placeholders are intentionally plain.

Relevant docs:

- [Tailwind CSS: Installing with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [TanStack Start: CSS Styling](https://tanstack.com/start/latest/docs/framework/react/guide/css-styling)

## Component Generation

`components.json` is configured for shadcn-style component generation.

The template uses:

- TypeScript and TSX components
- Tailwind CSS through `src/styles.css`
- `#/*` path aliases
- `cn()` from `src/lib/utils.ts`
- Tabler Icons as the icon library
- Base UI as the installed primitive dependency

Replace or extend `components.json` when a project chooses a stronger component convention.

Relevant docs:

- [shadcn: components.json](https://ui.shadcn.com/docs/components-json)
- [Base UI](https://base-ui.com)
- [Tabler Icons](https://tabler.io/icons)

## Metadata

Site defaults live in `src/site.config.ts`.

Replace these values when starting a real project:

- `name`
- `title`
- `description`
- `url`
- `image`

The SEO helper in `src/lib/seo.ts` derives canonical URLs, Open Graph metadata, and Twitter card metadata from the site config and route path.

The default image path is `/og-image.png`. Add a matching public asset or update the path before using the template in production.

Relevant docs:

- [TanStack Router: Document Head Management](https://tanstack.com/router/latest/docs/guide/document-head-management)

## TypeScript

The root TypeScript config is strict and app-oriented.

The template uses:

- `strict`
- `exactOptionalPropertyTypes`
- `noUncheckedIndexedAccess`
- `noImplicitOverride`
- `noPropertyAccessFromIndexSignature`
- `moduleResolution: "bundler"`
- `jsx: "react-jsx"`
- `noEmit`

Do not enable `verbatimModuleSyntax`. TanStack Start warns that it can cause server code to leak into client bundles.

## File and Folder Conventions

Prefer vertical structure over horizontal structure.

Use the vertical codebase approach as the default reference:

- [The Vertical Codebase](https://tkdodo.eu/blog/the-vertical-codebase)

Group code by feature, domain, route concern, or workflow instead of by technical file type. Code that changes together should usually live together.

Prefer this shape when the app grows:

```txt
src/
  routes/
    dashboard/
      index.tsx
      _components/
      _queries.ts
      _schema.ts
```

Avoid broad dumping grounds unless the app is genuinely tiny or the files are truly global:

```txt
src/
  utils/
  types/
  constants/
  services/
```

Use `_` prefixes for private implementation details inside a vertical.

```txt
src/
  routes/
    dashboard/
      index.tsx
      _components/
      _queries.ts
      _schema.ts
      _types.ts
```

Rules:

- `index.ts` or route files are the public boundary for a vertical.
- `_*.ts` files are private to the vertical.
- `_*/` folders are private implementation folders.
- Do not import from another vertical's `_` files.
- Promote code to shared only after at least two real call sites need it.
- Shared code should have a clear name and ownership.
- Avoid vague dumping grounds like `utils`.
- Keep tests near the code they verify.
- Keep types near the code that owns them unless they are part of the public API.

## Tooling

`vite.config.ts` is the composition point. Focused config lives under `tooling/`:

- `tooling/format.ts` owns formatting config.
- `tooling/lint.ts` owns lint config.
- `tooling/patterns.ts` owns generated and output path patterns.
- `tooling/plugins.ts` owns the Vite plugin pipeline.
- `tooling/tasks.ts` owns the Vite+ task graph.
- `tooling/test.ts` owns Vitest config.

### Task Graph

```mermaid
flowchart TD
  ready["task:ready<br/>vpr ready / vp run ready"]

  checkTask["task:app:check"]
  testTask["task:app:test"]
  buildTask["task:app:build"]

  check["vp check"]
  test["vp test"]
  build["vp build"]

  format["format"]
  lint["lint"]
  types["type check"]

  output["dist / .output"]

  ready --> checkTask
  ready --> testTask
  ready --> buildTask

  checkTask --> check
  testTask --> test
  buildTask --> build

  check --> format
  check --> lint
  check --> types

  build --> output
```

Vite+ provides the local workflow:

- `vp install` installs dependencies using the detected workspace package manager.
- `vpr` is shorthand for `vp run`.
- `vp run` executes package scripts and configured tasks.
- `vp check` runs formatting, linting, and type checking together.
- `vp fmt` formats files.
- `vp lint` lints files.
- `vp test` runs Vitest without staying in watch mode by default.
- `vp build` runs the Vite production build through Vite+.

Runtime plugins such as TanStack Start and Nitro are skipped in test mode. React, React Compiler, and Tailwind transforms still run for tests.

Relevant docs:

- [Vite+: Getting Started](https://viteplus.dev/guide/)
- [Vite+: Create](https://viteplus.dev/guide/create)
- [Vite+: Installing Dependencies](https://viteplus.dev/guide/install)
- [Vite+: Run](https://viteplus.dev/guide/run)
- [Vite+: Check](https://viteplus.dev/guide/check)
- [Vite+: Format](https://viteplus.dev/guide/fmt)
- [Vite+: Lint](https://viteplus.dev/guide/lint)
- [Vite+: Test](https://viteplus.dev/guide/test)
- [Vite+: Build](https://viteplus.dev/guide/build)
- [Vite+: Task Caching](https://viteplus.dev/guide/cache)
- [Vite+: IDE Integration](https://viteplus.dev/guide/ide-integration)
- [Vite+: Continuous Integration](https://viteplus.dev/guide/ci)
- [Vite+: Composing Configuration Files](https://viteplus.dev/guide/monorepo#composing-configuration-files)
- [OXC: Linter Configuration](https://oxc.rs/docs/guide/usage/linter/config.html)
- [Vitest: Getting Started](https://vitest.dev/guide/)
- [React Compiler: Installation](https://react.dev/learn/react-compiler/installation)

## CI

The Ready workflow runs on pull requests, pushes to `main`, and manual dispatch.

It uses Vite+ to:

1. install dependencies
2. restore the Vite+ task cache and build output
3. run `vp run ready`

Cached paths:

```txt
node_modules/.vite
node_modules/.vite-temp
dist
.output
```

Build output is restored with the task cache because generated output directories are excluded from task inputs.

Local verification should use:

```sh
vpr ready
```

Relevant docs:

- [Vite+: Continuous Integration](https://viteplus.dev/guide/ci)
- [Vite+: Task Caching](https://viteplus.dev/guide/cache)

## GitHub Templates

This repository includes scoped GitHub templates for planning and review:

- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/ISSUE_TEMPLATE/task.yml`

Use these templates to keep issues and pull requests focused on one concern.

Relevant docs:

- [GitHub: Configuring issue templates](https://docs.github.com/en/issues/tracking-your-work-with-issues/configuring-issues/configuring-issue-templates-for-your-repository)
- [GitHub: About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)

## Agent Instructions

Repository-specific agent instructions live in:

```txt
AGENTS.md
```

Use `AGENTS.md` to keep coding agents aligned with this template's boundaries, commands, verification expectations, and release workflow.

## Deployment

Nitro is wired through `nitro/vite`.

No Nitro preset is forced, and no deployment-specific production start script is included. Choose the preset and runtime script when a project picks a hosting target.

Relevant docs:

- [TanStack Start: Hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Nitro: Introduction](https://nitro.build/docs)

## Handbook References

This template follows Blaze's engineering handbook:

- [Handbook](https://github.com/blazeshomida/handbook)
- [Standards](https://github.com/blazeshomida/handbook/tree/main/standards)
- [Templates](https://github.com/blazeshomida/handbook/tree/main/templates)
