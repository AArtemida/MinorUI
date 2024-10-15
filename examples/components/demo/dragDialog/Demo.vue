<template>
  <div>
    <mi-drag-dialog
      :columns="columns"
      :height="280"
      @submit="handleSubmit"
    />

    <div class="drag-demo__result">
      <p class="drag-demo__tip">提交后的列顺序(显隐标记 visible:0 显示 / 1 隐藏):</p>
      <p class="drag-demo__cols">
        <span
          v-for="col in columns"
          :key="col.key"
          class="drag-demo__col"
          :class="{ 'is-hidden': col.visible === 1 }"
        >
          {{ col.label }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'DragDialogDemo',
  setup() {
    const columns = reactive([
      { key: 0, label: '默认列', visible: 0 },
      { key: 1, label: '名称', visible: 0 },
      { key: 2, label: '类型', visible: 0 },
      { key: 3, label: '状态', visible: 0 },
      { key: 4, label: '创建时间', visible: 0 },
      { key: 5, label: '更新时间', visible: 1 },
      { key: 6, label: '备注', visible: 1 },
    ])

    const handleSubmit = (cols: typeof columns) => {
      columns.splice(0, columns.length, ...cols)
    }

    return { columns, handleSubmit }
  },
})
</script>

<style lang="scss" scoped>
.drag-demo__result {
  margin-top: 16px;
}
.drag-demo__tip {
  margin: 0 0 8px;
  font-size: 13px;
  color: #909399;
}
.drag-demo__cols {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}
.drag-demo__col {
  padding: 2px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 13px;
  color: #606266;

  &.is-hidden {
    color: #c0c4cc;
    border-style: dashed;
    background: #f5f7fa;
  }
}
</style>
