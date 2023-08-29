// 请求
import axios from 'axios'
const instance = axios.create({
	baseURL: 'https://recruit-manage.sends.cc/api', // api 的 base_url
	withCredentials: false,
	
  })
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
   //判断token是否存在
   if (localStorage.getItem('token')) {
    // 在请求头中添加token
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    
    return Promise.reject(error);
  });

export default instance
