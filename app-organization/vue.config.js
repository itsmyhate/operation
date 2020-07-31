const path = require('path');
const { name } = require('./package');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const port = 4202; // dev port
const externals = {
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
        'https://unpkg.com/vue@2.6.11/dist/vue.min.js',
        'https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js',
        'https://unpkg.com/zone.js@0.10.2/dist/zone.min.js',
        'https://unpkg.com/axios@0.19.2/dist/axios.min.js',
        // 'https://unpkg.com/app-component@0.3.0/dist/iview.js',
        'https://unpkg.com/echarts@4.7.0/dist/echarts.min.js'
    ]
}

module.exports = {
    devServer: {
        port: port,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    productionSourceMap: process.env.NODE_ENV !== 'production',
    /*
    chainWebpack: config => {
        config.set('externals', externals)
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args;
        })
    },*/
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
                prependData: `@import "~@/assets/css/common.scss"`
            },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `prependData` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            scss: {
                prependData: `@import "~@/assets/css/common.scss";`
            },
            // 给 less-loader 传递 Less.js 相关选项
            less:{
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff'
                }
            }
        }
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
        // 开启 gzip 压缩
        // 需要 npm i -D compression-webpack-plugin
        /*const plugins = [];
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
        config.plugins = [...config.plugins, ...plugins];*/
    },
}
