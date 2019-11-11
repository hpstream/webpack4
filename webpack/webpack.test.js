const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const fs = require('fs');
const common = require('./webpack.common.js');

const config = require('../config/index.js');
const root = config.common.root;
const cleanOptions = "./build"; //需要清除的目录
const vConsole = require("../plugins/vConsole.js");
const seen = new Set();
var flga = true;
module.exports = function () {
	return merge(common, {
		mode: 'development',
		optimization: {
			// minimize:false
		},
		output: {
			publicPath: config.test.publicPath
		},
		plugins: [
			new CleanWebpackPlugin(cleanOptions, {
				root: root
			}),
			new webpack.NamedChunksPlugin(chunk => {
				if (chunk.name) {
					return chunk.name
				}
				const modules = Array.from(chunk.modulesIterable)
				if (modules.length > 1) {
					const hash = require('hash-sum')
					var joinedHashstring = modules.map(m => {
						if (!m._buildHash) {
							return m.content;
						}
						return m._buildHash
					}).join('_');

					var joinedHash = hash(joinedHashstring);

					while (seen.has(joinedHash)) {
						joinedHashstring += Math.random();
						joinedHash = hash(joinedHashstring);					
					}
					seen.add(joinedHash)
					return `modules-${joinedHash}`
				} else {
					return modules[0].id
				}
			}),
			// keep module.id stable when vender modules does not change
			new webpack.HashedModuleIdsPlugin(),
			new OptimizeCssAssetsPlugin(),
			new vConsole()
		]
	})
};
