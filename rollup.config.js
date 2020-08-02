import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import resolve, { DEFAULTS } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'dotenv';
import replace from '@rollup/plugin-replace';

dotenv.config();

if (typeof process.env.AUTH0_DOMAIN === 'undefined') {
  throw new Error('Missing AUTH0_DOMAIN in env.');
}

if (typeof process.env.AUTH0_CLIENT_ID === 'undefined') {
  throw new Error('Missing AUTH0_CLIENT_ID in env.');
}

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
    replace({
      'process.env.AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(
        process.env.AUTH0_CLIENT_ID
      ),
    }),
    svelte({
      dev: !production,
      css: (css) => {
        css.write('dist/bundle.css');
      },
      preprocess: autoPreprocess({
        defaults: {
          script: 'typescript',
          css: 'scss',
        },
      }),
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: [...DEFAULTS.extensions, '.svelte'],
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
