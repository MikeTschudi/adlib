import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('../package.json');
const copyright = `/**
* ${pkg.name} - v${pkg.version} - ${new Date().toString()}
* Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} / Esri
* ${pkg.license}
*/`;

export default {
  input: `lib/${pkg.name}.js`,
  output: {
    format: 'umd',
    name: pkg.name,
    banner: copyright
  },
  plugins: [
    nodeResolve({ main: true }),
    commonjs(),
    buble()
  ]
};
