<template>
	<div
		class="menu"
		:class="{ active: routerStore.path == item.path }"
		v-for="(item, index) in routerStore.tabbar"
		:key="index"
		@click="onMenu(item.path)"
	>
		{{ item.name }}
	</div>
</template>
<script lang="ts" setup>
import useRouterStore from '@/store/modules/router'
import { replace } from '@/utils'

const routerStore = useRouterStore()

function onMenu(path: string) {
	if (routerStore.path == path) return
	replace(path)
}
</script>
<style lang="scss" scoped>
.menu {
	width: 100%;
	height: px2vw(80px);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: px2vw(22px);
	cursor: pointer;

	&:hover {
		background-color: var(--uni-foreground-7);
	}
}
.active {
	background-color: var(--uni-foreground-4);
}
</style>
