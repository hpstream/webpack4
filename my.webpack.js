const HWebpack = require('./lib/index');

HWebpack({
    entry: './src/index.js',
    output: {
        path: 'dist'
    }
})
;
