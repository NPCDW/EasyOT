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
    </el-tabs>
  </div>
</template>

<style scoped>
.container {
  background: var(--dark-background-color);
  height: calc(100vh - var(--title-bar-height));
}
</style>
