import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// Shared config for all builds
const baseConfig = {
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    terser()
  ],
  external: [
    'react', 
    'react-dom', 
    '@mui/material', 
    '@mui/icons-material', 
    '@emotion/react', 
    '@emotion/styled'
  ]
};

// Main package
const mainConfig = {
  ...baseConfig,
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ]
};

// Demo component (separate bundle)
const demoConfig = {
  ...baseConfig,
  input: 'src/demo.js',
  output: [
    {
      file: 'dist/demo.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/demo.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: [
    ...baseConfig.external,
    './index' // Reference to main package
  ]
};

// TypeScript types
const typesConfig = {
  input: 'src/index.js',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
      emitDeclarationOnly: true
    })
  ],
  external: baseConfig.external
};

export default [mainConfig, demoConfig, typesConfig];