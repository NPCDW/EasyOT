<template>
  <TitleBar />
  <div class="flex flex-row" style="margin-top: var(--title-bar-height); height: calc(100vh - var(--title-bar-height))">
    <div class="flex-none">
      <NavMenu />
    </div>
    <router-view class="flex-auto"></router-view>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavMenu from '../components/NavMenu.vue'
import { onMounted } from "vue";
import {listen} from "@tauri-apps/api/event";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(async () => {
  await listen('router-change-event', (event) => {
    console.log('router-change-event triggered', event, router);
    router.push(event.payload as string);
  })
})
</script>

<style scoped>

</style>