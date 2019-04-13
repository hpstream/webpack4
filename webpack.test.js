const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs');
const common = require('./webpack.common.js');

const basicPath = process.cwd().substring(process.cwd().lastIndexOf(path.sep) + 1);
const publicPath = "https://t1.kuaishebao.com/web/" + basicPath + "/"; //dev环境js和css的路径

const cleanOptions = "./build"; //需要清除的目录
const MyPlugin = require("./plugins/myplugin.js");
const vConsole = require("./plugins/vConsole.js");
module.exports = function () {
	return merge(common, {
		mode: 'production',
		output: {
			publicPath: publicPath
		},
		plugins: [
			new CleanWebpackPlugin(cleanOptions),
			new ParallelUglifyPlugin({
				cacheDir: '.cache/',
				// Optional regex, or array of regex to match file against. Only matching files get minified.
				// Defaults to /.js$/, any f÷

				uglifyES: {
					// These pass straight through to uglify-es.
					// Cannot be used with uglifyJS.
					// uglify-es is a version of uglify that understands newer es6 syntax. You should use this option if the
					// files that you're minifying do not need to run in older browsers/versions of node.
				}
			}),
			new OptimizeCssAssetsPlugin(),
			new MyPlugin({
				options: publicPath
			}),
			new vConsole()
		]
	})
};

// const merge = require('webpack-merge');

// module.exports = function () {
// 	const dev = require('./webpack.dev.js');
// 	console.log(dev().output.publicPath)
// 	const publicPath = dev().output.publicPath.replace(/tdev.kuaishebao.com/, "qiniuh5.wodidashi.com"); //测试环境js和css的路径

// 	return merge(dev, {
// 		mode: 'development',
// 		output: {
// 			publicPath: publicPath
// 		}
// 	})
// };