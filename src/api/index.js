import instance from './request'

// get接口
// export function SelectSign() {
//   return instance({
//     url:'/admin/applyLine',
//     method: 'get',
//   })
// }

// post接口  普通传参
export function LoginPostData (code) {
  return instance({
    url: '/user/login',
    method: 'post',
    data: {
      code
    }
  })
}
// 用户上传文件 put请求
export function userupload (file) {
  return instance({
    url: '/file/userupload',
    method: 'put',
    processData: false, // 防止数据被转成字符串
    contentType: false,
    formData: {
      file
    }
  })
}

export function view (stage) {
  return instance({
    url: '/user/task/view',
    method: 'post',

    data: {
      stage
    }
  })
}

// // 当后端是query的时候前端就要使用params进行传参
// export function GetLine(department) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
// return instance({
//   url:`/admin/line/${department}`,
//   method: 'get',
// })
// }
// export function GetNext(department) {
// return instance({
// url:`/admin/next/${department}`,
// method: 'get',
// })
// }
// export function AdvMessage(department,stuNum) {
// return instance({
// url:`/admin/advance/${department}`,
// method: 'post',
// data:{
// department,
// stuNum
// }
// })
// }
// export function DelayMessage(department,stuNum) {
// return instance({
// url:`/admin/delay/${department}`,
// method: 'post',
// data:{
// department,
// stuNum
// }
// })
// }
// export function DelMessage(department,stuNum) {
// return instance({
// url:`/admin/delete/${department}`,
// method: 'post',
// data:{
// department,
// stuNum
// }
// })
// }
// export function RetMessage(department,stuNum) {
// return instance({
// url:'/admin/reset',
// method: 'post',
// data:{
// department,
// stuNum
// }
// })
<<<<<<< HEAD
=======
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
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
=======
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
// }
