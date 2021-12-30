const defaultConfig = require('@wordpress/scripts/config/webpack.config')
const path = require('path')

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
	...defaultConfig,
	entry: {
		index: {
			import: path.resolve(process.cwd(), './app', 'index.js'),
		},
		customizer: {
			import: path.resolve(process.cwd(), './app', 'customizer.js'),
		},
		navigation: {
			import: path.resolve(process.cwd(), './app', 'navigation.js'),
		},
		gutenberg_blocks: {
			import: path.resolve(process.cwd(), './app', 'gutenberg_blocks.js'),
		},
		gutenberg_blocks_style: {
			import: path.resolve(
				process.cwd(),
				'./app/sass',
				'gutenberg_blocks_style.scss'
			),
		},
		gutenberg_blocks_editor: {
			import: path.resolve(
				process.cwd(),
				'./app/sass',
				'gutenberg_blocks_editor.scss'
			),
		},
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, './build'),
		clean: true,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext][query]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[contenthash][ext][query]',
				},
			},
		],
	},
	optimization: {
		...defaultConfig.optimization,
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
