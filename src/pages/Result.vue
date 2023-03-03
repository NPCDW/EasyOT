<template>
  <el-card>
    <!--  图片展示块  -->
    <div>
      <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
      >
        <el-icon class="el-icon--upload"><i-ep-UploadFilled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>
    <!--  OCR 按钮块  -->
    <div>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-switch v-model="value1" />
      <span>设为默认</span>
      <el-button type="primary">Primary</el-button>
    </div>
    <!--  OCR文本块  -->
    <div>
      <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="Please input"
      />
    </div>
    <!--  翻译按钮块  -->
    <div>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-switch v-model="value1" />
      <span>设为默认</span>
      <el-button type="primary">Primary</el-button>
    </div>
    <!--  翻译文本块  -->
    <div>
      <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="Please input"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'

const value = ref('')
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
</script>

<style scoped>
</style>