<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-26 14:29:01
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 09:58:21
-->
<template>
  <div class="mi-doc">
    <Sidebar/>
    <div class="mi-doc-content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Sidebar
  }
})
</script>

<style lang="scss" scoped>
.mi-doc {
  display: flex;
  height: 100%;
  .mi-doc-content {
    flex: 1 auto;
    padding: 20px;
    padding-left: calc(15% + 30px);
    overflow-y: scroll;
  }
}
</style>
