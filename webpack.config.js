const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, 'client'),
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            ENV: '"dev"',
            'process.env': {
                NODE_ENV: JSON.stringify('dev'),
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|build/,
                loader: 'babel-loader?cacheDirectory=true'
            }, {
                test: /\.(ttf|eot|woff|woff2|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
        ]
    }
};
