import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.tsx',
  output: {
    file: './dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    typescript(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    commonJS({
      include: 'node_modules/**',
      namedExports: {
        'react': ['createElement', 'Component', 'StrictMode', 'Fragment'],
        'node_modules/react-is/index.js': ['isValidElementType'],
        'react-dom': ['render'],
      },
    }),
    terser(),
  ],
}
