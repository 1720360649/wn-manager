<template>
	<van-nav-bar :fixed="true" :placeholder="true" :title="'测试'"></van-nav-bar>
	<div
		class="app-container"
		:style="{
			height: `calc(100vh - var(--van-nav-bar-height) - var(--van-tabbar-height))`,
		}"
	>
		<KeepAlive>
			<component :is="activeComponent" />
		</KeepAlive>
	</div>
	<van-tabbar v-model="active">
		<van-tabbar-item
			icon="home-o"
			v-for="(item, index) in routerStore.tabbar"
			:key="item.path"
			@click="onTabbar(index)"
		>
			<span>{{ item.name }}</span>
			<template #icon="props">
				<img
					:src="props.active ? item.icon.selectedIconPath : item.icon.iconPath"
					v-if="item.icon.type == 'image'"
				/>
				<van-icon
					:name="props.active ? item.icon.selectedIconPath : item.icon.iconPath"
					v-else
				/>
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script lang="ts" setup>
import router from '@/router'
import useRouterStore from '@/store/modules/router'
import { replace } from '@/utils'
import { onMounted, ref, shallowRef } from 'vue'
const routerStore = useRouterStore()

const active = ref(0)

const activeComponent = shallowRef()

// 获取当前需要显示的tabbar页面
let tempActive = router.currentRoute.value.query
if (tempActive.active) {
	active.value = Number(tempActive.active)
  replace('/Tabbar')
}

function onTabbar(index: number) {
  if(!routerStore.tabbar.length || index < 0){
    console.log('无可用页面')
    return
  }
  if (index >= routerStore.tabbar.length) {
    index = 0
  }
	active.value = index
	activeComponent.value =
		require(`@/views${routerStore.tabbar[index].path}.vue`).default
}

onMounted(() => {
	onTabbar(active.value)
})
</script>
<style lang="scss" scoped></style>
