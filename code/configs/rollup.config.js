const { nodeResolve } = require('@rollup/plugin-node-resolve');
// const { terser } = require('rollup-plugin-terser');
const fsize = require('rollup-plugin-filesize');
const buble = require('@rollup/plugin-buble');
// const copy = require('rollup-plugin-copy');

module.exports = [{
  input: 'compiled/main.js',
  output: {
    file: 'main.js',
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
}, {
  input: 'compiled/app.js',
  output: {
    file: 'app.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve(),
    buble({
      objectAssign: 'Object.assign'
    }),
    //terser(),
    // copy({
    //   targets: []
    // }),
    fsize()
  ]
}, {
  input: 'compiled/app-preload.js',
  output: {
    file: 'preload.js',
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
  }, {
  input: 'compiled/app-backend.js',
  output: {
    file: 'backend.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    buble({
      objectAssign: 'Object.assign'
    }),
    //terser(),
    // copy({
    //   targets: []
    // }),
    fsize()
  ]
}];