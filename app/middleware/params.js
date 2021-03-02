module.exports = options => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body
    }
    await next();
  };
};