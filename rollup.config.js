import resolve from 'rollup-plugin-node-resolve';
import butternut from 'rollup-plugin-butternut';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = process.env.NODE_ENV === 'prod';

export default {
  input: 'src/index.js',
  output: {
    name: 'Billwise',
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression suitable for <script> tags
    sourcemap: !production
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    // commonjs(), // converts date-fns to ES modules
    buble({
    // target: { chrome: 52, firefox: 48 },
    // include: ['*.js'],
      jsx: 'h',
      objectAssign: 'Object.assign',
      transforms: {
        classes: true,
        modules: false
      },
      namedFunctionExpressions: false
    }),
    production && butternut(), // minify, but only in production
    replace({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ]
};
