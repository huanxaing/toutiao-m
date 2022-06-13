/**
 * PostCSS 配置文件
 */

module.exports = {
    // 配置使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
        // vueCLI内部已经配置了 autoprefixer插件 所以这里不需要再配置
        // 'autoprefixer': { // autoprefixer 插件的配置
        //     // 配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >=8']
        // },
        // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转为 rem
        'postcss-pxtorem': {
            // lib-flexible 的 rem 适配方案：把一行分成10份
            // 所以rootValue 应该设置为你的设计稿宽度(这里的设计稿宽度是375)的十分之一
            // 我们的设计稿是 750 ，所以应该设置为 750/10=75
            // 但是 Vant 建议设置为37.5，因为 Vant 是基于 375写的
            // 但是有更好的办法
            // 如果是 Vant 的样式，就按照37.5来转换
            // 如果是 我们自己 的样式，就按照750来转换
            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // * 表示所以
            propList: ['*']
        }
    }
}