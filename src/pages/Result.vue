<template>
  <el-scrollbar class="page">
    <el-space direction="vertical" :fill="true">
      <!--  图片展示块  -->
      <div>
        <el-image style="height: 180px;" :src="imageData" fit="scale-down" />
      </div>
      <!--  OCR 按钮块  -->
      <div>
        <el-space direction="horizontal">
          <el-select v-model="defaultOcrProvide" placeholder="Select">
            <el-option v-for="item in ocrProvideOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultOcrMode" placeholder="Select">
            <el-option v-for="item in ocrModeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultOcrLanguage" placeholder="Select">
            <el-option v-for="item in ocrLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-checkbox v-model="ocrDefaultSwitch" :disabled="ocrDefaultSwitch">{{ ocrDefaultSwitch ? '已是默认' : '设为默认' }}</el-checkbox>
          <el-button type="primary">识别</el-button>
        </el-space>
      </div>
      <!--  OCR文本块  -->
      <div>
        <el-input v-model="ocr_text" :rows="8" type="textarea" placeholder="Please input" />
      </div>
      <!--  翻译按钮块  -->
      <div>
        <el-space direction="horizontal">
          <el-select v-model="defaultTranslateProvide" placeholder="Select">
            <el-option v-for="item in translateProvideOptions" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
          <el-select v-model="defaultSourceLanguage" placeholder="Select">
            <el-option v-for="item in sourceLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultTargetLanguage" placeholder="Select">
            <el-option v-for="item in targetLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-checkbox v-model="translateDefaultSwitch" :disabled="translateDefaultSwitch">{{ translateDefaultSwitch ? '已是默认' : '设为默认' }}</el-checkbox>
          <el-button type="primary">翻译</el-button>
        </el-space>
      </div>
      <!--  翻译文本块  -->
      <div>
        <el-input v-model="translate_text" :rows="8" type="textarea" placeholder="Please input" />
      </div>
    </el-space>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { readText } from '@tauri-apps/api/clipboard';
import { emit, once } from '@tauri-apps/api/event'
import { useRoute } from "vue-router";
import {useConfig} from '../store/config'
import {translateProvideOptions, getTranslateLanguageOptions, type TranslateLanguageKeys} from '../store/translateOptions'
import {ocrProvideOptions, getOcrLanguageOptions, getOcrModeOptions, type OcrLanguageKeys} from '../store/ocrOptions'
import {translate} from '../service/translate'
import {ocr} from '../service/ocr'

const config = useConfig().get_config()

const defaultOcrProvide = ref<OcrLanguageKeys>(config?.ocr.default_ocr_provide as OcrLanguageKeys)
const defaultOcrMode = ref(config?.ocr.default_ocr_mode)
const ocrModeOptions = ref<SelectOptions[]>()
const defaultOcrLanguage = ref(config?.ocr.default_ocr_language)
const ocrLanguageOptions = ref<SelectOptions[]>()
watch(defaultOcrProvide, (newValue, oldValue) => {
  ocrModeOptions.value = getOcrModeOptions(newValue)
  ocrLanguageOptions.value = getOcrLanguageOptions(newValue)
  if (oldValue) {
    defaultOcrMode.value = ocrModeOptions.value[0].value
    defaultOcrLanguage.value = ocrLanguageOptions.value[0].value
  }
}, {immediate: true})

const defaultTranslateProvide = ref<TranslateLanguageKeys>(config?.translate.default_translate_provide as TranslateLanguageKeys)
const defaultSourceLanguage = ref(config?.translate.default_translate_source_language)
const sourceLanguageOptions = ref<SelectOptions[]>()
const defaultTargetLanguage = ref(config?.translate.default_translate_target_language)
const targetLanguageOptions = ref<SelectOptions[]>()
watch(defaultTranslateProvide, (newValue, oldValue) => {
  sourceLanguageOptions.value = getTranslateLanguageOptions(newValue)
  targetLanguageOptions.value = [...sourceLanguageOptions.value]
  targetLanguageOptions.value.shift()
  if (oldValue) {
    defaultSourceLanguage.value = sourceLanguageOptions.value[0].value
    defaultTargetLanguage.value = targetLanguageOptions.value[0].value
  }
}, {immediate: true})

const ocrDefaultSwitch = ref(false)
const translateDefaultSwitch = ref(false)

const ocr_text = ref<string | null>(null);
const translate_text = ref<string | null>(null);

const imageData = ref("data:image/png;base64,");

const route = useRoute();

watch(() => route.query.rand, async () => {
  if (route.query.target === 'word_selection') {
    setTimeout(async () => {
      ocr_text.value = await readText();
      if (ocr_text.value) {
        translate_text.value = await translate(defaultTranslateProvide.value, defaultSourceLanguage.value!, defaultTargetLanguage.value!, ocr_text.value);
      }
    }, 300)
  } else if (route.query.target === 'ocr') {
    await once('wait-ocr-image-data-event', async (event) => {
      imageData.value = (event.payload as {imageData: string}).imageData
      ocr_text.value = await ocr(defaultOcrProvide.value, defaultOcrMode.value!, defaultOcrLanguage.value!, imageData.value);
    })
    await emit('result-page-mounted-event')
  }
}, { immediate: true })

</script>

<style scoped>
.page {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
  padding: 10px 40px 20px 20px;
}
</style>