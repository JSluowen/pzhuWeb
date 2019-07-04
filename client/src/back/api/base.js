const base = {
    getadminInfo: '/back/getadminInfo',// 获取管理员的信息
    getUserInfo: '/back/getUserInfo',//获取用户信息
    adminLogin: '/back/adminLogin',//管理员后台登录
    userReviewPass: '/back/userReviewPass',//用户审核通过
    userRefuseJoin: '/back/userRefuseJoin',// 拒绝用户加入
    deleteUser: '/back/deleteUser',// 删除成员信息
    getAddUserInfo: '/back/getAddUserInfo',// 获取添加和修改成员的信息
    updateUserInfo: '/back/updateUserInfo',// 更新用户信息
    addUserInfo: '/back/addUserInfo', //添加成员信息 
    //文章管理模块的接口
    getArticleInfo: '/back/getArticleInfo',// 获取文章信息
    istop: '/back/istop',//文章是否置顶
    deleteArticle: '/back/deleteArticle',// 是否确认删除该文章
    onSerachArticle: '/back/onSerachArticle',//搜索文章
    delArticleTag: '/back/delArticleTag',// 删除文章
    addArticleTag: '/back/addArticleTag',// 添加技术标签
    // 资源模块管理模块接口
    getResourceInfo: '/back/getResourceInfo',// 获取资源信息
    delResource: '/back/delResource',// 删除资源信息
    addResourceTag: '/back/addResourceTag',//添加资源类别
    delResourceTag: '/back/delResourceTag',// 删除资源类别
    onSerachResource: '/back/onSerachResource',//搜索资源信息
    // 成果管理模块的接口
    getAchievementInfo: '/back/getAchievementInfo',// 获取成果信息
    delAchievement: '/back/delAchievement',//删除成果信息
    addAchievementTag: '/back/addAchievementTag',//添加成果类别
    delAchievementTag: '/back/delAchievementTag',//添加成果信息
    onSerachAchievement: '/back/onSerachAchievement'//搜索成果
}
export default base;