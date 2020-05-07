import axios from "axios";

// 终极使用
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/h8',
    timeout: 5000
  })

  // 2. axios拦截器的使用

  //全局拦截
  // axios.interceptors.request.use

  //实例拦截
  // 2.1请求拦截
  instance.interceptors.request.use( config => {
    return config //拦截后必须返回数据
  }, err => {
    // console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use( res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}