// webpack.config.js
var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: './src/js/awesome-cluster-map.js',
	output: {
		filename: 'awesome-cluster-map.min.js',
		path: 'dist/'
	},
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
						{ test: /\.png$/, loader: "url-loader?minetype=image/png" }
        ]
    },
	resolve: {
        root: [path.join(__dirname, "./src/js/bower_components")]
    },
	plugins: [
		new webpack.ResolverPlugin(
		  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
		)
	]
};
