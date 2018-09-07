import axios from 'axios';

const MyHttp = {};
// vue的插件 必须有一个公共的install方法
MyHttp.install = function (Vue) {
  // 设置baseURL
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$http = axios;


  // Add a request interceptor
  // 添加请求的拦截器
  let loadingInstance = null;
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
      // 1. 在请求发送之前，添加请求头token
    // 如果当前请求的地址是/login的时候，不给请求头加token
    if (config.url !== 'login') {
      const token = sessionStorage.getItem('token');
      //设置请求头
      config.headers.Authorization = token;
    }

    // loadingInstance = Loading.service();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // // Add a response interceptor
  // // 添加响应的拦截器
  // axios.interceptors.response.use(function (response) {
  //   // 1. 隐藏加载提示
  //   loadingInstance.close();
  //   // Do something with response data
  //   return response;
  // }, function (error) {
  //   // Do something with response error
  //   return Promise.reject(error);
  // });
  // Vue.prototype.$http = axios;
};


export default MyHttp;
