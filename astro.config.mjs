import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    AstroPWA({
      mode: "development",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.ico"],
      registerType: "autoUpdate",
      manifest: {
        name: "UM Enigma",
        short_name: "UMEnigma",
        theme_color: "#0C6291",
        background_color: "#F1F9FE",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/404",
        navigateFallbackDenylist: [/^\/about/],
        globPatterns: [
          "**/*.{css,js,html,svg,png,ico,txt,woff2,json,astro,tsx,json}",
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      // devOptions: {
      //   enabled: true,
      //   navigateFallbackAllowlist: [/^\//],
      // },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
