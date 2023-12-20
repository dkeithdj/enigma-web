import { defineConfig, minimalPreset } from "@vite-pwa/assets-generator/config";
import type { Preset } from "@vite-pwa/assets-generator/config";

export const minimalPresetNoPadding: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, "favicon.ico"]],
  },
  maskable: {
    sizes: [512],
  },
  apple: {
    sizes: [180],
  },
};

export default defineConfig({
  preset: minimalPresetNoPadding,
  images: ["public/enigma_v3.svg"],
});
