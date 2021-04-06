'use strict';
module.exports = () => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body
    };
    await next();
  };
};
