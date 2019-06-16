'use strict';
const Service = require('egg').Service;
class BackUser extends Service {
    // 获取全员信息,先查询所有字段的信息（联合查询）然后根据模式匹配提取其中所需要的部分
    async gradeGroup(data) {
        const date = new Date();
        const year = date.getFullYear();
        const arry = [year - 1, year - 2, year - 3, year - 4];
        let one = 0,
            two = 0,
            three = 0,
            four = 0;
        for (let i = 0; i < data.length; i++) {
            const num = parseInt(data[i].dataValues.id.substring(0, 4));
            if (num === arry[0]) {
                one = one + 1;
            } else if (num === arry[1]) {
                two = two + 1;
            } else if (num === arry[2]) {
                three = three + 1;
            } else if (num === arry[3]) {
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

