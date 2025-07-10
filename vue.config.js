const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:8101/", //后端接口的根目录
        changeOrigin: true,
      },
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
