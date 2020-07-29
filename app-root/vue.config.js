const path = require('path');
const { name } = require('./package');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const port = 4200; // dev port
/*const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    // 'app-component': 'API',
    'echarts': 'echarts',
}
const cdn = {
    css: [
        'https://unpkg.com/bootstrap@4.1.3/dist/css/bootstrap.min.css',
        'https://unpkg.com/app-constants-css@0.0.3/dist/css/index.css',
    ],
    js: [
        /!*'https://unpkg.com/vue@2.6.11/dist/vue.min.js',
        'https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js',
        'https://unpkg.com/zone.js@0.10.2/dist/zone.min.js',
        'https://unpkg.com/axios@0.19.2/dist/axios.min.js',
        'https://unpkg.com/echarts@4.7.0/dist/echarts.min.js',
        *!/
        // 'https://unpkg.com/app-component@0.3.0/dist/iview.js',
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/zone.js/0.10.2/zone.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js',
    ]
}*/
module.exports = {
    devServer: {
        port: port,
    },
    productionSourceMap: process.env.NODE_ENV !== 'production',
    /*chainWebpack: config => {
        config.set('externals', externals)
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args;
        })
    },*/
    configureWebpack: config => {
        // 开启 gzip 压缩
        // 需要 npm i -D compression-webpack-plugin
        const plugins = [];
        if (process.env.NODE_ENV === 'production') {
            plugins.push(
                new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: /\.(js|css)$/,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        config.plugins = [...config.plugins, ...plugins];
    },
}
