const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), './app/js', 'index.js'),
		customizer: path.resolve(process.cwd(), './app/js', 'customizer.js'),
		navigation: path.resolve(process.cwd(), './app/js', 'navigation.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, './build' ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules
		],
	},
};