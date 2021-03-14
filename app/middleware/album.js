module.exports = options => {
  const ADMIN = 3
  return async function params(ctx, next) {
    const { request } = ctx
    if (request.method === 'GET' || !request.url.includes('album') || (request.url.includes('album') && ctx.session.auth === ADMIN)) {
      await next()
    } else {
      ctx.status = 401
    }
  };
};