const Service = require('egg').Service; 
class backUser extends Service {
    //获取全员信息,先查询所有字段的信息（联合查询）然后根据模式匹配提取其中所需要的部分
    async all () {
        const {ctx} = this; 
        let allList = []; 
        try {
            allList = await ctx.model.UserInfo.findAll( {
                attributes:['phone','description'],
                include:[ 
                    {
                        attributes:['id','name','email'],
                        model:ctx.model.User, 
                   },
                   {
                    model:ctx.model.School,
                    attributes:['name'],
                   },
                   {
                    model:ctx.model.Major,
                    attributes:['name'],    
                   },
                ]
            }); 
        }catch(e) {
            console.log("error in service  backUser of all function :"); 
            console.log(e); 
        }

        return allList; 
    }
    //获取申请成员信息 status = 0
    async apply() {
        const {ctx} = this; 
        let apply = []; 
        try {
            apply = await ctx.model.User.findAll( {
                attributes:['id', 'name', 'created_at'], 
                where: {status:0}
            }); 
        }catch(e) {
            console.log("error in service  backUser of apply function :"); 
            console.log(e); 
        }
        return apply; 
    }
    // 获取成员的详细信息
    // 数据内容包括，文章（数量，评论数）成果（）详细信息（姓名，学号，头像，描述，研究方向，）加入团队的时间（create_data）
    
    async info(userid) {
        const {ctx} = this; 
        let data = null; 
        try {
            // 此处比较复杂，根据要做联合查询，将所有的相关信息全部提取并返回。目前没有找到合适的匹配字段查询模式，暂且将数据全部返回到前端，前端处理数据。为了更快
            data = await ctx.model.UserInfo.findAll( {
                 attributes:['phone','avatar','description'],
                where: {
                    id:userid
                }, 
                include:[ {
                        model:ctx.model.School, 
                        attributes:['name'],
                    }, {
                        model:ctx.model.Major, 
                        attributes:['name'],
                    }, {
                        model:ctx.model.Article,
                        attributes:['title','publish_time','read_number','technology_id'],
                        include:[
                            {model:ctx.model.Technology,attributes:['name']}
                        ]
                    }, {
                        model:ctx.model.User,
                        attributes:['id','name','email','created_at']
                    }, {
                        model:ctx.model.Achievement,
                        attributes:['title','publish_time'],
                        include:[
                            {
                                model:ctx.model.AchievementType,
                                attributes:['name']}
                        ]
                    }
            ]
            }); 
        }catch(e) {
            console.log("error in service  backUser of info function :"); 
            console.log(e); 
        }
        return data; 
    }
    //执行删除用户时的，软删除操作，status：-1
    async softDeleteOne(userid) {
        //获取用户，修改 status：-1 
        const {ctx} = this; 
        let flag = false; 
        try {
            let user = await ctx.model.User.findById(userid); 
            //await ctx.model.user.updata({})
            if (user) {
                await user.update( {status:-1}); 
                flag = true; 
            }
        }catch(e) {
            console.log("error in service  backUser of softDeleteOne  function :"); 
            console.log(e); 
        }
        return flag; 
    }

    async agree(userid) {
        //获取用户，修改 status：-1 
        const {ctx} = this; 
        let flag = false; 
        try {
            let user = await ctx.model.User.findById(userid); 
            //await ctx.model.user.updata({})
            if (user) {
                await user.update( {status:1}); 
                flag = true; 
            }
        }catch(e) {
            console.log("error in service  backUser of softDeleteOne  function :"); 
            console.log(e); 
        }
        return flag; 
    }

}
module.exports = backUser; 
