import { rename } from "node:fs/promises";

await rename("dist/server/index.mjs", "dist/server/index.js");
