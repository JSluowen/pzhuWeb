const Controller = require('egg').Controller; 

class UserManage extends Controller {
	//需要的成员信息结构：
		/**
		 * {
			id:string,
			name:string,
			eamil:string,//用于联系功能
			major - class:string, 
			article - count:number, 
			achievement - count:number, 

		} */
	async all() {
		let {ctx } = this; 
		let token = ctx.header.Authorization; 
		let resdata = null; 
		try {
				// let resdata = await ctx.service.mysql.findAll(id, table);
				resdata = await ctx.service.backUser.all(); 
				ctx.status = 200; 
				if (resdata) {
					ctx.body =  {
						success:1, 
						data:resdata
					}; 
				}else {
					ctx.body =  {
						success:0, 
						message:'没有数据'
					}; 
				}
		}catch (err) {
			ctx.status = 404; 
		}
}
//返回申请列表格式：
/**？每项数据格式
   * {
   * 	id:string,
   * 	name:string,
   * 	major:string,
   * 	calss:string,
   * 	apply-date:date
   * }
   * 
   */

async apply() {
	const {ctx} = this; 
	let data; 
	let token = ctx.header.Authorization; 
	//登录功能实现以后，将使用token 来鉴权 
	try {
		data = await ctx.service.backUser.apply(); 
		ctx.status = 200; 
		if (data) {
			ctx.body =  {
				success:1, 
				data:data
			}
		}else {
			ctx.body =  {
				success:1, 
				message:'no data'
			}
		}
	}
	catch(e) {
		console.log(`Error in back - user controller apply`); 
		ctx.status = 404; 
	}
}

async info() {
	const {ctx} = this; 
	let data; 
	let token = ctx.header.Authorization; 
	let {userid} = ctx.request.body;
	//登录功能实现以后，将使用token 来鉴权 
	try {
		data = await ctx.service.backUser.info(userid); 
		ctx.status = 200; 
		if (data) {
			ctx.body =  {
				success:1, 
				data:data
			}
		}else {
			ctx.body =  {
				success:1, 
				message:'no data'
			}
		}

	}
	catch(e) {
		console.log(`Error in back - user controller info`); 
		console.log(e)
		ctx.status = 404; 
	}
}
// 
async softDelete() {
	  const {ctx} = this; 
	  let {userid} = ctx.request.body; 
	  console.log(userid);
	  try {
		let flag = ctx.service.backUser.softDeleteOne(userid); 
	  ctx.status = 200; 
	  if (flag) {
		  ctx.body =  {
			  message:"删除成功", 
			  data:{'flag':true},
			  success:true
		  }
	  }else {
		  ctx.body =  {
			message:"删除失败", 
			data:{'flag':false},
			success:false
		  }
	  }
	  }catch(e){
		console.log(`Error in back - user controller softDelete`); 
		ctx.status = 404; 
	  }
  }
// 通过，将status ：1
  async agreeOne() {
	const {ctx} = this; 
	let {userid} = ctx.request.body; 
	console.log(userid);
	try {
	  let flag = ctx.service.backUser.agree(userid); 
	ctx.status = 200; 
	if (flag) {
		ctx.body =  {
			message:"通过成功", 
			data:{flag},
			success:true
		}
	}else {
		ctx.body =  {
		  message:"通过失败", 
		  data:{flag},
		  success:false
		}
	}
	}catch(e){
	  console.log(`Error in back - user controller softDelete`); 
	  ctx.status = 404; 
	}
}


}

module.exports = UserManage; 
