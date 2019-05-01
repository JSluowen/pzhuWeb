'use strict';

const Service = require('egg').Service;

class Fun extends Service {
    // 格式化学院专业的数据
    async getSchool(data) {
        function foo(data) {
            const node = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].dataValues.Majors) {
                    node.push({
                        value: data[i].dataValues.id,
                        label: data[i].dataValues.name,
                        children: foo(data[i].dataValues.Majors),
                    });
                } else {
                    node.push({
                        value: data[i].dataValues.id,
                        label: data[i].dataValues.name,
                    });
                }
            }
            return node;
        }
        return foo(data);
    }
    // 过虑资源分类所对应的数目
    async filterTypeNum(Type, data) {
        return Type.map(item => {
            let num = 0;
            for (const val of data) {
                if (parseInt(item.id) === parseInt(val.typeid)) {
                    num++;
                }
            }
            item.dataValues.index = num;
            return item;
        });
    }
    async filterType(resource, index) {
        return resource.filter(item => {
            return item.dataValues.typeid === parseInt(index);
        });
    }
}

module.exports = Fun;
