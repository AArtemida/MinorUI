<template>
  <div>
    <mi-image-list :img-list="list" :show-label="true"></mi-image-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"

  let list : any[] = reactive([])
  let arr = []
  for(let i = 0; i < 20; i++) {
    arr.push({
      label: `图片${i + 1}`,
      src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    })
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