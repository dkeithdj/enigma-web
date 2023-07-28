import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sanity({
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: "production",
      useCdn: false,
      apiVersion: "2023-03-20",
    }),
  ],
});
