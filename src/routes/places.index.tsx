import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/film";
import { GothamPlacesMap } from "@/routes/map";

export const Route = createFileRoute("/places/")({
  head: () => ({
    meta: [{ title: pageTitle("哥谭地点") }],
  }),
  component: GothamPlacesMap,
});
