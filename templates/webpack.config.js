const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: './index.html', to: 'index.html' }],
		}),
	],
}
