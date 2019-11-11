var fs = require('fs');
var https = require('https');
var json = {};
var needjson = [
    'app/pet/index.html',
    'app/payingMembers/index.html',
    'app/intimacy/index.html',
    'app/bag-new/index.html'
];
function createInfo(options) {
    // Configure your plugin with options...
    this.options = options;
}

createInfo.prototype.apply = function(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('createInfo', (data, cb) => {
            var assetJson = JSON.parse(data.plugin.assetJson);
            if (needjson.indexOf(data.plugin.childCompilationOutputName) > -1) {
                json[data.plugin.childCompilationOutputName] = assetJson;
            }
            cb(null, data);
        });
    });

    compiler.hooks.afterEmit.tapAsync('abc', (compilation, next) => {
        // compilation.outputOptions.publicPath = 'https://t1.zhuhuiyao.cn/web/front-app';
        if (compilation.outputOptions.publicPath.indexOf('web/front-app') === -1) {
            next();
            return;
        }
        var oldjson = compilation.outputOptions.publicPath + '/message.json?' + (new Date()).getTime();

        https.get(oldjson, (res) => {
            var str = '';
            res.on('data', (d) => {
                if (res.statusCode !== 200) {
                    next();
                    return;
                }
                str += d;
            });
            res.on('end', (d) => {
                var cuurentjson = {};
                try {
                    cuurentjson = JSON.parse(str.toString());
                    var pathurl = 'build/message.json';
                    var newjosn = Object.assign(cuurentjson, json);
                    var info = {};
                    for (var key in newjosn) {
                        if (needjson.indexOf(key) > -1) {
                            info[key] = newjosn[key];
                        }
                    }

                    fs.writeFileSync(pathurl, JSON.stringify(info));
                    next();
                } catch (e) {
                    next();
                    console.log(e);
                }
            });
        }).on('error', (e) => {
            console.log('------------------------------------');
            console.log(e);
            console.log('------------------------------------');
            next();
        });
    });
};

module.exports = createInfo;
