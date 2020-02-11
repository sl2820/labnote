// module.exports = {
//   configureWebpack: {},
//   devServer: {
//     host: "192.168.0.4",
//     hot: true,
//     disableHostCheck: true
//   },
//   transpileDependencies: ["vuetify"]
// }

module.exports = {
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: "파일경로"
  //     } 전역번수를 만들어서 쓸 수 있움.. scss.
  //   }
  // },
  publicPath: process.env.NODE_ENV === "production" ? "/labnote/" : "/"
}
