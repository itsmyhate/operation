const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const utils = require('./utils');
const webpack  = require('webpack');
const pkg = require('../package.json');

module.exports = {
    resolve: {
        /*
            * 不要把项目中不可能存在的情况写到后缀尝试列表中频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程；
            * 在源码中写导入语句时，尽可能的带上后缀，避免寻找过程
            * */
        extensions: ['.vue','.js', '.ts'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': utils.resolve('src'),
            // 'assets': utils.resolve('assets'),
            // 'static': utils.resolve('static'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: [/node_modules/, /examples/]
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                /*options: {
                    preset: ['@babel/preset-env']
                },*/
                exclude: [/node_modules/, /examples/]
            }, {
                test: /\.(gif|jpg|png|woff|svg)\??.*$/,
                use: 'url-loader',
                exclude: [/node_modules/, /examples/]
            }, {
                test: /\.(ttf|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        /*options: {
                          name: '为你的文件配置自定义文件名模版',
                          context: '配置自定义文件的上下文,默认为webpack.config.js', // [path] 相对于这个目录的相对目录
                          pubilcPath: '为你的文件配置自定义public 发布目录', //可以设置域名
                          outputPath: '为你的文件配置自定义output输出目录'
                        },*/
                    }
                ],
                exclude: [/node_modules/, /examples/]
            }, {
                test: /\.(html|tpl)$/,
                loader: 'html-loader',
                exclude: [/node_modules/, /examples/]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`
        }),
        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            // Util: "exports-loader?Util!bootstrap/js/dist/util",
            // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        })*/
    ]
};
