const Controller = require('egg').Controller;

class Register extends Controller{
    async uploadCode(){
        const {ctx} = this;
        ctx.body={
            message:'success'
        }
    }
    async registerUser(){
        const {ctx} = this;
        let val = ctx.request.body;
        let params = {
            id:val.schoolId,
            password:val.password,
            name:val.name
        }
        let res = await ctx.service.user.create(params);
        console.log(res);
    }

}
module.exports = Register;