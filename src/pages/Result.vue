<template>
  <el-scrollbar class="page">
    <el-space direction="vertical" :fill="true">
      <!--  图片展示块  -->
      <div>
        <el-upload drag list-type="picture" action="#" :show-file-list="false" accept="image/*" :auto-upload="false"
          v-model:file-list="file_list" :on-change="file_change">
          <template v-if="file_list && file_list.length > 0" #default>
            <el-image style="width: 100%; height: 180px;" :src="file_list[0].url" fit="contain" />
          </template>
          <template v-else #default>
            <el-icon class="el-icon--upload"><i-ep-UploadFilled /></el-icon>
          </template>
        </el-upload>
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
          <el-checkbox v-model="value2" :disabled="value2">{{ value2 ? '已是默认' : '设为默认' }}</el-checkbox>
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
          <el-checkbox v-model="value2" :disabled="value2">{{ value2 ? '已是默认' : '设为默认' }}</el-checkbox>
          <el-button type="primary">翻译</el-button>
        </el-space>
      </div>
      <!--  翻译文本块  -->
      <div>
        <el-input v-model="textarea" :rows="8" type="textarea" placeholder="Please input" />
      </div>
    </el-space>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {UploadUserFile, UploadProps, UploadFile, UploadFiles} from "element-plus";
import { readText } from '@tauri-apps/api/clipboard';
import { useRoute } from "vue-router";
import {useConfig} from '../store/config'
import {translateProvideOptions, getTranslateLanguageOptions, type TranslateLanguageKeys} from '../store/translateOptions'
import {ocrProvideOptions, getOcrLanguageOptions, getOcrModeOptions, type OcrLanguageKeys} from '../store/ocrOptions'

const config = useConfig().get_config()

const defaultOcrProvide = ref(config?.ocr.default_ocr_provide)
const defaultOcrMode = ref(config?.ocr.default_ocr_mode)
const ocrModeOptions = ref<SelectOptions[]>()
const defaultOcrLanguage = ref(config?.ocr.default_ocr_language)
const ocrLanguageOptions = ref<SelectOptions[]>()
watch(defaultOcrProvide, (newValue, oldValue) => {
  ocrModeOptions.value = getOcrModeOptions(newValue as OcrLanguageKeys)
  ocrLanguageOptions.value = getOcrLanguageOptions(newValue as OcrLanguageKeys)
  if (oldValue) {
    defaultOcrMode.value = ocrModeOptions.value[0].value
    defaultOcrLanguage.value = ocrLanguageOptions.value[0].value
  }
}, {immediate: true})

const defaultTranslateProvide = ref(config?.translate.default_translate_provide)
const defaultSourceLanguage = ref(config?.translate.default_translate_source_language)
const sourceLanguageOptions = ref<SelectOptions[]>()
const defaultTargetLanguage = ref(config?.translate.default_translate_target_language)
const targetLanguageOptions = ref<SelectOptions[]>()
watch(defaultTranslateProvide, (newValue, oldValue) => {
  sourceLanguageOptions.value = getTranslateLanguageOptions(newValue as TranslateLanguageKeys)
  targetLanguageOptions.value = [...sourceLanguageOptions.value]
  targetLanguageOptions.value.shift()
  if (oldValue) {
    defaultSourceLanguage.value = sourceLanguageOptions.value[0].value
    defaultTargetLanguage.value = targetLanguageOptions.value[0].value
  }
}, {immediate: true})

const file_list = ref<UploadUserFile[]>([]);

const value = ref('')
const textarea = ref('')
const value1 = ref('')
const value2 = ref(false)
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const file_change: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  createFileUrl(uploadFile)
  if (uploadFiles.length > 1) {
    uploadFiles.shift()
  }
  console.log(uploadFile, uploadFiles, file_list)
}

function createFileUrl(file: UploadFile) : void {
  if (!file.url) {
    if (window.URL !== undefined) {
      file.url = window.URL.createObjectURL(file.raw as Blob);
    } else if (window.webkitURL !== undefined) {
      file.url = window.webkitURL.createObjectURL(file.raw as Blob);
    }
  }
}

const ocr_text = ref<string | null>(null);

const route = useRoute();

watch(() => route.query.rand, () => {
  if (route.query.target === 'word_selection') {
    setTimeout(async () => {
      ocr_text.value = await readText();
    }, 300)
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