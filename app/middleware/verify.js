'use strict';
const jwt = require('jsonwebtoken');

module.exports = option => {
  return async function verify(ctx, next) {
    const token = ctx.header.authorization;
    if (token) {
      const { data } = jwt.decode(token)
      ctx.session.userid = data.id
      ctx.session.auth = data.status
    }
    
    await next();

  };
};
