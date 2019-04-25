const nodemailer = require('nodemailer');
const Service = require('egg').Service;

class Fun extends Service {
    //格式化学院专业的数据
    async getSchool(data) {
        function foo(data) {
            let node = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].dataValues.Majors) {
                    node.push({
                        value: data[i].dataValues.id,
                        label: data[i].dataValues.name,
                        children: foo(data[i].dataValues.Majors)
                    })
                } else {
                    node.push({
                        value: data[i].dataValues.id,
                        label: data[i].dataValues.name,
                    })

                }
            }
            return node;
        }
        return foo(data)
    }
}

module.exports = Fun;