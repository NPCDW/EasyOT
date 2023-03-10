<script setup lang="ts">
import { ref } from 'vue';
import {useConfig} from '../store/config'

interface SelectOption {
    label: string,
    value: string
}

const config = useConfig().get_config()

const autoStart = ref(false)
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
const wordSelectionInterval = ref(config?.common.word_selection_interval)
const defaultOcrProvide = ref(config?.ocr.default_ocr_provide)
const defaultOcrProvideOptions = ref([
  {
    label: "百度云",
    value: "BaiduCloud"
  },
  {
    label: "腾讯云",
    value: "TencentCloud"
  },
  {
    label: "SpaceOCR",
    value: "SpaceOCR"
  },
])
const defaultOcrType = ref(config?.ocr.default_ocr_type)
const defaultOcrTypeOptions = ref<[SelectOption]>()
const defaultOcrLanguage = ref(config?.ocr.default_ocr_language)
const defaultOcrLanguageOptions = ref<[SelectOption]>()
const tencentCloud_ocr_secretId = ref(config?.ocr.tencent_cloud.secret_id)
const tencentCloud_ocr_secretKey = ref(config?.ocr.tencent_cloud.secret_key)
const baiduCloud_ocr_appKey = ref(config?.ocr.baidu_cloud.client_id)
const baiduCloud_ocr_secretKey = ref(config?.ocr.baidu_cloud.client_secret)
const spaceOcr_ocr_apiKey = ref(config?.ocr.space_ocr.api_key)
const defaultMachineTranslate = ref(config?.translate.default_translate_provide)
const defaultMachineTranslateOptions = ref([
  {
    label: "百度翻译开放平台",
    value: "BaiduAI"
  },
  {
    label: "腾讯云",
    value: "TencentCloud"
  },
  {
    label: "谷歌翻译",
    value: "GoogleTranslate"
  },
])
const sourceLanguage = ref(config?.translate.default_translate_source_language)
const sourceLanguageOptions = ref<[SelectOption]>()
const targetLanguage = ref(config?.translate.default_translate_target_language)
const targetLanguageOptions = ref<[SelectOption]>()
const tencentCloud_translate_secretId = ref(config?.translate.tencent_cloud.secret_id)
const tencentCloud_translate_secretKey = ref(config?.translate.tencent_cloud.secret_key)
const baiduAI_translate_app_id = ref(config?.translate.baidu_ai.app_id)
const baiduAI_translate_app_secret = ref(config?.translate.baidu_ai.app_secret)
const ocrHotKey = ref(config?.hot_keys.ocr.text)
const wordSelectionTranslateHotKey = ref(config?.hot_keys.word_selection_translate.text)
const screenshotTranslateHotKey = ref(config?.hot_keys.screenshot_translate.text)
</script>

<template>
  <el-scrollbar class="page">
    <el-tabs tab-position="left" style="height: 100%">
      <el-tab-pane label="常规">
        <el-form label-width="120px" style="padding-right: 40px;">
          <el-form-item label="开机启动">
            <el-switch v-model="autoStart" />
          </el-form-item>
          <el-form-item label="语言">
            <el-select v-model="language" placeholder="Select">
              <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="取词间隔">
            <el-slider v-model="wordSelectionInterval" show-input />
          </el-form-item>
          <el-form-item label="配置目录">
            <el-button type="primary">打开</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文本识别">
        <el-scrollbar>
          <el-form label-width="120px" style="padding-right: 40px;">
            <el-divider content-position="left">默认文本识别</el-divider>
            <el-form-item label="云服务商">
              <el-select v-model="defaultOcrProvide" placeholder="Select">
                <el-option v-for="item in defaultOcrProvideOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="模式">
              <el-select v-model="defaultOcrType" placeholder="Select">
                <el-option v-for="item in defaultOcrTypeOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="defaultOcrLanguage" placeholder="Select">
                <el-option v-for="item in defaultOcrLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-divider content-position="left">腾讯云</el-divider>
            <el-form-item label="SecretID">
              <el-input v-model="tencentCloud_ocr_secretId" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="tencentCloud_ocr_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span>领取免费OCR额度</span>
            </el-form-item>
            <el-divider content-position="left">百度云</el-divider>
            <el-form-item label="AppKey">
              <el-input v-model="baiduCloud_ocr_appKey" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="baiduCloud_ocr_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span>领取免费OCR额度</span>
            </el-form-item>
            <el-divider content-position="left">SpaceOCR</el-divider>
            <el-form-item label="ApiKey">
              <el-input v-model="spaceOcr_ocr_apiKey" type="password" placeholder="Please input password" show-password />
            </el-form-item>
            <el-form-item label="→">
              <span>领取免费OCR额度</span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="机器翻译">
        <el-scrollbar>
          <el-form label-width="120px" style="padding-right: 40px;">
            <el-divider content-position="left">默认机器翻译</el-divider>
            <el-form-item label="云服务商">
              <el-select v-model="defaultMachineTranslate" placeholder="Select">
                <el-option v-for="item in defaultMachineTranslateOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="源语言">
              <el-select v-model="sourceLanguage" placeholder="Select">
                <el-option v-for="item in sourceLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="目标语言">
              <el-select v-model="targetLanguage" placeholder="Select">
                <el-option v-for="item in targetLanguageOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-divider content-position="left">腾讯云</el-divider>
            <el-form-item label="SecretID">
              <el-input v-model="tencentCloud_translate_secretId" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="SecretKey">
              <el-input v-model="tencentCloud_translate_secretKey" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span>领取免费翻译额度</span>
            </el-form-item>
            <el-divider content-position="left">百度翻译开放平台</el-divider>
            <el-form-item label="AppID">
              <el-input v-model="baiduAI_translate_app_id" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="AppSecret">
              <el-input v-model="baiduAI_translate_app_secret" type="password" placeholder="Please input password"
                show-password />
            </el-form-item>
            <el-form-item label="→">
              <span>领取免费翻译额度</span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="全局热键">
        <el-form label-width="120px" style="padding-right: 40px;">
          <el-form-item label="文本识别">
            <el-input v-model="ocrHotKey" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="划词翻译">
            <el-input v-model="wordSelectionTranslateHotKey" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="截图翻译">
            <el-input v-model="screenshotTranslateHotKey" placeholder="Please input" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute; bottom: 20px; left: 20px;">
      <el-button type="primary">保存</el-button>
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
