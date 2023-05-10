<template>
  <mi-hor-timeline :data="data">
    <template #default="{ item }">
      <div class="timeline-demo___item">{{ item }}</div>
    </template>
  </mi-hor-timeline>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"

  let data = reactive({
    2019: ['卡片1', '卡片2'],
    2020: ['卡片3'],
    2021: ['卡片4', '卡片5', '卡片6'],
    2022: ['卡片7', '卡片8']
  })
  export default defineComponent({
    name: 'TimelineDemo',
    setup(props, context) {
      return {
        data
      }
    }
  })
</script>

<style scoped>
  .timeline-demo___item {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    width: 250px;
    padding: 20px;
    margin-right: 20px;
  }
</style>