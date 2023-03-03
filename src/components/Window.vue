<template>
  <TitleBar />
  <div class="flex flex-row" style="margin-top: var(--title-bar-height); height: calc(100vh - var(--title-bar-height))">
    <div class="flex-none">
      <NavMenu />
    </div>
    <el-scrollbar class="flex-auto">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavMenu from '../components/NavMenu.vue'
</script>

<style scoped>

</style>