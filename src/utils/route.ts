import router from "@/router"
import { api } from '@/api'
import useRouterStore from '@/store/modules/router'
import { Loadding } from 'wnview'

// 路由创建
export interface Page {
  path: string,
  name: string,
  type: string,
}

export interface Tabbar {
  path: string,
  name: string,
  icon: {
    type: string,
    iconPath: string,
    selectedIconPath: string
  }
}

//创建路由闭包
function Router() {
  let pageList: Page[] = []
  let pages = {
    get: () => {
      return pageList
    },
    set: (list: Page[]) => {
      pageList = list
    }
  }
  let tabbars: Tabbar[] = []
  let tabbar = {
    get: () => {
      return tabbars
    },
    set: (list: Tabbar[]) => {
      tabbars = list
    }
  }
  let historys: string[] = []
  let history = {
    get: () => {
      return historys
    },
    set: (list: string[]) => {
      historys = list
    },
    pop: () => {
      historys.pop()
    },
    push: (path: string) => {
      historys.push(path)
    },
    replace: (path: string) => {
      if (historys.length === 0) {
        return
      }
      historys.splice(-1, 1, path)
    },
    reset: () => {
      historys = []
    }
  }

  return {
    pages,
    tabbar,
    history,
  }
}

var Route = Router()
// 重置路由
export function clearRouter() {
  // 主动跳转索引页
  goAndCloseAll('/')
  setTimeout(() => {
    // 清空相关信息 , 需要延时
    const routerStore = useRouterStore()
    Route = Router()
    routerStore.pages = []
    routerStore.tabbar = []
    routerStore.history = []
  }, 50);
}
//获取路由
export function GetRouter() {
  return Route
}

// 返回
export function back() {
  router.go(-1)
  Route.history.pop()
}

// 路由跳转
export function go(path: string) {
  router.push(path)
  Route.history.push(path)
}

// 路由替换
export function replace(path: string) {
  router.replace(path)
  // 替换history数组最后一个
  Route.history.replace(path)
}

// 跳转至Tabbar页面
export function goTabbar(path: string) {
  const routeHistory = Route.history.get().length
  if (routeHistory >= 1) {
    router.go(-routeHistory)
  }
  // 延迟5ms再跳转
  setTimeout(() => {
    let active = 0
    Route.tabbar.get().forEach((item, index) => {
      if (item.path === path) {
        active = index
      }
    })
    router.replace({
      path: '/Tabbar',
      query: {
        active: active
      }
    })
    // 清空历史,因为是关闭所有所以可以认为是首次打开状态
    Route.history.reset()
  }, 10);
}

// 路由跳转并关闭所有页面
export function goAndCloseAll(path: string) {
  const routeHistory = Route.history.get().length
  if (routeHistory >= 1) {
    router.go(-routeHistory)
  }
  // 延迟5ms再跳转
  setTimeout(() => {
    router.replace(path)
    // 清空历史,因为是关闭所有所以可以认为是首次打开状态
    Route.history.reset()
  }, 10);
}

async function getPages() {
  //获取路由store
  const routerStore = useRouterStore()
  // 当没有路由时请求路由信息
  if (!Route.pages.get().length && !Route.tabbar.get().length) {
    let re = await api.GetPages()
    if (re) {
      Route.pages.set(re.pages || [])
      Route.tabbar.set(re.tabbar || [])
      routerStore.pages = re.pages || []
      routerStore.tabbar = re.tabbar || []
    } else {
      console.log('获取用户信息失败:路由')
      return false
    }
  }
  return Route
}

export async function createRoutes() {
  const load = Loadding({
    title: '正在构建路由'
  })

  // 请求路由信息
  let temp = await getPages()
  if (!temp) {
    load.close()
    return false
  }

  // 构建普通路由
  var local = Route.pages.get().filter((item: Page) => {
    if (item.type === 'local') {
      return true
    }
  })
  let routes = local.map((item: Page) => {
    return {
      path: `${item.path}`,
      name: item.path.split('/').join(''),
      component: () => import(`@/views${item.path}.vue`),
    }
  })
  let tempPage = {
    path: '/Home',
    name: 'Home',
    component: () => import(`@/views/Home.vue`),
    redirect: routes.length ? routes[0].path : '/',
    children: routes,
  }
  // 添加路由
  router.addRoute(tempPage)
  load.close()
  return true
}