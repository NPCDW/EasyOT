<template>
  <div data-tauri-drag-region class="titlebar">
    <div class="titlebar-info">
      <img src="/tauri.svg" alt="tauri app" style="height: 60%; margin-left: 60px">
      <span class="pl-2">EasyOT</span>
    </div>
    <div class="titlebar-button-group">
      <div class="titlebar-button" @click="minimize">
        <el-icon><i-ep-Minus /></el-icon>
      </div>
      <div class="titlebar-button" @click="toggleMaximize">
        <el-icon><i-ep-CopyDocument /></el-icon>
      </div>
      <div class="titlebar-button titlebar-close-button" @click="close">
        <el-icon><i-ep-Close /></el-icon>
      </div>
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
  height: var(--title-bar-height);
  background: var(--dark-background-color);
  user-select: none;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.titlebar-info {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--title-bar-height);
  height: var(--title-bar-height);
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--title-bar-height);
  height: var(--title-bar-height);
}
.titlebar-button:hover {
  background: #5bbec3;
}
.titlebar-close-button:hover {
  background: red;
}
</style>