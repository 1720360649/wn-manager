<template>
	<div class="welcome-page">
		<div class="background-image">
			<van-image
				width="100%"
				height="100%"
				fit="cover"
			  :src="require('@/assets/bg/bg3.jpg')"
			/>
		</div>
		<div class="content">
			<h1>Welcome to</h1>
      <h1>My</h1>
      <h1>WebApp</h1>
			<button @click="onHome">进入应用</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { createRoutes, goTabbar, replace } from '@/utils';

async function onHome(){
  //假设登录成功
  let re = await createRoutes()
  if(re){
    goTabbar('/Blog/Set')
  }
}

</script>

<style lang="scss" scoped>
.welcome-page {
	display: flex;
  justify-content: center;
	font-family: Arial, sans-serif;
	text-align: center;
  color: #c22feb;
  padding: 10vw;
  padding-top: 10vh;
}

.background-image {
	position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.content {
	position: relative;
	z-index: 2;
}

.content h1 {
	font-size: px2vw(85px);
}

.content p {
	font-size: px2vw(30px);
}

.content button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  width: px2vw(400px);
  height: px2vw(100px);
	font-size: px2vw(35px);
	padding: 10px 20px;
	background-color: #c22feb;
	border: none;
	border-radius: 5px; 
	cursor: pointer;
	transition: all 0.3s ease;
  color: white;
  margin: auto;
}

.content button:hover {
  background-color: #d76df4;
}
</style>
