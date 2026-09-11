import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/map")({
  beforeLoad: () => {
    throw redirect({
      to: "/places",
      search: true,
      hash: true,
      replace: true,
    });
  },
  component: () => null,
});
