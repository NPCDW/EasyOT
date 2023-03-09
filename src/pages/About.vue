<script setup lang="ts">
import { ElNotification } from 'element-plus';

function copyText(text: string) {
  navigator.clipboard.writeText(text);
  ElNotification({
    title: '已复制',
    message: '邮件地址复制成功',
    type: 'success',
    offset: 40,
  })
}
</script>

<template>
  <div class="container">
    <el-descriptions
        title="EasyOT"
        :column="1"
        direction="horizontal"
        style="padding: 20px;"
    >
        <el-descriptions-item label="版本"><el-link href="https://github.com/NPCDW/EasyOT/releases" target="_blank">0.0.0</el-link></el-descriptions-item>
        <el-descriptions-item label="开源许可"><el-link href="https://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT License</el-link></el-descriptions-item>
        <el-descriptions-item label="版权所有"><el-link href="https://github.com/NPCDW" target="_blank">© 2022 NPCDW</el-link></el-descriptions-item>
        <el-descriptions-item label="源码"><el-link href="https://github.com/NPCDW/EasyOT" target="_blank">https://github.com/NPCDW/EasyOT</el-link></el-descriptions-item>
        <el-descriptions-item label="反馈"><el-link href="#" @click="copyText('chenyongli0520@gmail.com')">chenyongli0520@gmail.com</el-link></el-descriptions-item>
        <el-descriptions-item label="友情链接"><el-link href="https://www.0520.site" target="_blank">https://www.0520.site</el-link></el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.container {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}
</style>
