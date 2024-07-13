/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { resolve } from 'path';
import common from './webpack.common.mjs';

export default merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
        assetModuleFilename: '[name].[contenthash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            '...',
        ],
    },
});
