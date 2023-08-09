<template>
  <div>
    <mi-gallery :img-list="list" :show-label="true"></mi-gallery>
  </div>
</template>

<script lang="ts" setup>
import { ImageItem } from '@/model/ImageModel'
import { reactive } from 'vue'

let list: ImageItem[] = reactive([])
let arr = []
for (let i = 0; i < 20; i++) {
  let item: ImageItem = {
    label: `图片${i + 1}`,
    src: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.PY7v2oONjKWO8VM7pHJ85wHaIK?w=180&h=198&c=7&r=0&o=5&pid=1.7',
  }
  if (i % 2) {
    item.src =
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.xYVe8aav6Ujm_4nvLofJ6QHaID?w=192&h=209&c=7&r=0&o=5&pid=1.7'
  }
  arr.push(item)
}
list = arr
</script>
