<template>
  <el-menu
      class="el-menu"
      :collapse="true"
      :router="true"
      :default-active="active"
  >
      <el-menu-item index="/window/result">
        <el-icon><i-ep-Menu /></el-icon>
        <template #title>功能</template>
      </el-menu-item>
      <el-menu-item index="/window/setting">
        <el-icon><i-ep-setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
      <el-menu-item index="/window/info">
        <el-icon><i-ep-InfoFilled /></el-icon>
        <template #title>关于</template>
      </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import { useRoute } from 'vue-router'

const active = ref("");
const route = useRoute();
watchEffect(() => {
  active.value = route.path;
  console.log(active.value)
})
</script>

<style scoped>
.el-menu {
  width: var(--nav-menu-width);
  height: calc(100vh - var(--title-bar-height));
}
</style>