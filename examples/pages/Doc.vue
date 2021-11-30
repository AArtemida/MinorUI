<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-26 14:29:01
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 17:09:30
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
  }
}
</style>
