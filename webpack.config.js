var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {

    context: __dirname + "/src",
    devtool : debug ? "inline-sourcemap" : null,
    entry: './js/index.js',

    output: {
        path: __dirname + "/dist/",
        filename: "bundle.js"
    },

    module: {
        loaders: [

            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: []
                }
            },
            {
                test: /\.css?$/,
                loaders: ['style-loader', 'css-loader'],
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: []

};
