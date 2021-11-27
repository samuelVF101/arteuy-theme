const defaultConfig = require('@wordpress/scripts/config/webpack.config')
const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), './app/js', 'index.js'),
		customizer: path.resolve(process.cwd(), './app/js', 'customizer.js'),
		navigation: path.resolve(process.cwd(), './app/js', 'navigation.js'),
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, './build'),
	},
	module: {
		...defaultConfig.module,
		rules: [...defaultConfig.module.rules],
	},
	plugins: [
		...defaultConfig.plugins,
		new WebpackManifestPlugin({
			basePath: '',
			fileName: 'manifest.json',
			filter: undefined,
			generate: undefined,
			map: undefined,
			publicPath: '',
			removeKeyHash: '/([a-f0-9]{32}.?)/gi',
			seed: {},
			sort: undefined,
			useEntryKeys: false,
			useLegacyEmit: false,
			writeToFileEmit: false,
		}),
	],
}
