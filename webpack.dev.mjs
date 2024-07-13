/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import common from './webpack.common.mjs';

const { loader } = MiniCssExtractPlugin;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const _dirname = path.dirname(__filename); // get the name of the directory

export default merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    output: {
        path: path.resolve(_dirname, 'dev'),
        filename: '[name].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({}),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [loader, 'css-loader'],
            },
        ],
    },
});
