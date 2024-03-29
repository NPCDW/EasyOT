<template>
  <div class="screen" :style="{ 'background-image': `url(${background})` }">
    <canvas ref="canvas" tabindex="0" autofocus style="width: 100%; height: 100vh" :width="canvas_width"
      :height="canvas_height" @keyup.esc="exit" @mouseup.right="exit" @mousedown.left="mousedown($event)"
      @mousemove="mousemove($event)" @mouseup.left="mouseup($event)"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { emit, once } from '@tauri-apps/api/event'
import { appWindow, PhysicalPosition, PhysicalSize } from "@tauri-apps/api/window";
import { random } from '../util/number_util'

const background = ref("data:image/png;base64,")
const canvas_width = ref(screen.width);
const canvas_height = ref(screen.height);

const canvas = ref<HTMLCanvasElement | undefined>(undefined);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const scaleFactor = ref(1)

invoke("screenshot").then(async res => {
  const [buffer, x, y, width, height, scale] = res as [Uint8Array, number, number, number, number, number]
  await appWindow.setPosition(new PhysicalPosition(x, y))
  await appWindow.setSize(new PhysicalSize(width, height))
  await appWindow.show()
  await appWindow.setFocus()

  scaleFactor.value = scale
  background.value = "data:image/png;base64," + arrayBufferToBase64(buffer);
})

onMounted(() => {
  ctx.value = canvas.value?.getContext("2d")!

  ctx.value.beginPath();
  ctx.value.rect(0, 0, canvas.value!.width, canvas.value!.height);
  ctx.value.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.value.fill();
  ctx.value.closePath();
})

const start = ref(false)
const startPoint = ref({ x: 0, y: 0 });

function mousedown(event: MouseEvent) {
  start.value = true;
  startPoint.value = { x: event.pageX, y: event.pageY }
  // console.log("MouseEvent Down: ", event, canvas.value!.width, canvas.value!.height)
}

function mousemove(event: MouseEvent) {
  if (!start.value) {
    return
  }

  let x = Math.min(event.pageX, startPoint.value.x);
  let y = Math.min(event.pageY, startPoint.value.y);
  let width = Math.abs(event.pageX - startPoint.value.x)
  let height = Math.abs(event.pageY - startPoint.value.y)

  ctx.value!.beginPath();
  ctx.value!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
  ctx.value!.fill();
  ctx.value!.closePath();

  ctx.value!.beginPath();
  ctx.value!.rect(0, 0, canvas.value!.width, canvas.value!.height);
  ctx.value!.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.value!.fill();
  ctx.value!.closePath();

  ctx.value!.beginPath();
  ctx.value!.clearRect(x, y, width, height)
  ctx.value!.fill();
  ctx.value!.closePath();
}

async function mouseup(event: MouseEvent) {
  start.value = false;
  // console.log("MouseEvent Up: ", event, ctx)
  await appWindow.hide()

  let x = Math.min(event.pageX, startPoint.value.x) * scaleFactor.value
  let y = Math.min(event.pageY, startPoint.value.y) * scaleFactor.value
  let width = Math.abs(event.pageX - startPoint.value.x) * scaleFactor.value
  let height = Math.abs(event.pageY - startPoint.value.y) * scaleFactor.value

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  let img = new Image();
  img.src = background.value;
  img.onload = async () => {
    context!.drawImage(img, x, y, width, height, 0, 0, width, height);
    let imageData = canvas!.toDataURL('image/png');
    await invoke('show_main_window', { url: '/window/result?target=ocr&rand=' + random(1, 10000000) });
    await once('result-page-mounted-event', async (event) => {
      await emit('wait-ocr-image-data-event', { imageData })
      await appWindow.close()
    })
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

async function exit() {
  await appWindow.close();
}
</script>

<style scoped>
canvas:focus-visible {
  outline: unset;
}

.screen {
  background-size: cover;
  cursor: crosshair;
}
</style>