import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';
// const PolyfillPlugin = require('node-polyfill-webpack-plugin');

export default defineConfig({
  plugins: [pluginNodePolyfill(), pluginReact()],
  output: {
    assetPrefix: './'
  },
  source: {
    alias: {
      '@': './src'
    }
  },
  tools: {
    rspack: {
      resolve: {
        fallback: {
          encoding: false
        }
      }
    }
  }
});
