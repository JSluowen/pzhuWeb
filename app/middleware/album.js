module.exports = options => {
  const ADMIN = 3
  return async function params(ctx, next) {
    const { request } = ctx
    
    if (
      request.method === 'GET' ||
      !request.url.includes('album') ||
      (request.url.includes('album') && ctx.session.auth === ADMIN) ||
      (request.url.includes('qiniu') && ctx.session.userid)
      // 以下是前系统设计原因，特殊处理
      
    ) {
      console.log(request.url)
      await next()
    } else {
      console.log(ctx.request.url+"  "+ ctx.request.method)
      ctx.status = 401
    }
  };
};