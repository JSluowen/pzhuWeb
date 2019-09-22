'use strict';
const Service = require('egg').Service;
class BackUser extends Service {
    // 获取全员信息,先查询所有字段的信息（联合查询）然后根据模式匹配提取其中所需要的部分
    async gradeGroup(data) {
        console.log(data[0].dataValues.Domain);
        let one = 0,
            two = 0,
            three = 0,
            four = 0;
        for (let i = 0; i < data.length; i++) {
            const num = parseInt(data[i].dataValues.Domain.id);
            if (num === 1) {
                one = one + 1;
            } else if (num === 2) {
                two = two + 1;
            } else if (num === 3) {
                three = three + 1;
            } else if (num === 4) {
                four = four + 1;
            }
        }
        const all = one + two + three + four;
        const percentone = parseInt((one / all) * 100);
        const percenttwo = parseInt((two / all) * 100);
        const percentthree = parseInt((three / all) * 100);
        const percentfour = parseInt((four / all) * 100);
        const num = [percentone, percenttwo, percentthree, percentfour];
        return num;
    }

}
module.exports = BackUser;

