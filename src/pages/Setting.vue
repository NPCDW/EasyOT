<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { ElNotification } from 'element-plus';
import type { FormRules } from 'element-plus'
import {useConfig} from '../store/config'
import {useRuntimeConfig} from '../store/runtimeConfig'
import {translateProvideOptions, getTranslateLanguageOptions, type TranslateLanguageKeys} from '../store/translateOptions'
import {ocrProvideOptions, getOcrLanguageOptions, getOcrModeOptions, type OcrLanguageKeys} from '../store/ocrOptions'
import _ from 'lodash';
import { invoke } from '@tauri-apps/api/tauri'
import { platform } from '@tauri-apps/api/os';
import { Command } from '@tauri-apps/api/shell'
import {useI18n} from 'vue-i18n'

let config = useConfig().get_config()
let runtimeConfig = useRuntimeConfig().getRuntimeConfig()

const { t, locale } = useI18n({ useScope: 'global' })

const language = ref(config?.common.language)
const languageOptions = ref([
  {
    label: "English",
    value: "en_US"
  },
  {
    label: "简体中文",
    value: "zh_CN"
  },
])
function languageChange(val: string) {
  locale.value = val
  config!.common.language = val
}

const wordSelectionInterval = ref(config?.common.word_selection_interval)

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

const tencentCloud_ocr_secretId = ref(config?.ocr.tencent_cloud.secret_id)
const tencentCloud_ocr_secretKey = ref(config?.ocr.tencent_cloud.secret_key)
const baiduCloud_ocr_appKey = ref(config?.ocr.baidu_cloud.client_id)
const baiduCloud_ocr_secretKey = ref(config?.ocr.baidu_cloud.client_secret)
const spaceOcr_ocr_apiKey = ref(config?.ocr.space_ocr.api_key)

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

const tencentCloud_translate_secretId = ref(config?.translate.tencent_cloud.secret_id)
const tencentCloud_translate_secretKey = ref(config?.translate.tencent_cloud.secret_key)
const baiduAI_translate_app_id = ref(config?.translate.baidu_ai.app_id)
const baiduAI_translate_app_secret = ref(config?.translate.baidu_ai.app_secret)
const ocrHotKey = ref(config?.hot_keys.ocr)
const wordSelectionTranslateHotKey = ref(config?.hot_keys.word_selection_translate)
const screenshotTranslateHotKey = ref(config?.hot_keys.screenshot_translate)

async function save() {
    config!.common.language = language.value!
    config!.common.word_selection_interval = wordSelectionInterval.value!

    config!.ocr.default_ocr_provide = defaultOcrProvide.value!
    config!.ocr.default_ocr_mode = defaultOcrMode.value!
    config!.ocr.default_ocr_language = defaultOcrLanguage.value!
    config!.ocr.baidu_cloud.client_id = baiduCloud_ocr_appKey.value!
    config!.ocr.baidu_cloud.client_secret = baiduCloud_ocr_secretKey.value!
    config!.ocr.tencent_cloud.secret_id = tencentCloud_ocr_secretId.value!
    config!.ocr.tencent_cloud.secret_key = tencentCloud_ocr_secretKey.value!
    config!.ocr.space_ocr.api_key = spaceOcr_ocr_apiKey.value!

    config!.translate.default_translate_provide = defaultTranslateProvide.value!
    config!.translate.default_translate_source_language = defaultSourceLanguage.value!
    config!.translate.default_translate_target_language = defaultTargetLanguage.value!
    config!.translate.baidu_ai.app_id = baiduAI_translate_app_id.value!
    config!.translate.baidu_ai.app_secret = baiduAI_translate_app_secret.value!
    config!.translate.tencent_cloud.secret_id = tencentCloud_translate_secretId.value!
    config!.translate.tencent_cloud.secret_key = tencentCloud_translate_secretKey.value!

    await useConfig().save_config(config!);
    ElNotification({
      title: t('setting.success'),
      message: t('setting.saveSuccess'),
      type: 'success',
      duration: 2000,
      offset: 40,
    })
}

function cancel() {
  window.location.reload()
}

const hotkey_isok = ref(false)

function hotkey_keydown(event: KeyboardEvent) {
  event.preventDefault()
  // console.log(event)
  const input = event.target as HTMLInputElement
  if (event.key === 'Backspace' || event.key === 'Delete') {
    input.value = ""
    hotkey_isok.value = true
    input.dispatchEvent(new Event('input'))
    return
  }
  input.value = ""
  if (event.ctrlKey) {
    input.value += "Control+"
  }
  if (event.shiftKey) {
    input.value += "Shift+"
  }
  if (event.metaKey) {
    input.value += "Super+"
  }
  if (event.altKey) {
    input.value += "Alt+"
  }
  // F1-F12
  if (event.keyCode >= 112 && event.keyCode <= 123) {
    input.value += event.key.toUpperCase()
    hotkey_isok.value = true
    input.dispatchEvent(new Event('input'))
    return
  }
  if (event.keyCode >= 65 && event.keyCode <= 90    // a-z
      || event.keyCode >= 48 && event.keyCode <= 57    // 0-9
      || event.keyCode >= 96 && event.keyCode <= 105    // 数字键盘 0-9
  ) {
    input.value += event.key.toUpperCase()
    if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) {
      hotkey_isok.value = true
      input.dispatchEvent(new Event('input'))
      return
    }
  }
  hotkey_isok.value = false
  input.dispatchEvent(new Event('input'))
}

