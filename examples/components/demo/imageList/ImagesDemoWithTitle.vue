<template>
  <div>
    <mi-image-list :img-list="list" :show-label="true"></mi-image-list>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue"
  import { ImageItem } from '@/model/ImageModel'
  
  let list : ImageItem[] = reactive([])
  let arr : ImageItem[] = []
  for(let i = 0; i < 20; i++) {
    let item: ImageItem = {
      label: `图片${i + 1}`,
      src: 'https://ts3.cn.mm.bing.net/th?id=OIP-C.QRWK-9C3xj3VddR8OBfT6AHaHA&w=256&h=243&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
    }
    if(i % 2) {
      item.src = 'https://tse2-mm.cn.bing.net/th/id/OIP-C.2jt7ZGpVnPbgwa36A0k9UQHaG6?w=197&h=184&c=7&r=0&o=5&pid=1.7'
    }
    arr.push(item)
  }
  list = arr
</script>