import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { Page, Tabbar } from '@/utils'

const useRouterStore = defineStore('router', () => {
  let history: string[] = []
  let pages: Page[] = []
  let tabbar: Tabbar[] = []
  const state = reactive({
    history: history,
    path: '',
    pages: pages,
    tabbar: tabbar
  })

  // 把pages转换成Map对象
  const PagesMap = () => {
    let pagesMap = new Map()
    state.pages.forEach(page => {
      pagesMap.set(page.path, page)
    })
    return pagesMap
  }

  // 把tabbar转换成Map对象
  const TabbarMap = () => {
    let tabbarMap = new Map()
    state.tabbar.forEach((item, index) => {
      tabbarMap.set(item.path, {
        index: index,
        ...item
      })
    })
    return tabbarMap
  }

  // 当前页面name
  const PageTitle = () => {
    const currentPath = state.path
    let page = PagesMap().get(currentPath)
    return page ? page.name : ''
  }

  // 是否显示navbar
  const NavbarShow = () => {
    const currentPath = state.path
    let page = PagesMap().get(currentPath)
    return page && page.navbar === false ? false : true
  }

  // 是否显示tabbar
  const TabbarShow = () => {
    const currentPath = state.path
    let page = TabbarMap().get(currentPath)
    return page?true:false
  }

  // 是否显示navHome
  const NavHomeShow = () => {
    return state.history.length > 0? false : true
  }

  return {
    ...toRefs(state),
    PagesMap,
    TabbarMap,
    PageTitle,
    NavbarShow,
    TabbarShow,
    NavHomeShow,
  }
}, {
  // 持久化全部
  persist: true,
  // 选择性持久化
  // persist: piniaPersistConfig('user', ['lastName'])
})

export default useRouterStore