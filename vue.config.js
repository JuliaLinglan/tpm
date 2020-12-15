// vue.config.js
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

const webpack = require('webpack')
module.exports = {
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill'
        }]);
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        //const svgRule = config.module.rule('svg')
        //svgRule.uses.clear()
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },

    // baseUrl: '/',
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: '0.0.0.0',
        port: 8082, // 服务端口
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9060',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            },
        }
    },
}
