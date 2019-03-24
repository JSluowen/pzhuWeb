const Controller = require('egg').Controller;

class Qiniu extends Controller{
    async getToken(){
        const {ctx} = this;
        try{
            let uploadToken = await ctx.service.qiniu.getToken('liuxing');
            ctx.status = 200;
            ctx.body={
                data:uploadToken
            }
        }catch(err){
            ctx.status=500;
            console.log(err);
        }
       
        
    }
}
module.exports = Qiniu;