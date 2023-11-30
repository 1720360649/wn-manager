<template>
	<el-container>
		<el-header class="wn-header">Header</el-header>
		<el-container>
			<el-aside class="wn-aside">
        <Menus></Menus>
      </el-aside>
			<el-container>
				<el-main class="wn-main">
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import Menus from '@/components/Menus.vue';
import useRouterStore from '@/store/modules/router'

const routerStore = useRouterStore()
</script>
<style lang="scss" scoped>
.el-container {
	height: 100%;
}
.wn-header {
  height: px2vw(90px);
	background-color: var(--uni-all-color);
	color: var(--uni-text-color);
	border-bottom: 1px solid white;
}
.wn-aside {
  width: px2vw(270px);
  background-color: var(--uni-all-color);
	color: var(--uni-text-color);
	border-right: 1px solid  white;
}
.wn-main {
	background-color: var(--uni-all-color-4);
	color: var(--uni-all-color);
}
</style>
