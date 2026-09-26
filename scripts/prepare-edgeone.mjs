import { prepareStaticPages } from "./prepare-github-pages.mjs";

const publicUrl = (process.env.VITE_PUBLIC_URL || "https://archive.batcavecn.com/").replace(/\/?$/, "/");
await prepareStaticPages(publicUrl);
