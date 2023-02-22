const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "bootstrap/dist/css/bootstrap.min.css"; @import "bootstrap";`,
      },
    },
  },
});
