const path = require('path');
const fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  chainWebpack: config => {
    config.resolve.alias
    .set('@services', resolve('src/middleware/services'))
    .set('@mdw', resolve('src/middleware'))
    .set('@cmp', resolve('src/components'))
    .set('@mixin', resolve('/src/helper/mixins'))
  }
}
