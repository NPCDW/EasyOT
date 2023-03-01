<template>
    <!-- <div :style="{'background-image': bgImage}">

    </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'

const inputValue = ref("");
const greetMsgEl = ref<HTMLParagraphElement | null>(null);

async function greet() {
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
greetMsgEl.value!.textContent = await invoke("screenshot", { name: inputValue });
}
</script>

<style scoped>
</style>