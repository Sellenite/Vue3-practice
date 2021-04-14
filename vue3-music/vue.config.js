// additionalData = prependData
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和mixin，这样就不用全部文件都要再上面加如引用句子了
        prependData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    port: 8416,
    open: true
  }
}
