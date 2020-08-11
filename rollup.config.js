import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import resolve, { DEFAULTS } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';

import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

const config = {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'app',
    plugins: [
      html({
        publicPath: '/',
      }),
    ],
  },
  plugins: [
    svelte({
      dev: !production,
      emitCss: true,
      css: (css) => {
        css.write('dist/bundle.css');
      },
      preprocess: autoPreprocess({
        defaults: {
          script: 'typescript',
          style: 'scss',
        },
      }),
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: [...DEFAULTS.extensions, '.svelte'],
    }),
    postcss({
      extract: true,
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    !production &&
      serve({
        contentBase: 'dist',
        historyApiFallback: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
  ],
};

export default config;
