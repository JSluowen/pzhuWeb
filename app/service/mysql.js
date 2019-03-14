const Service = require('egg').Service;

class UserService extends Service {
    async create(params, table) {
        const {
            ctx
        } = this;
        const result = await ctx.model[table].create(params);
        return result;
    }
    async findById(params, table) {
        const {
            ctx
        } = this;
        const result = await ctx.model[table].findById(params)
        return result;
    }
}

module.exports = UserService;