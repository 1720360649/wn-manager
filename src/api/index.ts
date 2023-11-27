import axios from "./config";

// 请求公共前缀
const baseURL = 'http://www.wntcl.top'


// api配置表
const apiConfig: ApiConfig = {
  GetPages: {
    url: "/pages.json",
    withCredentials: false
  },
}
/**
 * api接口列表：
 * GetConfig
 * 
 */
var api: Api = {}

Object.keys(apiConfig).forEach((key: string) => {
   api[key] = function (config: { url: string | undefined; data: any; method: string | undefined; timeout: number | undefined; responseType: string | undefined; withCredentials: boolean | undefined; } = {
    url: undefined,
    data: undefined,
    method: undefined,
    timeout: undefined,
    responseType: undefined,
    withCredentials: undefined
  }) {
    return new Promise((res) => {
      let apiconfig = apiConfig[key]

      let conf = {
        url: config.url ? config.url : apiconfig.url,
        data: {},
        params: {},
        method: config.method ? config.method : (apiconfig.method ? apiconfig.method : "get"),
        timeout: config.timeout ? config.timeout : (apiconfig.timeout ? apiconfig.timeout : 60000),
        responseType: config.responseType ? config.responseType : (apiconfig.responseType ? apiconfig.responseType : "json"),
        withCredentials: config.withCredentials != undefined ? config.withCredentials : (apiconfig.withCredentials != undefined ? apiconfig.withCredentials : true),
      }

      if (isData(config, apiconfig)) {
        conf.data = config.data ? config.data : {}
      } else {
        conf.params = config.data ? config.data : {}
      }

      axios(conf).then((re) => {
        console.log(key)
        console.log(re)
        res(re)
      }).catch((e) => {
        res(false)
      })
    })
  }
})

// 导出
export {
  baseURL,
  api
}

function isData(config: { method: string | undefined; }, apiConfig: { method: string | undefined; }) {
  let method = 'get'
  if (apiConfig.method)
    method = apiConfig.method
  if (config.method)
    method = config.method

  if (method == 'get') {
    return false
  } else {
    return true
  }
}

interface ApiConfig {
  [key: string]: any
}
interface Api {
  /** 
   * 参数以对象形式传入{}
   *  @param url -String -请求地址
   *  @param data -any   -请求参数
   *  @param method -String -请求方法
   *  @param timeout -Number -超时时间
   *  @param header -Object -请求头
   *  @param dataType -String -数据类型
   *  @param responseType -String -返回类型
   *  @param sslVerify -Boolean -sslVerify
   *  @param withCredentials -Boolean -withCredentials
   *  @param firstIpv4 -Boolean -firstIpv4
  */
  [key: string]: Function
}