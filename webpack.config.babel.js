import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appHtml = resolveApp('src/index.html');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});
const cleanDist = new CleanWebpackPlugin(['dist']);
const connectHtml = new HtmlWebpackPlugin({ inject: true, template: appHtml });


module.exports = {
  entry: { // указываем источники файлов свои
    app: './src/index.js',
  },
  devtool: 'inline-source-map', // при ошибках будет показывать файл-источник, а не просто bunlde.js
  devServer: {
    contentBase: './dist' // вебпак сервер, и хот-релоад если нужно
  },
  output: {
    filename: '[name].js', // название файла выхода
    path: path.resolve(__dirname, 'dist'), // путь выхода
    publicPath: '/' //
  },
  resolve: { // Эта штука разрешила заимпортить компоненты
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    cleanDist, // очищает перед сборкой папку дист
    connectHtml, // Эта штука для подключения в хтмл чего-либо
    extractSass // подключаем sass и из
  ],
  module: { // Подключение загрузчиков, чтобы вебпак мог обрабатывать файлы разных форматов
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
};
