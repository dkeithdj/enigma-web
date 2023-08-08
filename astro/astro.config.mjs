import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from "astro-sanity";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://um-cce-enigma.vercel.app",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  adapter: netlify(),
});
