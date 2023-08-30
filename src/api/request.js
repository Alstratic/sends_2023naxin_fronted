// 请求
import axios from 'axios'
const instance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://124.221.99.127:10810', // api 的 base_url
  withCredentials: false
})
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断token是否存在
    if (localStorage.getItem('token')) {
      // 在请求头中添加token
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
=======
	baseURL: 'https://recruit-manage.sends.cc/api/', // api 的 base_url
	withCredentials: false,
	
  })
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
   //判断token是否存在
   if (localStorage.getItem('HQU_naxin')) {
    // 在请求头中添加token
      config.headers.token = localStorage.getItem('HQU_naxin');
    }
    return config;
  },
  error => {
    
    return Promise.reject(error);
  });
>>>>>>> ed30bfd7f8be69c679eb382f43c9d976c35d124f

export default instance
