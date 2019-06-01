const base = {
    getadminInfo: '/back/getadminInfo',// 获取管理员的信息
    getUserInfo: '/back/getUserInfo',//获取用户信息
    adminLogin: '/back/adminLogin',//管理员后台登录
    userReviewPass: '/back/userReviewPass',//用户审核通过
    userRefuseJoin: '/back/userRefuseJoin',// 拒绝用户加入
    deleteUser: '/back/deleteUser',// 删除成员信息
    getArticleInfo: '/back/getArticleInfo',// 获取文章信息
    istop: '/back/istop',//文章是否置顶
    deleteArticle: '/back/deleteArticle',// 是否确认删除该文章
    onSerachArticle: '/back/onSerachArticle',//搜索文章
    delTag: '/back/delTag',// 删除文章
    addTag: '/back/addTag',// 添加技术标签
}
export default base;