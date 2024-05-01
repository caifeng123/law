import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  html: { title: '律师模版生成', favicon: resolve(__dirname, './static/favicon.svg') },
  plugins: [pluginNodePolyfill(), pluginReact()],
  output: { assetPrefix: './' },
  source: { alias: { '@': './src' } },
  tools: { rspack: { resolve: { fallback: { encoding: false } } } },
  performance: { chunkSplit: { strategy: 'split-by-module' } }
});
