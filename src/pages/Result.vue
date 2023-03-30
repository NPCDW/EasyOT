<template>
  <el-scrollbar class="page">
    <el-space direction="vertical" :fill="true" class="page_space">
      <!--  图片展示块  -->
      <div style="border: 1px dashed #4c4d4f; border-radius: 5px;">
        <el-image style="height: 180px;" :src="imageData" fit="scale-down" />
      </div>
      <!--  OCR 按钮块  -->
      <div style="text-align: center;">
        <el-space direction="horizontal">
          <el-select v-model="defaultOcrProvide" placeholder="Select">
            <el-option v-for="item in ocrProvideOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultOcrMode" placeholder="Select" @change="defaultOcrOptionChange">
            <el-option v-for="item in ocrModeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultOcrLanguage" placeholder="Select" @change="defaultOcrOptionChange">
            <el-option v-for="item in ocrLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-checkbox v-model="ocrDefaultSwitch" @change="ocrDefaultSwitch_checked" :disabled="ocrDefaultSwitch">
            {{ ocrDefaultSwitch ? t('result.AlreadyDefault') : t('result.SetAsDefault') }}
          </el-checkbox>
          <el-button type="primary" @click="ocr_click">{{ t('result.ocr') }}</el-button>
        </el-space>
      </div>
      <!--  OCR文本块  -->
      <div>
        <el-input v-model="ocr_text" :rows="8" type="textarea" :placeholder="t('result.TextRecognition')" />
      </div>
      <!--  翻译按钮块  -->
      <div style="text-align: center;">
        <el-space direction="horizontal">
          <el-select v-model="defaultTranslateProvide" placeholder="Select">
            <el-option v-for="item in translateProvideOptions" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
          <el-select v-model="defaultSourceLanguage" placeholder="Select" @change="defaultTranslateOptionChange">
            <el-option v-for="item in sourceLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="defaultTargetLanguage" placeholder="Select" @change="defaultTranslateOptionChange">
            <el-option v-for="item in targetLanguageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-checkbox v-model="translateDefaultSwitch" @change="translateDefaultSwitch_checked"
            :disabled="translateDefaultSwitch">
            {{ translateDefaultSwitch ? t('result.AlreadyDefault') : t('result.SetAsDefault') }}
          </el-checkbox>
          <el-button type="primary" @click="translate_click">{{ t('result.translate') }}</el-button>
        </el-space>
      </div>
      <!--  翻译文本块  -->
      <div>
        <el-input v-model="translate_text" :rows="8" type="textarea" :placeholder="t('result.MachineTranslation')" />
      </div>
    </el-space>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { readText } from '@tauri-apps/api/clipboard';
import { emit, once } from '@tauri-apps/api/event'
import _ from 'lodash';
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n'
import { useConfig } from '../store/config'
import { translateProvideOptions, getTranslateLanguageOptions, type TranslateLanguageKeys } from '../store/translateOptions'
import { ocrProvideOptions, getOcrLanguageOptions, getOcrModeOptions, type OcrLanguageKeys } from '../store/ocrOptions'
import { translate } from '../service/translate'
import { ocr } from '../service/ocr'

let config = useConfig().get_config()

const { t } = useI18n({ useScope: 'global' })

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
    defaultOcrOptionChange()
  }
}, { immediate: true })

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
    defaultTranslateOptionChange()
  }
}, { immediate: true })

const ocr_text = ref<string | null>(null);

const imageData = ref("data:image/png;base64,");

function ocr_click() {
  if (imageData.value) {
    ocr_text.value = t('result.ocring')
    ocr(defaultOcrProvide.value, defaultOcrMode.value!, defaultOcrLanguage.value!, imageData.value).then(text => {
      ocr_text.value = text
    }).catch(error => {
      ocr_text.value = error
    })
  }
}

const translate_text = ref<string | null>(null);

function translate_click() {
  if (ocr_text.value) {
    translate_text.value = t('result.translating')
    translate(defaultTranslateProvide.value, defaultSourceLanguage.value!, defaultTargetLanguage.value!, ocr_text.value).then(text => {
      translate_text.value = text
    }).catch(error => {
      translate_text.value = error
    })
  }
}

const ocrDefaultSwitch = ref(true)

function defaultOcrOptionChange() {
  ocrDefaultSwitch.value = config!.ocr.default_ocr_provide === defaultOcrProvide.value &&
    config!.ocr.default_ocr_mode === defaultOcrMode.value &&
    config!.ocr.default_ocr_language === defaultOcrLanguage.value;
}

function ocrDefaultSwitch_checked(value: string | number | boolean): void {
  config!.ocr.default_ocr_provide = defaultOcrProvide.value
  config!.ocr.default_ocr_mode = defaultOcrMode.value!
  config!.ocr.default_ocr_language = defaultOcrLanguage.value!
  useConfig().save_config(config!);
}

const translateDefaultSwitch = ref(true)

function defaultTranslateOptionChange() {
  translateDefaultSwitch.value = config!.translate.default_translate_provide === defaultTranslateProvide.value &&
    config!.translate.default_translate_source_language === defaultSourceLanguage.value &&
    config!.translate.default_translate_target_language === defaultTargetLanguage.value;
}

function translateDefaultSwitch_checked(value: string | number | boolean): void {
  config!.translate.default_translate_provide = defaultTranslateProvide.value
  config!.translate.default_translate_source_language = defaultSourceLanguage.value!
  config!.translate.default_translate_target_language = defaultTargetLanguage.value!
  useConfig().save_config(config!);
}

const route = useRoute();

watch(() => route.query.rand, async () => {
  if (route.query.target === 'word_selection') {
    setTimeout(async () => {
      ocr_text.value = await readText();
      translate_click()
    }, config?.common.word_selection_interval)
  } else if (route.query.target === 'ocr') {
    await once('wait-ocr-image-data-event', (event) => {
      imageData.value = (event.payload as { imageData: string }).imageData
      ocr_click()
    })
    await emit('result-page-mounted-event')
  }
}, { immediate: true })

</script>

<style scoped>
.page {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}

.page_space {
  padding: 10px 40px 20px 0px;
  width: 100%;
}
</style>