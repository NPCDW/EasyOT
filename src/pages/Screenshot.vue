<template>
  <canvas ref="canvas" tabindex="0" autofocus :style="{'background-image': `${background}`, width: '100%', height: '100vh'}" @keyup.esc="exit" @mouseup.right="exit"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from "@tauri-apps/api/window";

const background = ref("transparent")

invoke("screenshot").then(res => {
  background.value = "url(data:image/png;base64," + arrayBufferToBase64(res as ArrayBuffer) + ")";
  appWindow.show()
  appWindow.setFocus()
})

const canvas = ref<HTMLCanvasElement | undefined>(undefined);

onMounted(() => {
  const ctx = canvas.value?.getContext("2d")!
  console.log("canvas: ", canvas.value, ctx)

  ctx.beginPath();
  ctx.rect(0,0, canvas.value!.width, canvas.value!.height);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.clearRect(50, 10, 150, 50)
  ctx.closePath();
  ctx.fill();
})

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
  console.log("exit")
  appWindow.close();
}
</script>

<style scoped>
canvas:focus-visible { outline: unset; }
</style>