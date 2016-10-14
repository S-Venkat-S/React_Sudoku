var path = require('path');
var srcPath = path.resolve(__dirname, 'app');
module.exports = {
    context: __dirname + "/app",
    entry: "./app.jsx",
    entry: {
        javascript: "./app.jsx",
        html: "./index.html",
    },
    output: {
        filename: "app.js",
        path: __dirname + "/dist",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }, {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"],
            },
            { 
              test: /\.css$/, 
              include: srcPath, 
              exclude: /node_modules/, 
              loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local] [hash:base64:5]&so    urceMap!postcss-loader' 
            }
        ],
    }
}
