<!--
 * @Description:
 * @Author: hy
 * @Date: 2021-12-15 17:33:13
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 16:57:48
-->
<template>
  <div>
    <mi-image-list :img-list="list"></mi-image-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"

  let list : any[] = reactive([])
  let arr = []
  for(let i = 0; i < 20; i++) {
    arr.push('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
  }
  list = arr
  export default defineComponent({
    name: 'ImagesDemo',
    setup(props, context) {
      return {
        list
      }
    }
  })
</script>