'use strict';

const Service = require('egg').Service;

class Resource extends Service {
    // 过虑资源分类所对应的数目
    async filterResourceNum(resourceType, resource) {
        return resourceType.map(item => {
            let num = 0;
            for (const val of resource) {
                if (parseInt(item.id) === parseInt(val.resourcetypeid)) {
                    num++;
                }
            }
            item.dataValues.index = num;
            return item;
        });
    }

    async filterResourceType(resource, index) {
        return resource.filter(item => {
            return item.dataValues.resourcetypeid === parseInt(index);
        });
    }
}

module.exports = Resource;
