<template>
  <TitleBar />
  <div class="flex flex-row" style="margin-top: var(--title-bar-height); height: calc(100vh - var(--title-bar-height))">
    <div class="flex-none">
      <NavMenu />
    </div>
    <div class="overflow-y-auto" style="width: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavMenu from '../components/NavMenu.vue'
</script>

<style scoped>

</style>