<!--
 * @Description:
 * @Author: hy
 * @Date: 2021-11-29 14:24:44
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 15:08:11
-->
<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: 'Card',
    props: {
      text: {
        type: String,
        default: 'click'
      }
    },
  })
</script>

<template>
  <button>
    {{ text }}
  </button>
</template>