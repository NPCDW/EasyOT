<template>
  <TitleBar />
  <NavMenu />
  <router-view></router-view>
</template>

<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavMenu from '../components/NavMenu.vue'
</script>

<style scoped>

</style>