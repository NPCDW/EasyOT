<script setup lang="ts">
</script>

<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 100%" class="el-tabs">
      <el-tab-pane label="常规">
        <el-form :model="form" label-width="120px">
          <el-form-item label="开机启动">
            <el-switch v-model="value1" />
          </el-form-item>
          <el-form-item label="语言">
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="取词间隔">
            <el-slider v-model="value" show-input />
          </el-form-item>
          <el-form-item label="配置目录">
            <el-button type="primary">打开</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文本识别">
        <el-card class="box-card">
          <template #header>
            默认文本识别
          </template>
          <div>
            <span>云服务商</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <span>模式</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <span>语言</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            腾讯云
          </template>
          <div>
            <span>SecretID</span>
            <el-input v-model="input" placeholder="Please input" />
          </div>
          <div>
            <span>SecretKey</span>
            <el-input
                v-model="input"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </div>
          <span>领取免费OCR额度</span>
        </el-card>
        <el-card class="box-card">
          <template #header>
            百度云
          </template>
          <div>
            <span>AppKey</span>
            <el-input v-model="input" placeholder="Please input" />
          </div>
          <div>
            <span>SecretKey</span>
            <el-input
                v-model="input"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </div>
          <span>领取免费OCR额度</span>
        </el-card>
        <el-card class="box-card">
          <template #header>
            SpaceOCR
          </template>
          <div>
            <span>ApiKey</span>
            <el-input
                v-model="input"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </div>
          <span>领取免费OCR额度</span>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="机器翻译">
        <el-card class="box-card">
          <template #header>
            默认机器翻译
          </template>
          <div>
            <span>云服务商</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <span>源语言</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <span>目标语言</span>
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            腾讯云
          </template>
          <div>
            <span>SecretID</span>
            <el-input v-model="input" placeholder="Please input" />
          </div>
          <div>
            <span>SecretKey</span>
            <el-input
                v-model="input"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </div>
          <span>领取免费翻译额度</span>
        </el-card>
        <el-card class="box-card">
          <template #header>
            百度云
          </template>
          <div>
            <span>AppKey</span>
            <el-input v-model="input" placeholder="Please input" />
          </div>
          <div>
            <span>SecretKey</span>
            <el-input
                v-model="input"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </div>
          <span>领取免费翻译额度</span>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="全局热键">
        <el-form :model="form" label-width="120px">
          <el-form-item label="文本识别">
            <el-input v-model="input" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="划词翻译">
            <el-input v-model="input" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="截图翻译">
            <el-input v-model="input" placeholder="Please input" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="关于">
        <el-descriptions
            title="EasyOT"
            :column="2"
            direction="horizontal"
        >
          <el-descriptions-item label="版本"><el-link href="https://element-plus.org" target="_blank">0.0.0</el-link></el-descriptions-item>
          <el-descriptions-item label="开源许可"><el-link href="https://element-plus.org" target="_blank">MIT License</el-link></el-descriptions-item>
          <el-descriptions-item label="版权所有"><el-link href="https://element-plus.org" target="_blank">© 2022 NPCDW</el-link></el-descriptions-item>
          <el-descriptions-item label="源码"><el-link href="https://element-plus.org" target="_blank">https://github.com/NPCDW/WpfTool</el-link></el-descriptions-item>
          <el-descriptions-item label="反馈"><el-link href="https://element-plus.org" target="_blank">chenyongli0520@gmail.com</el-link></el-descriptions-item>
          <el-descriptions-item label="友情链接"><el-link href="https://element-plus.org" target="_blank">https://www.0520.site</el-link></el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.container {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}
.el-tabs {
  border-right: none;
}
</style>
