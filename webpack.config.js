const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'js', 'index.js'),
		customizer: path.resolve(process.cwd(), 'js', 'customizer.js'),
		navigation: path.resolve(process.cwd(), 'js', 'navigation.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'js/build' ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules
		],
	},
};