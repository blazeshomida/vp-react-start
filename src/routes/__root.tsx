import "#/styles.css";
import type { ErrorComponentProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
});

const showRouterDevtools = import.meta.env.DEV;

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      {showRouterDevtools ? <TanStackRouterDevtools /> : null}
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFoundComponent() {
  return (
    <main>
      <h1>Not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go home</Link>
    </main>
  );
}

function RootErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </main>
  );
}
