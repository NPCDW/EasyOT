<template>
  <el-menu
      default-active="1"
      class="el-menu"
      :collapse="true"
  >
    <el-menu-item index="1">
      <el-icon><i-ep-Menu /></el-icon>
      <template #title>功能</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><i-ep-setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><i-ep-InfoFilled /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
</script>

<style scoped>
.el-menu {
  margin-top: 40px;
  //width: 200px;
  height: 100vh;
}
</style>