const validateOcrHotKey = async (rule: any, value: any, callback: any) => {
  if (!hotkey_isok.value) {
    callback(new Error(t('setting.ShortcutKeysInvalid')))
  } else {
    let res = await invoke("reregister_for_ocr", { key: ocrHotKey.value })
    if (!res) {
      callback(new Error(t('setting.ShortcutKeysInUsed')))
    } else {
      config!.hot_keys.ocr = ocrHotKey.value!
      callback()
    }
  }
}

const validateWordSelectionTranslateHotKey = async (rule: any, value: any, callback: any) => {
  if (!hotkey_isok.value) {
    callback(new Error(t('setting.ShortcutKeysInvalid')))
  } else {
    let res = await invoke("reregister_for_word_selection_translate", { key: wordSelectionTranslateHotKey.value })
    if (!res) {
      callback(new Error(t('setting.ShortcutKeysInUsed')))
    } else {
      config!.hot_keys.word_selection_translate = wordSelectionTranslateHotKey.value!
      callback()
    }
  }
}

const hotkeyRules = reactive<FormRules>({
  ocrHotKey: [{ asyncValidator: validateOcrHotKey, trigger: 'change' }],
  wordSelectionTranslateHotKey: [{ asyncValidator: validateWordSelectionTranslateHotKey, trigger: 'change' }],
  // screenshotTranslateHotKey: [{ asyncValidator: validateOcrHotKey, trigger: 'change' }],
})

async function openConfigDir() {
  const platformName = await platform();
  const configPath = runtimeConfig?.config_path!
  if (platformName === 'win32') {
    let command = new Command('open-dir-select-file-win', ['/select,' + configPath])
    await command.execute();
  } else if (platformName === 'linux') {
    const configDir = configPath.substring(0, configPath.lastIndexOf('/'))
    let command = new Command('open-dir-linux', [configDir])
    await command.execute();
  } else if (platformName === 'darwin') {
    const configDir = configPath.substring(0, configPath.lastIndexOf('/'))
    let command = new Command('open-dir-mac', [configDir])
    await command.execute();
  }
}

const autoStart = ref(false)
invoke('get_status').then(res => {
  autoStart.value = res as boolean
})
async function autoStartBeforeChange() {
  let res;
  if (autoStart.value) {
    res = await invoke('disable')
  } else {
    res = await invoke('enable')
  }
  if (res) {
    ElNotification({
      title: t('setting.success'),
      message: t('setting.setSuccess'),
      type: 'success',
      duration: 2000,
      offset: 40,
    })
  } else {
    ElNotification({
      title: t('setting.fail'),
      message: t('setting.setFail'),
      type: 'error',
      duration: 2000,
      offset: 40,
    })
  }
  return res
}
</script>

