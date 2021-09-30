const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const buble = require('@rollup/plugin-buble');
const fsize = require('rollup-plugin-filesize');

module.exports = {
  input: 'compiled/app.js',
  output: {
    file: 'app.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    buble({
      objectAssign: 'Object.assign'
    }),
    //terser(),
    fsize()
  ]
};