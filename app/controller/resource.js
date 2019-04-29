const Controller = require('egg').Controller;

class Resource extends Controller{
    async getResource(){
        const {ctx} = this;
        console.log("我是资源列表")
    }
}

module.exports = Resource