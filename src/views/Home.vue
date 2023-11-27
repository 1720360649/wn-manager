<template>
	<van-nav-bar
		:fixed="true"
		:placeholder="true"
		v-if="routerStore.NavbarShow()"
		:title="routerStore.PageTitle()"
	>
		<template #left>
			<van-icon
				:name="routerStore.NavHomeShow() ? 'wap-home' : 'arrow-left'"
				style="font-size: 20px"
				v-if="!routerStore.TabbarShow()"
				@click="routerStore.NavHomeShow() ? replace('/') : back()"
			/>
		</template>
	</van-nav-bar>
	<div
		class="app-container"
		:style="{
			height: `calc(100vh ${
				routerStore.NavbarShow() ? '- var(--van-nav-bar-height)' : ''
			})`,
		}"
	>
		<router-view />
	</div>
</template>

<script lang="ts" setup>
import useRouterStore from '@/store/modules/router'
import { back, replace } from '@/utils/'

const routerStore = useRouterStore()
</script>
<style lang="scss" scoped></style>
