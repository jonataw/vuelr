// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';

const name = 'vuelr';
const entry = 'vuelr';

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vue/dist/vue.common',
  'codemirror',
  'codemirror/mode/vue/vue',
  'codemirror/lib/codemirror.css'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  'vue/dist/vue.common': '_Vue',
  codemirror: 'CodeMirror'
};

// Get browserslist config and remove ie from es build targets
const browsers = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));
const projectRoot = path.resolve(__dirname, '..');

const config = {
  input: `src/${entry}.ts`,
  external,
  plugins: {
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    },
    alias: {
      entries: [
        {
          find: '@',
          replacement: `${path.resolve(projectRoot, 'src')}`
        }
      ],
      customResolver: resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      })
    },
    vue: {
      css: true,
      template: {
        isProduction: true
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      skip: external
    },
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
};

const formats = [];

if (!argv.format || argv.format === 'es') {
  formats.push({
    ...config,
    input: `src/${entry}.esm.ts`,
    output: {
      name,
      dir: `dist`,
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      replace(config.plugins.replace),
      alias(config.plugins.alias),
      typescript({
        typescript: require('typescript'),
        module: 'esnext',
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          exclude: ['tests', 'docs']
        }
      }),
      json(),
      vue(config.plugins.vue),
      resolve(config.plugins.resolve),
      babel({
        ...config.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: browsers
            }
          ]
        ]
      }),
      commonjs(),
      copy({
        targets: [{ src: `src/${name}.d.ts`, dest: `dist` }]
      })
    ]
  });
}

if (!argv.format || argv.format === 'cjs') {
  formats.push({
    ...config,
    output: {
      name,
      dir: `dist`,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
      globals
    },
    plugins: [
      replace(config.plugins.replace),
      alias(config.plugins.alias),
      vue({
        ...config.plugins.vue,
        template: {
          ...config.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      resolve(config.plugins.resolve),
      commonjs(),
      babel(config.plugins.babel),
      terser()
    ]
  });
}

export default formats;
