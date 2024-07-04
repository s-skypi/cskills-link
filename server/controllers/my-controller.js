'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('cskills-link')
      .service('myService')
      .getWelcomeMessage();
  },
});
