const path = require('path');
const fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, dir);
}

let configure = {
  "transpileDependencies": [
    "vuetify"
  ],

  chainWebpack: config => {
    config.resolve.alias
    .set('@services', resolve('src/middleware/services'))
    .set('@dal', resolve('src/middleware/DAL'))
    .set('@mdw', resolve('src/middleware'))
    .set('@cmp', resolve('src/components'))
    .set('@mixin', resolve('/src/mixins'))
  }
};

if (process.env.NODE_ENV === 'development') {
  configure = Object.assign(configure, {
    configureWebpack: {
      devtool: 'source-map'
    },
  });
}
else {
  configure = Object.assign(configure, {
    productionSourceMap: false,
  });
}

module.exports = configure;
