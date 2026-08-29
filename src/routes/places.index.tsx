import { createFileRoute } from "@tanstack/react-router";
import { GothamPlacesMap } from "@/components/gotham-places-map";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/places/")({
  head: () => ({
    meta: [{ title: pageTitle("哥谭地点") }],
  }),
  component: GothamPlacesMap,
});
