<template>
  <mi-virtual-scroll :list="list" :rows="20" height="600">
    <template #default="{ item }">
      <div class="scroll-demo__item">children - {{ item.val }}</div>
    </template>
  </mi-virtual-scroll>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

let list: number[] = reactive([])
let arr = []
for (let i = 0; i < 300; i++) {
  arr.push({
    val: i
  })
}
list = arr
export default defineComponent({
  name: 'ScrollDemo',
  setup(props, context) {
    return {
      list,
    }
  },
})
</script>

<style lang="scss" scoped>
.scroll-demo__item {
  border-bottom: 1px solid #ddd;
  color: #333;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>