import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const mode = env?.mode || 'development';
  const isDev = mode === 'development';

  const config = {
    mode: mode,
    entry: path.resolve(__dirname, 'src', 'app', 'App.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
                outputPath: '.',
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      ...(!isDev ? [new MiniCssExtractPlugin()] : []),
    ],
    optimization: !isDev
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : {},
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev
      ? {
          port: 3000,
          open: true,
          historyApiFallback: true,
          hot: true,
        }
      : undefined,
  };

  return config;
};
