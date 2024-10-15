<template>
  <div class="tooltip-demo">
    <mi-tooltip content="顶部提示" placement="top">
      <span class="tooltip-demo__item">上</span>
    </mi-tooltip>
    <mi-tooltip content="底部提示" placement="bottom">
      <span class="tooltip-demo__item">下</span>
    </mi-tooltip>
    <mi-tooltip content="左侧提示" placement="left">
      <span class="tooltip-demo__item">左</span>
    </mi-tooltip>
    <mi-tooltip content="右侧提示" placement="right">
      <span class="tooltip-demo__item">右</span>
    </mi-tooltip>
    <mi-tooltip placement="bottom" effect="light">
      <template #content>
        多行内容<br />
        第二行
      </template>
      <span class="tooltip-demo__item">light 多行</span>
    </mi-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TooltipDemo',
})
</script>

<style lang="scss" scoped>
.tooltip-demo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 30px 0 10px;
}
.tooltip-demo__item {
  padding: 6px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 13px;
  color: #606266;
  cursor: pointer;
}
</style>
