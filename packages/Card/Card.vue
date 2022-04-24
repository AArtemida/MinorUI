<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 14:24:44
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:17:57
-->
<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: 'MiCard',
  })
</script>


<template>
  <div class="mi-card">
    <div class="mi-card__header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="mi-card__content">
      <slot></slot>
    </div>
  </div>
</template>