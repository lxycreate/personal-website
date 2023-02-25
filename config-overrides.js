// config-overrides.js
const {
    override,
    addDecoratorsLegacy,
    addWebpackAlias,
    addLessLoader,
    adjustStyleLoaders,
} = require("customize-cra");
const path = require("path");

module.exports = override(
    addDecoratorsLegacy(), // 配置装饰器
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
        ["@views"]: path.resolve(__dirname, "src/views"),
        ["@router"]: path.resolve(__dirname, "src/router"),
        ["@layout"]: path.resolve(__dirname, "src/layout"),
        ["@styles"]: path.resolve(__dirname, "src/styles"),
    }), // 配置别名
    addLessLoader(),
    adjustStyleLoaders(({ use }) => {
        const [, , postcss] = use;
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
        // 导入公共变量
        use.push({
            loader: "style-resources-loader",
            options: {
                patterns: path.resolve(__dirname, "src/styles/mixins.less"),
            },
        });
    })
);
