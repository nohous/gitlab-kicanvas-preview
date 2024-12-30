const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gitlab-kicanvas-preview.js',
    library: {
      name: 'gitlabKicanvasPreview',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              experimentalDecorators: true
            }
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        include: /node_modules\/kicanvas/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { version: "2023-05" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    vue: 'Vue',
    '@gitlab/ui': '@gitlab/ui',
  },
};