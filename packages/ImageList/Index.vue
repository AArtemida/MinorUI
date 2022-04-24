<!--
 * @Description:
 * @Author: hy
 * @Date: 2021-12-15 16:54:14
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 10:25:29
-->
<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: 'MiImageList',
    props: {
      imgList: Array
    }
  })
</script>

<template>
  <div class="mi-images">
    <img class="mi-image-item" v-for="img in imgList" :key="'mi_image_list_'+img" :src="img" alt="img">

  </div>
</template>

<style lang="scss" scoped>
.mi-images {
  display: flex;
  overflow-x: scroll;
  .mi-image-item {
    flex: none;
    width: 120px;
    height: 120px;
    & + .mi-image-item {
      margin-left: 10px;
    }
  }
}
</style>