import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

const config = {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'app',
    plugins: [html()]
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('dist/bundle.css');
      },
      preprocess: autoPreprocess()
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    !production && serve('dist'),
  ],
};

export default config;
