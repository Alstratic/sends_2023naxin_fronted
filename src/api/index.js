import instance from './request'

// get接口
// export function SelectSign() {
// 	return instance({
// 		url:'/admin/applyLine',
// 		method: 'get',
// 	})
// }

// post接口  普通传参
export function LoginPostData(code) {
	return instance({
		url:'/admin/login',
		method: 'post',
		data:{
			code
		}
	})
}
//用户提交申请
export function ApplicationSubmit(ruleForm) {
	return instance({
		url:'/user/applications/submit',
		method: 'post',
		data:ruleForm
	})
}
// 管理员发布职位
export function AdminPost(ruleForm) {
	return instance({
		url:'/admin/posts',
		method: 'post',
		data:ruleForm
	})
}

// 管理员创建面试
export function AdminCreateView(ruleForm) {
	return instance({
		url:'/admin/wait/create',
		method: 'post',
		data:ruleForm
	})
}

// 管理员创建考核
export function AccessCreate(ruleForm) {
	return instance({
		url:'/admin/access/create',
		method: 'post',
		data:ruleForm
	})
}

// 管理员面试通过创建考核任务
export function TaskCreate(ruleF) {
	return instance({
		url:'/admin/task/create',
		method: 'post',
		data:ruleF
	})
}
// 管理员得到职位列表（无条件）
export function AdminSqure() {
	return instance({
		url:'/admin/posts',
		method: 'get',
	})
}
// 根据 postID 返回具体的职位详细
export function PostsSqure(postID) {
		return instance({
		url:`/square/posts/${postID}`,
		method: 'get',
	})
}
// 获取该职位所有申请
export function applicatioPost(posts) {
	return instance({
		url:'/admin/applications/view',
		method: 'post',
		data:{
			posts
		}
	})
}

// 修改申请状态
export function applicatioChange(postApply) {
	return instance({
		url:'/admin/applications/change',
		method: 'post',
		data:postApply

	})
}
// 修改面试状态
export function WaitChange(postApply) {
	return instance({
		url:'/admin/wait/change',
		method: 'post',
		data:postApply
	})
}

// 显示组织所有职位所有等待面试人员
export function AdminWaitView(posts) {
	return instance({
		url:'/admin/wait/view',
		method: 'post',
		data:{
			organization:1,
			posts:posts
		}
	})
}
// 管理员展示所有考核
export function AccessView(post) {
	return instance({
		url:'/admin/access/view',
		method: 'post',
		data:{
			posts:post
		}
	})	
}

// 考核完成情况计数
export function TaskCount(posts) {
	return instance({
		url:'/admin/task/count',
		method: 'post',
		data:{
			posts:posts
		}
	})
}
// 显示组织对应职位所有考核人员
export function AdminTaskView(posts) {
	return instance({
		url:'/admin/task/view',
		method: 'post',
		data:{
			organization:1,
			posts:posts
		}
	})
}
//用户上传文件 put请求
// export function userupload(file) {
// 	return instance({
// 		url:'/file/userupload',
// 		method: 'put',
// 		processData: false,//防止数据被转成字符串
// 		contentType:false,
// 		formData:{
// 			file
// 		}
// 	})
// }

export function view(stage) {
	return instance({
		url:'/user/task/view',
		method: 'post',	
		data:{
			stage
		}
	})
}

// // 当后端是query的时候前端就要使用params进行传参
// export function GetLine(department) {
// 	return instance({
// 		url:`/admin/line/${department}`,
// 		method: 'get',
// 	})
// }
// export function GetNext(department) {
// 	return instance({
// 		url:`/admin/next/${department}`,
// 		method: 'get',
// 	})
// }
// export function AdvMessage(department,stuNum) {
// 	return instance({
// 		url:`/admin/advance/${department}`,
// 		method: 'post',
// 		data:{
// 			department,
// 			stuNum
// 		}
// 	})
// }
// export function DelayMessage(department,stuNum) {
// 	return instance({
// 		url:`/admin/delay/${department}`,
// 		method: 'post',
// 		data:{
// 			department,
// 			stuNum
// 		}
// 	})
// }
// export function DelMessage(department,stuNum) {
// 	return instance({
// 		url:`/admin/delete/${department}`,
// 		method: 'post',
// 		data:{
// 			department,
// 			stuNum
// 		}
// 	})
// }
// export function RetMessage(department,stuNum) {
// 	return instance({
// 		url:'/admin/reset',
// 		method: 'post',
// 		data:{
// 			department,
// 			stuNum
// 		}
// 	})
// }
