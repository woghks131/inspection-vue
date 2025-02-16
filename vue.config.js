const target = 'http://127.0.0.1:8280';

module.exports = {
  devServer: {
    port:8180,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true
      }
    }
  }
}