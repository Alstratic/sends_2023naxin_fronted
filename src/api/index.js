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

// // 当后端是query的时候前端就要使用params进行传参
// export function GetLine(department) {
// return instance({
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
