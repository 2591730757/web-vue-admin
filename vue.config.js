// Vue.config.js
const path = require('path');
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: (config) => {

    },
    configureWebpack: (config) => {

    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 css source map？
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
        // 启用 css modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // 编译完成是否打开网页
        open: false,
        // 指定使用地址，默认localhost，0.0.0.0代表可以被外界访问
        host: '0.0.0.0',
        // 访问端口
        port: 8080,
        // 编译失败是刷新页面
        https: false,
        // 开启热加载
        hot: true,

        hotOnly: false,
        // 设置代理
        proxy: null,
        // 全屏模式下是否显示脚本错误
        overlay: {
            warnings: true,
            errors: true
        },
        before: app => {

        }
    },
    // 第三方插件配置
    pluginOptions: {}
}