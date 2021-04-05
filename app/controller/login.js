'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class Login extends Controller {
  async login() {
    const { ctx } = this;
    const { id, password } = ctx.request.body;
    const time = ctx.session.time;
    const table = 'User';
    try {
      const isExist = await ctx.service.mysql.findById(id, table);
      if (isExist == null) {
        ctx.status = 200;
        ctx.body = {
          success: 0,
          message: '账号不存在',
        };
      } else if (md5(isExist.dataValues.password) !== password) {
        ctx.status = 200;
        ctx.body = {
          success: 0,
          message: '密码错误',
        };
      } else if (isExist.dataValues.status === 0) {
        ctx.status = 200;
        ctx.body = {
          success: 0,
          message: '账号正在审核中，请联系管理员。',
        };
      } else {
        ctx.status = 200;
        const token = await ctx.service.jwt.signToken({ id, status: isExist.dataValues.status });
        ctx.session.userid = isExist.id;
        ctx.body = {
          success: 1,
          data: {
            token,
            id: isExist.id,
            password: isExist.dataValues.password,
            name: isExist.dataValues.name,
          },
        };
      }
    } catch (err) {
      ctx.status = 404;
      console.log(err);
      ctx.body = {
        message: '登录失败',
      };
    }
  }
  async loginToken() {
    const time = Date.now();
    this.ctx.session.time = time;
    this.ctx.body = {
      success: 1,
      message: time,
    };
  }
  // 忘记密码
  async forgetPassword() {
    const { ctx } = this;
    const { ids, passwords, emails } = ctx.request.body;
    try {
      const table = 'User';
      const params = {
        where: {
          id: ids,
          email: emails,
        },
      };
      const isUser = await ctx.service.mysql.findAll(params, table);
      if (isUser.length !== 0) {
        ctx.session.id = ids;
        ctx.session.password = passwords;
        ctx.status = 200;
        ctx.body = {
          success: 1,
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          success: 0,
          message: '用户信息有误',
        };
      }
    } catch (err) {
      // console.log(err)
      ctx.status = 404;
    }
  }
  // 修改密码
  async changePassword() {
    const { ctx } = this;
    try {
      const { code } = ctx.request.body;
      if (ctx.session.code !== code) {
        ctx.status = 200;
        ctx.body = {
          success: 0,
          message: '验证码有误',
        };
      } else {
        const id = ctx.session.id;
        const table = 'User';
        const isUser = await ctx.service.mysql.findById(id, table);
        await isUser.update({
          password: ctx.session.password,
        });
        const content = {
          subject: '邮箱验证码',
          text: `您好,您在WEB应用专业团队的账户密码被重置`,
        };
        await ctx.service.nodemailer.sendEmail(email, content);
        ctx.status = 200;
        ctx.body = {
          success: 1,
          message: '邮件发送成功，请注意查收！',
        };
        ctx.status = 200;
        ctx.body = {
          success: 1,
          data: {
            password: ctx.session.password,
          },
        };
      }
    } catch (err) {
      ctx.status = 404;
      console.log(err);
    }
  }
  // 重置密码
  async resetPassword() {
    const { ctx } = this
    const { id } = ctx.params
    const auth = ctx.session.auth
    try {
      if (auth !== 3) {
        throw { status: 401 }
      }
      const user = await ctx.service.mysql.findById(id, 'User')
      user.update({ password: md5('123456') })

      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '重置成功'
      }

    } catch (error) {
      ctx.status = error?.status || 500
    }


  }
}
module.exports = Login;
