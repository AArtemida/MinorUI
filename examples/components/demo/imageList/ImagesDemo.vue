<template>
  <div>
    <mi-image-list :img-list="list"></mi-image-list>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue"
  import { ImageItem } from '@/model/ImageModel'

  let list : ImageItem[] = reactive([])
  let arr : ImageItem[] = []
  for(let i = 0; i < 20; i++) {
    if(i % 2) {
      arr.push({
        src: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.PY7v2oONjKWO8VM7pHJ85wHaIK?w=180&h=198&c=7&r=0&o=5&pid=1.7'
      })
    } else {
      arr.push({
        src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.xYVe8aav6Ujm_4nvLofJ6QHaID?w=192&h=209&c=7&r=0&o=5&pid=1.7'
      })
    }
  }
  list = arr
</script>