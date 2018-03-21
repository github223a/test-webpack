import path from 'path';
import HtmlWebpackPlugin from'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appHtml = resolveApp('src/index.html');

module.exports = {
  mode: 'development',
  entry: { // указываем источники файлов свои
    app: './src/index.js',
  },
  devtool: 'inline-source-map', // при ошибках будет показывать файл-источник, а не просто bunlde.js
  devServer: {
    contentBase: './dist' // вебпак сервер, тут же настраивается хот-релоад
  },
  output: {
    filename: '[name].bundle.js', // название файла выхода
    path: path.resolve(__dirname, 'dist'), // путь выхода
      publicPath: "/" //
  },
  plugins: [
      new CleanWebpackPlugin(['dist']), // очищает перед сборкой папку дист
      new HtmlWebpackPlugin({ // Эта штука для автогенерации в хтмл файл твоих файлов
          inject: true,
          template: appHtml
      })
  ],
    module: { // Подключение загрузчиков, чтобы вебпак мог обрабатывать файлы разных форматов
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
  //     {
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader'],
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif)$/,
  //       use: ['file-loader'],
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/,
  //       use: ['file-loader'],
  //     },
  //     {
  //       test: /\.(csv|tsv)$/,
  //       use: ['csv-loader'],
  //     },
  //     {
  //       test: /\.xml$/,
  //       use: ['xml-loader'],
  //     },
    ],
  },
};
