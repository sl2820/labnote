module.exports = {
  configureWebpack: {
    // other webpack options to merge in ...
  },
  // devServer Options don't belong into `configureWebpack`
  devServer: {
    host: "143.248.190.114",
    hot: true,
    disableHostCheck: true
  }
};
