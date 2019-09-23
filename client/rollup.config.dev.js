import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    typescript(),
    serve({
      open: true,
      contentBase: '',
      historyApiFallback: true,
      port: 9000,
    }),
    livereload(),
  ]
}
