import terser from '@rollup/plugin-terser';

export default {
  input: './assets/js/_main.js',
  output: {
    file: './assets/js/bundle.js',
    format: 'iife',
    name: 'Bundle',
    sourcemap: false
  },
  plugins: [terser()]
};
