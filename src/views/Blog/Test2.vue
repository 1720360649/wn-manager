<template>
  <div>
    <van-button type="primary" @click="goAndCloseAll('/Blog/Test')">Test</van-button>
    <van-button type="primary" @click="clearRouter">清空路由</van-button>
  </div>
</template>
<script lang="ts" setup>
import { clearRouter, goAndCloseAll } from '@/utils/route'
</script>