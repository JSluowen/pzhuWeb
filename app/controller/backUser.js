'use strict';
const Controller = require('egg').Controller;

class BackUser extends Controller {
    async getUserInfo() {
        console.log(123456);
    }
}
module.exports = BackUser;
