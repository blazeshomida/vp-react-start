import { createFileRoute } from "@tanstack/react-router";

import { seo } from "#/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Home",
      path: "/",
    }),
  component: HomeRoute,
});

function HomeRoute() {
  return <main>vp-react-start</main>;
}
