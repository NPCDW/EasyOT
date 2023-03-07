<template>
  <el-card>
    <!--  图片展示块  -->
    <div>
      <el-upload
          class="border-dashed border-2 border-sky-500 rounded-md"
          style="height: 188px;width: 100%;"
          action="#"
          :show-file-list="false"
          accept="image/*"
          :auto-upload="false"
          v-model:file-list="file_list"
          :on-change="file_change"
      >
        <template v-if="file_list && file_list.length > 0">
          <el-image style="width: 100%; height: 100%" :src="file_list[0].url" fit="contain" />
        </template>
        <template v-else>
          <el-icon class="el-icon--upload"><i-ep-UploadFilled /></el-icon>
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
          v-model="ocr_text"
          :rows="8"
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
          :rows="8"
          type="textarea"
          placeholder="Please input"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {UploadUserFile, UploadProps, UploadFile, UploadFiles} from "element-plus";
import { readText } from '@tauri-apps/api/clipboard';
import { useRoute } from "vue-router";

const file_list = ref<UploadUserFile[]>([]);

const value = ref('')
const textarea = ref('')
const value1 = ref('')
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
</style>