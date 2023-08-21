<template>
  <mi-virtual-scroll :list="list" :rows="20" height="500">
    <template #default="{ item }">
      <div class="scroll-demo__item">children - {{ item.val }}</div>
    </template>
  </mi-virtual-scroll>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

let list: unknown[] = reactive([])
let arr: unknown[] =  []
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
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 2px;
  background: #efe8f5;
  margin-bottom: 10px;
}
</style>