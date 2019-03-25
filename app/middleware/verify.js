const jwt = require('jsonwebtoken');

module.exports = (option) => {
    return async function verify(ctx, next) {
        let token = ctx.header.authorization;
        jwt.verify(token, option.token, (err, decode) => {
            if (err) {
                ctx.status = 403;
            } else {
                next();
                ctx.status = 200
            }
        })

    }
}