/* eslint-disable no-underscore-dangle */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const _dirname = path.dirname(__filename); // get the name of the directory

const common = {
    entry: {
        index: path.resolve(_dirname, 'src/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'Battleship',
                template: '/src/index.html',
                filename: 'index.html',
            },
        ),
    ],
};

export default common;
