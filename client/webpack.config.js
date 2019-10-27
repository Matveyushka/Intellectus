module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: require.resolve('./tsconfig.json'),
          },
        }],
      },
    ],
  },
};
