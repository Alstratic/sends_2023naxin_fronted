<<<<<<< HEAD
const setUserToken = (token) => {
  localStorage.setItem('HQU_naxin', token)
}

const setAdminToken = (token) => {
  localStorage.setItem('HQU_naxin_admin', token)
}
// 用于将获取到的 token 存储在浏览器的 localStorage 中

const getUserToken = () => {
  try {
    return localStorage.getItem('HQU_naxin')
  } catch {
    return null
  }
}

const getAdminToken = () => {
  try {
    return localStorage.getItem('HQU_naxin_admin')
  } catch {
    return null
  }
}
// 用于从 localStorage 中获取存储的 token

const isUserLogin = () => {
  const token = getUserToken()
  if (!token || token === '') return false
  console.log('token: ', token)
  return true
}

const isAdminLogin = () => {
  const token = getAdminToken()
  if (!token || token === '') return false
  console.log('token: ', token)
  return true
}
// 用于检查用户是否已登录，通过检查 localStorage 中的 token 是否存在来判断。
// 如果 token 存在且不为空，说明用户已登录，返回 true，否则返回 false。

const wxRedirect = () => {
  location.href = `http://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
    `${location.origin}`
  )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
}
// 用于执行微信授权重定向，将用户重定向到微信授权页面以获取授权的 code。
// 它构建了一个微信授权的链接，包括应用的 appid、重定向的地址等
const wxAdminRedirect = () => {
  location.href = `http://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
    `${location.origin}/admin/FirstPage`
  )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
}

const isInWechat = () => {
  return window.navigator.userAgent.includes('MicroMessenger')
}
// 用于检查当前页面是否在微信浏览器内打开，通过检查用户代理字符串中是否包含 "MicroMessenger" 来判断。
// 如果在微信浏览器内打开，返回 true，否则返回 false。

const getWechatCode = () => {
  const searchParams = new URLSearchParams(location.search)
  return searchParams.get('code')
}
// 用于从当前页面的 URL 参数中获取微信授权的 code。
// 在微信授权后，微信会将授权的 code 附加到重定向的 URL 中，通过这个函数可以获取该 code。

export { setUserToken, setAdminToken, getUserToken, getAdminToken, isUserLogin, isAdminLogin, wxRedirect, isInWechat, getWechatCode, wxAdminRedirect }
=======
// const setUserToken = (token) => {
//   localStorage.setItem('HQU_naxin', token)
// }

// const setAdminToken = (token) => {
//   localStorage.setItem('HQU_naxin_admin', token)
// }
// // 用于将获取到的 token 存储在浏览器的 localStorage 中

// const getUserToken = () => {
//   try {
//     return localStorage.getItem('HQU_naxin')
//   } catch {
//     return null
//   }
// }

// const getAdminToken = () => {
//   try {
//     return localStorage.getItem('HQU_naxin_admin')
//   } catch {
//     return null
//   }
// }
// // 用于从 localStorage 中获取存储的 token

// const isUserLogin = () => {
//   const token = getUserToken()
//   if (!token || token === '') return false
//   console.log('token: ', token)
//   return true
// }

// const isAdminLogin = () => {
//   const token = getAdminToken()
//   if (!token || token === '') return false
//   console.log('token: ', token)
//   return true
// }
// // 用于检查用户是否已登录，通过检查 localStorage 中的 token 是否存在来判断。
// // 如果 token 存在且不为空，说明用户已登录，返回 true，否则返回 false。

// const wxRedirect = () => {
//   location.href = `http://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
//     `${location.origin}`
//   )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
// }
// // 用于执行微信授权重定向，将用户重定向到微信授权页面以获取授权的 code。
// // 它构建了一个微信授权的链接，包括应用的 appid、重定向的地址等
// const wxAdminRedirect = () => {
//   location.href = `http://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
//     `${location.origin}/admin/FirstPage`
//   )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
// }

// const isInWechat = () => {
//   return window.navigator.userAgent.includes('MicroMessenger')
// }
// // 用于检查当前页面是否在微信浏览器内打开，通过检查用户代理字符串中是否包含 "MicroMessenger" 来判断。
// // 如果在微信浏览器内打开，返回 true，否则返回 false。

// const getWechatCode = () => {
//   const searchParams = new URLSearchParams(location.search)
//   return searchParams.get('code')
// }
// // 用于从当前页面的 URL 参数中获取微信授权的 code。
// // 在微信授权后，微信会将授权的 code 附加到重定向的 URL 中，通过这个函数可以获取该 code。

// export { setUserToken, setAdminToken, getUserToken, getAdminToken, isUserLogin, isAdminLogin, wxRedirect, isInWechat, getWechatCode, wxAdminRedirect }
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f
