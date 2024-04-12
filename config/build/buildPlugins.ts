import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';

export function buildPlugins(
  htmlPath: string
): webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: htmlPath,
      filename: 'index.html',
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ESLintPlugin({ extensions: ['ts, tsx'] }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new NodePolyfillPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ];
}
