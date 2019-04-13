const fs = require('fs');
const p = require('path');
const webpack = require('webpack');
const flatten = require('array-flatten')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack')
const {
    VueLoaderPlugin
} = require('vue-loader')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})
const config = {
    output: {
        path: p.resolve(__dirname, 'build'),
        filename: function (chunk) {
            var chunkName = chunk.chunk.name;
            return `${chunks(chunkName, 'js')}.[contenthash:8].js`;
        },
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.(html|php)$/,
                loader: 'html-loader' //处理图片
            },
            {
                test: /\.(js)$/,
                // exclude: /(node_modules)/,
                // include: [/(src)/, /(node_modules\/front-common)/],
                include: [/(src)/, /(node_modules)/],
                use: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
            },
              {
                  test: /\.(css)$/,
                  use: [{
                          loader: MiniCssExtractPlugin.loader,
                          options: {}
                      },
                      'vue-style-loader',
                      'css-loader',
                  ]
              },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.(png|svg|jpg|gif|svga|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: function (file) {
                            console.log(1231231231231231231)
                            var filename = file.replace(__dirname + '' + p.sep + 'src' + p.sep + '', ''); //去掉路径
                            filename = filename.split('.')[0] //去掉扩展名部分
                            console.log(filename)
                            console.log(file)
                            filename = filename.replace(/\\/g, "/");
                            return filename + '.[hash:8].[ext]';
                        }
                    }
                }]
            },
            {
                test: /\.(mp3|mp4)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: function (file) {
                            console.log('fileloader....')
                            var filename = file.replace(__dirname + '' + p.sep + 'src' + p.sep + '', ''); //去掉路径
                            filename = filename.split('.')[0] //去掉扩展名部分
                            console.log(filename)
                            console.log(file)
                            filename = filename.replace(/\\/g, "/");
                            return filename + '.[hash:8].[ext]';
                        }
                    }
                }]
            },
        ]
    },
    stats: {
        // Add asset Information
        assets: false,
        // Add children information
        children: false,

        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                nocommon:{
                    test: (module, chunk) => {
                        if (module.resource) {
                            return module.resource.includes('node_modules') && !module.resource.includes('front-common');
                        }
                    },
                     chunks: 'initial',
                     name: 'nocommon',
                     filename: 'nocommon.[hash:8].js',
                     priority: 10, // 优先
                     enforce: true
                },
                common: { // 将第三方模块提取出来
                    // test: /(node_modules)/,

                    // test: /(node_modules)/,
                    // test: /node_modules\/(?!front-common)/,
                    test: (module, chunk) => {
                        if (module.resource) {
                            //  if (module.resource.includes('node_modules') && module.resource.includes('front-common')) {
                            //      console.log('===============')
                            //      console.log(module.resource)
                            //  }
                            return module.resource.includes('node_modules') && module.resource.includes('front-common');
                        }
                    },
                    chunks: 'initial',
                    name: 'common',
                    filename: 'common.[hash:8].js',
                    priority: 10, // 优先
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: "./src/common",
            to: "./common"
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Vue: ['vue/dist/vue.min.js'],
            FastClick: 'fastclick',
            marked: 'marked',
            SVGA: "svgaplayerweb",
            Swiper: 'swiper'

        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new HappyPack({
            id: 'happy-babel-js',
            loaders: [{
                loader: 'babel-loader'
                // options: {
                //     presets: ['@babel/preset-env'], // presets设置的就是当前js的版本
                // }
            }],
            threadPool: happyThreadPool
        })
    ]
}

//生成不同的chunk name
const chunks = function (item, type) {
    let s = item.split(p.sep);
    s.splice(s.length - 1, 0, type); // js文件会放在 /js/ 目录下，所以如果 entry是 app/test/index, 那么这里会把js定位到 app/test/js/index.js 上
    let chunk = s.join("/");
    return chunk;
}

// entries 的格式是这样的，每一个表示一组html/js，比方说 app/advise/index 就代表了 app/advise/index.html 和 app/advise/js/index.js, 后一个js是 前一个html的 chunk, 将会在HtmlWebpackPlugin里使用到
// const entries = [
//   'app/advise/index',
//   'app/webpack-test/index',
// ]
const entries = [];


//生成入口
const injectEntry = function (config, entries) {
    //entry
    const entry = config.entry || {};
    entries.forEach((item) => {
        let chunk = chunks(item, 'js');
        entry[item] = '.' + p.sep + 'src' + p.sep + '' + chunk + '.js'
    })

    return entry;
}

//生成html
const injectHtml = function (config, entries) {
    //plugin
    const configPlugins = config.plugins || [];
    entries.forEach((item) => {
        const ext = fs.existsSync(`src${p.sep}${item}.php`) ? 'php' : 'html';

        const htmlPlugin = new HtmlWebpackPlugin({
            filename: p.resolve(__dirname, 'build', `.${p.sep}${item}.html`),
            template: `src${p.sep}${item}.${ext}`,
            chunks: ['common', 'nocommon', item ], //这里针对每个 entry 找到对应的js的chunk(通过chunks函数 )
            chunksSortMode: "manual",
            minify: true,
            xhtml: true,
        });

        configPlugins.push(htmlPlugin);
    });
    return configPlugins;
}

const files = p.resolve(__dirname, 'src');
//深度优先递归遍历
const walkingTree = function (files) {
    return flatten(files.map(file => {
        let stats = fs.statSync(file);
        if (stats.isFile()) {
            return file;
        } else if (stats.isDirectory()) {
            let subfiles = fs.readdirSync(file);
            return walkingTree(subfiles.map(subfile => {
                return p.join(file, subfile);
            }))
        }
    }));
}

//构建上面说的 entries 结构
walkingTree([files]).map(file => {
    if (file.match(/\.(html|php)$/)) {
        var entry = file.replace(__dirname + p.sep + 'src' + p.sep, ''); //去掉路径里前面的部分
        entry = entry.split('.')[0] //去掉扩展名部分
        entries.push(entry);
    }
})


config.entry = injectEntry(config, entries);
config.plugins = injectHtml(config, entries);


// console.log("___________" + JSON.stringify(config.entry))
// console.log("+++++++++++" + JSON.stringify(config.plugins))


module.exports = config;