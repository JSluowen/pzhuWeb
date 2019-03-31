const Service = require('egg').Service;
class UserService extends Service {
    //插入数据
    async create(params, table) {
        const {
            ctx
        } = this;
        const result = await ctx.model[table].create(params);
        return result;
    }
    //通过ID查找数据
    async findById(params, table) {
        const {
            ctx
        } = this;
        const result = await ctx.model[table].findById(params)
        return result;
    }
    //条件查询
    async findAll(params, table) {
        const {
            ctx
        } = this;
        const result = await ctx.model[table].findAll(params)
        console.log(result)
        return result;
    }
}

module.exports = UserService;