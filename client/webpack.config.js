module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        use: ['ts-loader'],
      },
    ],
  },
};
