const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    devServer: {
        publicPath: 'http://localhost:8080/build/',
        proxy: {
            '/signup': 'http://localhost:3000',
            '/login': 'http://localhost:3000',
            '/getAll': 'http://localhost:3000'
          }
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            // 'es2015', 
                            // 'react',
                            // 'stage-2'
                        ]
                    },
                }
            },

            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                        'style-loader',
                        'css-loader'
                        // 'sass-loader'
                    ]
                },
            {
                test: /\.(ejs|html)$/,
                loader: [
                    'ejs-html-loader',
                    'ejs-loader',
                    'html-loader'
                ]
            },
        ],
    },
        plugins: [
            new HtmlWebpackPlugin({
                template: './client/components/index.ejs',
            }),
            // new HtmlWebpackPlugin({
            //     template: './client/components/signup.ejs'
            // })
        ]

}