<template>
  <el-scrollbar class="page">
    <el-tabs tab-position="left" style="height: 100%">
      <el-tab-pane :label="t('setting.comman')">
        <el-form label-width="120px" style="padding-right: 40px;">
          <el-form-item :label="t('setting.autoStart')">
            <el-switch v-model="autoStart" :before-change="autoStartBeforeChange" />
          </el-form-item>
          <el-form-item :label="t('setting.language')">
            <el-select v-model="language" placeholder="Select" @change="languageChange">
              <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('setting.WordSelectionInterval')">
            <el-input-number v-model="wordSelectionInterval" :min="200" :max="1000" :step="100" />
          </el-form-item>
          <el-form-item :label="t('setting.ConfigurationFileStorageLocation')">
            <el-button type="primary" @click="openConfigDir">{{ t('setting.open') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="t('setting.TextRecognition')">
        <el-scrollbar>
          <el-form label-width="120px" style="padding-right: 40px;">
            <el-divider content-position="left">{{ t('setting.DefaultTextRecognition') }}</el-divider>
            <el-form-item :label="t('setting.CloudServiceProvider')">
              <el-select v-model="defaultOcrProvide" placeholder="Select">
                <el-option v-for="item in ocrProvideOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('setting.ocrMode')">
              <el-select v-model="defaultOcrMode" placeholder="Select">
                <el-option v-for="item in ocrModeOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('setting.ocrLanguage')">
              <el-select v-model="defaultOcrLanguage" placeholder="Select">
                <el-option v-for="item in ocrLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-divider content-position="left">{{ t('setting.TencentCloud') }}</el-divider>
            <el-form-item label="SecretID">
              <el-input v-model="tencentCloud_ocr_secretId" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="tencentCloud_ocr_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span><el-link href="https://cloud.tencent.com/document/product/866/35945" target="_blank">{{ t('setting.TencentCloudFreeQuota') }}</el-link></span>
            </el-form-item>
            <el-divider content-position="left">{{ t('setting.BaiduCloud') }}</el-divider>
            <el-form-item label="AppKey">
              <el-input v-model="baiduCloud_ocr_appKey" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="baiduCloud_ocr_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span><el-link href="https://cloud.baidu.com/doc/OCR/s/fk3h7xu7h" target="_blank">{{ t('setting.BaiduCloud') }}</el-link></span>
            </el-form-item>
            <el-divider content-position="left">SpaceOCR</el-divider>
            <el-form-item label="ApiKey">
              <el-input v-model="spaceOcr_ocr_apiKey" type="password" placeholder="Please input password" show-password />
            </el-form-item>
            <el-form-item label="→">
              <span><el-link href="https://ocr.space/OCRAPI" target="_blank">{{ t('setting.SpaceOCRFreeQuota') }}</el-link></span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="t('setting.MachineTranslation')">
        <el-scrollbar>
          <el-form label-width="120px" style="padding-right: 40px;">
            <el-divider content-position="left">{{ t('setting.DefaultMachineTranslation') }}</el-divider>
            <el-form-item :label="t('setting.CloudServiceProvider')">
              <el-select v-model="defaultTranslateProvide" placeholder="Select">
                <el-option v-for="item in translateProvideOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('setting.SourceLanguage')">
              <el-select v-model="defaultSourceLanguage" placeholder="Select">
                <el-option v-for="item in sourceLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('setting.TargetLanguage')">
              <el-select v-model="defaultTargetLanguage" placeholder="Select">
                <el-option v-for="item in targetLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-divider content-position="left">{{ t('setting.TencentCloud') }}</el-divider>
            <el-form-item label="SecretID">
              <el-input v-model="tencentCloud_translate_secretId" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="tencentCloud_translate_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span><el-link href="https://cloud.tencent.com/document/product/551/35017" target="_blank">{{ t('setting.TencentCloudTranslateFreeQuota') }}</el-link></span>
            </el-form-item>
            <el-divider content-position="left">{{ t('setting.BaiduTranslate') }}</el-divider>
            <el-form-item label="AppID">
              <el-input v-model="baiduAI_translate_app_id" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="AppSecret">
              <el-input v-model="baiduAI_translate_app_secret" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span><el-link href="https://fanyi-api.baidu.com/product/111" target="_blank">{{ t('setting.BaiduTranslateFreeQuota') }}</el-link></span>
            </el-form-item>
            <el-divider content-position="left">{{ t('setting.GoogleTranslate') }}</el-divider>
            <el-form-item label="→">
              <span>{{ t('setting.GoogleTranslateFreeQuota') }}</span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="t('setting.GlobalHotkey')">
        <el-form label-width="120px" style="padding-right: 40px;" status-icon :rules="hotkeyRules">
          <el-form-item :label="t('setting.ocrHotKey')" prop="ocrHotKey" :validate-status="runtimeConfig?.hotkey_conflict.ocr ? 'error' : ''" :error="runtimeConfig?.hotkey_conflict.ocr ? t('setting.ShortcutKeysInUsed') : ''">
            <el-input v-model="ocrHotKey" @keydown="hotkey_keydown($event)" :placeholder="t('setting.NoShortcutKeySet')" />
          </el-form-item>
          <el-form-item :label="t('setting.wordSelectionTranslateHotKey')" prop="wordSelectionTranslateHotKey" :validate-status="runtimeConfig?.hotkey_conflict.word_selection_translate ? 'error' : ''" :error="runtimeConfig?.hotkey_conflict.word_selection_translate ? t('setting.ShortcutKeysInUsed') : ''">
            <el-input v-model="wordSelectionTranslateHotKey" @keydown="hotkey_keydown($event)" :placeholder="t('setting.NoShortcutKeySet')" />
          </el-form-item>
          <el-form-item :label="t('setting.screenshotTranslateHotKey')" prop="screenshotTranslateHotKey" :validate-status="runtimeConfig?.hotkey_conflict.screenshot_translate ? 'error' : ''" :error="runtimeConfig?.hotkey_conflict.screenshot_translate ? t('setting.ShortcutKeysInUsed') : ''">
            <el-input v-model="screenshotTranslateHotKey" @keydown="hotkey_keydown($event)" :placeholder="t('setting.NoShortcutKeySet')" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute; bottom: 20px; left: 20px;">
      <el-space direction="vertical">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-space>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.page {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
  padding: 10px 40px 20px 0px;
}

.el-tab-pane {
  width: 100%;
  height: calc(100vh - var(--title-bar-height) - 30px);
}

</style>
