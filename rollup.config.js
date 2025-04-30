// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Automatically externalize peerDependencies
      peerDepsExternal(),
      
      // Resolve node_modules
      resolve(),
      
      // Convert CommonJS modules to ES6
      commonjs(),
      
      // Compile TypeScript files
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: 'dist',
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist'],
        },
      }),
      
      // Transpile with Babel
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      
      // Minify bundle
      terser(),
    ],
    // Indicate which modules should be treated as external
    external: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
  
  // Special build for the demo
  {
    input: 'src/NotificationsDemo.jsx',
    output: [
      {
        file: 'dist/demo.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/demo.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      terser(),
    ],
    external: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      './NotificationsProvider',
    ],
  },
];