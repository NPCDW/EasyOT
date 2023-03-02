<template>
  <div data-tauri-drag-region class="titlebar">
    <div class="titlebar-button" @click="minimize">
      <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
      />
    </div>
    <div class="titlebar-button" @click="toggleMaximize">
      <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
      />
    </div>
    <div class="titlebar-button titlebar-close-button" @click="close">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window'

function minimize() {
  appWindow.minimize()
}
function toggleMaximize() {
  appWindow.toggleMaximize()
}
function close() {
  appWindow.close()
}
</script>

<style scoped>
.titlebar {
  height: 30px;
  background: #121212;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}
.titlebar-button:hover {
  background: #5bbec3;
}
.titlebar-close-button:hover {
  background: red;
}
</style>