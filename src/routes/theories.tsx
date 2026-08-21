import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/theories")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
