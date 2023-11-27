<template>
	<van-config-provider
		:class="themeStore.theme"
		:theme-vars="{ primaryColor: themeStore.themeColor }"
		theme-vars-scope="global"
	>
		<router-view></router-view>
	</van-config-provider>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import useThemeStore from '@/store/modules/theme'
import useRouterStore from '@/store/modules/router'
import router from '@/router'
import { GetRouter, createRoutes } from './utils'

const themeStore = useThemeStore()
const routerStore = useRouterStore()

// 路由状态监听
watch(
	() => router.currentRoute.value.path,
	(toPath) => {
    console.log('toPath', toPath)
		routerStore.path = toPath
		// 用户刷新后，从持久化信息中获取历史信息并重新构建路由
		reGetInfo(toPath)
		// 更新路由历史信息
		setTimeout(() => {
			routerStore.history = GetRouter().history.get()
		}, 10)
	},
	{ immediate: true, deep: true }
)

// 从持久化信息中获取历史信息并重新构建路由
function reGetInfo(toPath: string) {
	if (toPath !== '/') {
		if (!GetRouter().pages.get().length) {
			GetRouter().pages.set(routerStore.pages)
			GetRouter().tabbar.set(routerStore.tabbar)
			GetRouter().history.set(routerStore.history)
			createRoutes().then((re) => {
				if (re) {
					router.replace(routerStore.path)
				}
			})
		}
	}
}
</script>
<style lang="scss">
@import './theme.scss';

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	user-select: none;

	// navbar颜色
	--van-nav-bar-background: var(--uni-all-color);
	--van-nav-bar-icon-color: var(--uni-text-color);
	--van-nav-bar-text-color: var(--uni-text-color);
	--van-nav-bar-title-text-color: var(--uni-text-color);
	--van-nav-bar-arrow-size: 19px;
}

.app-container {
	overflow: hidden;
	overflow-y: auto;
	width: 100vw;
	background-color: rgba($color: gray, $alpha: 0.1);
}
</style>
