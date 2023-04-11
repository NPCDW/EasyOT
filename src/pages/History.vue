<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { invoke } from '@tauri-apps/api/tauri'
import { ElNotification } from 'element-plus';
import { ref, watch } from 'vue'
import moment from "moment"

const { t } = useI18n({ useScope: 'global' })

interface History {
    id: number,
    create_time: string,
    image_data: string,
    ocr_text: string,
    translate_text: string,
    cloud: string,
}

interface ListHistoryResponseResult {
    code: number,
    message: string,
    data: { 
        count: number,
        list: History[]
    }
}

const tableData = ref<History[]>([])

invoke("list_history", {query: {page_number: 1, page_size: 10}}).then(async res => {
    let result = res as ListHistoryResponseResult
    if (result.code !== 20000) {
        ElNotification({
            title: 'Error',
            message: result.message,
            type: 'error',
            offset: 40,
        })
    }
    result.data.list.forEach(item => {
        // item.create_time = new Date(item.create_time).toLocaleString()
        item.create_time = moment(new Date(item.create_time)).fromNow();
    })
    tableData.value = result.data.list
})

</script>

<template>
  <el-scrollbar class="page">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="" width="50" />
        <el-table-column prop="create_time" :label="t('history.create_time')" width="160" />
        <el-table-column :label="t('history.image_data')">
            <template #default="{ row, column, $index }">
                <div v-if="row.image_data && row.image_data.length > 24" style="display: flex; align-items: center">
                    <el-image style="max-height: 180px;" :src="'data:image/png;base64,' + row.image_data" fit="scale-down" />
                </div>
            </template>
        </el-table-column>
        <el-table-column :label="t('history.ocr_text')">
            <template #default="{ row, column, $index }">
                <el-popover trigger="click" width="400" :content="row.ocr_text">
                    <template #reference>
                        <div style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">{{ row.ocr_text }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column :label="t('history.translate_text')">
            <template #default="{ row, column, $index }">
                <el-popover trigger="click" width="400" :content="row.translate_text">
                    <template #reference>
                        <div style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">{{ row.translate_text }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="cloud" :label="t('history.cloud')" width="150" />
    </el-table>
  </el-scrollbar>
</template>

<style scoped>
.page {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}
</style>
