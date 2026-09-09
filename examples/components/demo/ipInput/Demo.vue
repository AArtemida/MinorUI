<template>
  <div class="ip-input-demo">
    <div class="ip-input-demo__row">
      <span class="ip-input-demo__label">基础用法</span>
      <mi-ip-input v-model="ip" @blur="onBlur"></mi-ip-input>
    </div>
    <div class="ip-input-demo__row">
      <span class="ip-input-demo__label">允许 *</span>
      <mi-ip-input v-model="ip2" is-allow></mi-ip-input>
    </div>
    <div class="ip-input-demo__row">
      <span class="ip-input-demo__label">禁用</span>
      <mi-ip-input v-model="ip3" disabled></mi-ip-input>
    </div>
    <p class="ip-input-demo__tip">基础用法绑定值：{{ ip || '（空）' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const ip = ref('')
const ip2 = ref('')
const ip3 = ref('192.168.0.1')

const onBlur = (val: string) => {
  console.log('blur', val)
}
</script>

<style lang="scss" scoped>
.ip-input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;

  &__row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__label {
    width: 70px;
    font-size: 13px;
    color: #606266;
  }

  &__tip {
    font-size: 13px;
    color: #909399;
  }
}
</style>
