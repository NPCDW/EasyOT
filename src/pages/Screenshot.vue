<template>
    <div :style="{'background-image': `${background}`, width: '100%', height: '100vh'}" @keyup.esc="exit" @mouseup.right="exit">

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from "@tauri-apps/api/window";

const background = ref("")

invoke("screenshot").then(res => {
  background.value = "url(data:image/png;base64," + arrayBufferToBase64(res as ArrayBuffer) + ")";
  appWindow.show()
  appWindow.setFocus()
})
// const res = await invoke("screenshot");

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function exit() {
  appWindow.close();
}
</script>

<style scoped>
</style>