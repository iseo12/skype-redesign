const webpack = require('webpack')
const path = require('path')
const glob = require('glob-all')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
//const ManifestPlugin = require('webpack-manifest-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
//const inProduction = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: {
        main: [
            './js/main.js',
            './scss/main.scss'
        ],
        // vendor: [] // uncomment and add vendor packages to create vendor bundle
    },

    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                      { loader: 'css-loader', options: { importLoaders: 1} },
                      'postcss-loader', 'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },

            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     exclude: /node_modules/
            // },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin('[name].css'),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '**/*.html'))
        }),

        new StyleLintPlugin(),

        // new webpack.LoaderOptionsPlugin({
        //     minimize: inProduction
        // }),

        //new ManifestPlugin(),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                path.join(__dirname, '**/*.html'),
                path.join(__dirname, 'build/*')
            ],
            open: false,
            notify: false
        })
    ]
}

//if (inProduction) {
//     module.exports.plugins.push(
//         new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
//     )
// }
