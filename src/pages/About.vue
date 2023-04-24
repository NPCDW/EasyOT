<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

function copyText(text: string) {
  navigator.clipboard.writeText(text);
  ElNotification({
    title: t('about.copied'),
    message: t('about.CopyEmailMessage'),
    type: 'success',
    offset: 40,
  })
}
</script>

<template>
  <el-scrollbar class="page">
    <el-descriptions title="EasyOT" :column="1" direction="horizontal" style="padding: 20px;">
      <el-descriptions-item :label="t('about.version')"><el-link href="https://github.com/NPCDW/EasyOT/releases"
          target="_blank">0.5.0</el-link></el-descriptions-item>
      <el-descriptions-item :label="t('about.license')"><el-link href="https://en.wikipedia.org/wiki/MIT_License"
          target="_blank">MIT License</el-link></el-descriptions-item>
      <el-descriptions-item :label="t('about.allRightsReserved')"><el-link href="https://github.com/NPCDW"
          target="_blank">© 2022 NPCDW</el-link></el-descriptions-item>
      <el-descriptions-item :label="t('about.sourceCode')"><el-link href="https://github.com/NPCDW/EasyOT"
          target="_blank">https://github.com/NPCDW/EasyOT</el-link></el-descriptions-item>
      <el-descriptions-item :label="t('about.feedback')"><el-link href="#"
          @click="copyText('chenyongli0520@gmail.com')">chenyongli0520@gmail.com</el-link></el-descriptions-item>
      <el-descriptions-item :label="t('about.links')"><el-link href="https://www.0520.site"
          target="_blank">https://www.0520.site</el-link></el-descriptions-item>
    </el-descriptions>
  </el-scrollbar>
</template>

<style scoped>
.page {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}
</style>
