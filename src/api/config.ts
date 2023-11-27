import axios from "axios";
import qs from 'qs';

// axios.defaults.headers.common['token'] =  AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 允许跨域
axios.defaults.headers.post["Access-Control-Allow-Origin-Type"] = "*"

// 请求拦截器
axios.interceptors.request.use(function (config) {
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "delete"
  ) {
    // qs序列化
    config.data = qs.parse(config.data)
  }

  // 若是有做鉴权token , 就给头部带上token
  // if (storage.get(store.state.Roles)) {
  //   store.state.Roles
  //   config.headers.Authorization = storage.get(store.state.Roles);
  // }


  return config
}, error => {
  console.log(error.data.error.message)
  return Promise.reject(error.data.error.message)
})

// 响应拦截器
axios.interceptors.response.use(function (config) {
  if (config.status === 200 || config.status === 204) {
    return Promise.resolve(config.data)
  } else {
    return Promise.reject(config.data)
  }
},
  function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log(error.response.status + ":发出的请求有错误，服务器没有进行新建或修改数据的操作")
          break;
        case 401: //重定向
          console.log(error.response.status + ":登录失效")
          break;
        case 403:
          console.log(error.response.status + ":用户得到授权，但是访问是被禁止的")
          break;
        case 404:
          console.log(error.response.status + ":网络请求不存在")
          break;
        case 406:
          console.log(error.response.status + ":请求的格式不可得")
          break;
        case 410:
          console.log(error.response.status + ":请求的资源被永久删除，且不会再得到的")
          break;
        case 422:
          console.log(error.response.status + ":当创建一个对象时，发生一个验证错误")
          break;
        case 500:
          console.log(error.response.status + ":服务器发生错误，请检查服务器")
          break;
        case 502:
          console.log(error.response.status + ":网关错误")
          break;
        case 503:
          console.log(error.response.status + ":服务不可用，服务器暂时过载或维护")
          break;
        case 504:
          console.log(error.response.status + ":网关超时")
          break;
        default:
          console.log(error.response.status + ":其他错误错误")
      }
      return Promise.reject(error.response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
      console.log("网络超时")
    }
  }
)
export default axios
