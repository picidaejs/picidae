import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { existsSync } from 'fs';
import { join } from 'path';
import autoprefixer from 'autoprefixer';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import notifier from 'node-notifier';

import getBabelCommonConfig from './getBabelCommonConfig';
/* eslint quotes:0 */

export default function getWebpackCommonConfig(args) {
    const pkgPath = join(args.cwd, 'package.json');
    const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

    const jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
    const cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
    const commonName = args.hash ? 'common-[chunkhash].js' : 'common.js';

    const silent = args.silent === true;
    const babelOptions = getBabelCommonConfig();

    const postcssOptions = {
        sourceMap: true,
        plugins: [
            autoprefixer({
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
            }),
        ],
    };

    const emptyBuildins = [
        'child_process',
        'cluster',
        'dgram',
        'dns',
        'fs',
        'module',
        'net',
        'readline',
        'repl',
        'tls',
    ];

    const browser = pkg.browser || {};

    const node = emptyBuildins.reduce((obj, name) => {
        if (!(name in browser)) {
            return { ...obj, ...{ [name]: 'empty' } };
        }
        return obj;
    }, {});

    const config = {
        // babel: babelOptions,
        cache: true,
        postcss: postcssOptions,

        output: {
            path: join(process.cwd(), './dist/'),
            filename: jsFileName,
            chunkFilename: jsFileName,
        },

        devtool: args.devtool || 'source-map',

        resolve: {
            // modules: ['node_modules', join(__dirname, '/../../../node_modules')],
            // root: ['node_modules', join(__dirname, '/../../../node_modules')],
        },

        entry: pkg.entry,

        node,

        module: {
            // noParse: [/moment.js/],
            loaders: [
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'postcss', 'less'])
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'postcss'])
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: [
                        /(node_modules|bower_components)/,
                    ],
                    options: babelOptions,
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'application/font-woff',
                    },
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'application/font-woff',
                    },
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'application/octet-stream',
                    },
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'application/vnd.ms-fontobject',
                    },
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'image/svg+xml',
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
                {
                    test: /\.html?$/,
                    loader: 'file-loader',
                    options: {
                    },
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', commonName),
            new ExtractTextPlugin(cssFileName, {
                // filename: cssFileName,
                disable: false,
                allChunks: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new CaseSensitivePathsPlugin(),
            new FriendlyErrorsWebpackPlugin({
                onErrors: (severity, errors) => {
                    if (silent) return;
                    if (severity !== 'error') {
                        notifier.notify({
                            title: 'picidae',
                            message: 'warn',
                            // contentImage: join(__dirname, '../assets/warn.png'),
                            sound: 'Glass',
                        });
                        return;
                    }
                    const error = errors[0];
                    notifier.notify({
                        title: 'picidae',
                        message: `${severity} : ${error.name}`,
                        subtitle: error.file || '',
                        // contentImage: join(__dirname, '../assets/fail.png'),
                        sound: 'Glass',
                    });
                },
            }),
        ],
    };

    return config;
}
