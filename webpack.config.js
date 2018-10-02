const HtmlWebPackPlugin = require("html-webpack-plugin");
const createLodashAliases = require("lodash-loader").createLodashAliases;
module.exports = {
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{ test: /\.js$/, loader: "babel-loader!lodash-loader"},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}
		]
	},
	resolve: {
		alias: createLodashAliases()
	},
	devServer: {
		contentBase: "./dist"
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
