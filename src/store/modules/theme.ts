import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import themes from '@/theme'

const useThemeStore = defineStore('theme', () => {
  const state = reactive({
    name: "中国红",
    theme: "themeRed",
    themeColor: "#f92801",
    themeTextColor: "#ffffff",
  })

  const setTheme = (key: string) => {
    let value = themes.get(key)
    if (value) {
      state.name = value.name
      state.theme = value.theme
      state.themeColor = value.themeColor
      state.themeTextColor = value.themeTextColor
    }
  }

  return {
    ...toRefs(state),
    setTheme,
  }
}, {
  // 持久化全部
  persist: true,
  // 选择性持久化
  // persist: piniaPersistConfig('user', ['lastName'])
})

export default useThemeStore