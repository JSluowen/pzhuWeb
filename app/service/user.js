const Service = require('egg').Service;

class UserService extends Service{
    async create(params){
        console.log(123)
        const {ctx} = this; 
        const user = await ctx.model.User.create(params);
        return user
    }
}
 
module.exports = UserService;