import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

const useUserStore = defineStore('user', () => {
  const state = reactive({
    id: null,
    name: ''
  })

  const test = () => {
    return `${state.id}:${state.name}`
  }

  return {
    ...toRefs(state),
    test
  }
}, {
  // 持久化全部
  persist: true,
  // 选择性持久化
  // persist: piniaPersistConfig('user', ['lastName'])
})

export default useUserStore