<template>
  <div class="split-pane-demo">
    <div class="split-pane-demo__toolbar">
      <button class="split-pane-demo__btn" @click="hide = !hide">
        {{ hide ? '显示左侧' : '隐藏左侧' }}
      </button>
      <span class="split-pane-demo__info">
        拖拽次数：{{ dragCount }}（dragMove 节流前）
      </span>
    </div>
    <mi-split-pane
      class="split-pane-demo__pane"
      :left-width="220"
      :right-min-width="450"
      :left-hide="hide"
      @dragMove="dragCount++"
    >
      <template #left>
        <ul class="split-pane-demo__list">
          <li v-for="i in 20" :key="i">列表项 {{ i }}</li>
        </ul>
      </template>
      <template #right>
        <div class="split-pane-demo__content">
          右侧内容区域，最小宽度 450px，可横向滚动。
        </div>
      </template>
    </mi-split-pane>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const hide = ref(false)
const dragCount = ref(0)
</script>

<style lang="scss" scoped>
.split-pane-demo {
  &__pane {
    height: 260px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  &__btn {
    padding: 4px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    font-size: 13px;
    color: #606266;
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__info {
    font-size: 13px;
    color: #909399;
  }

  &__list {
    margin: 0;
    padding: 10px;
    list-style: none;

    li {
      padding: 6px 10px;
      font-size: 13px;
      color: #606266;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #f5f7fa;
        color: var(--color-primary);
      }
    }
  }

  &__content {
    padding: 20px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
