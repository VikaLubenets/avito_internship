import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig({
  mode,
  paths,
  isDev,
  port,
}: BuildOptions): webpack.Configuration {
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: 'bundle.js',
      path: paths.build,
      publicPath: '/',
      clean: true,
    },
    resolve: buildResolvers(),
    module: {
      rules: buildLoaders(isDev),
    },
    plugins: buildPlugins(paths.html),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(port) : undefined,
  };
}
