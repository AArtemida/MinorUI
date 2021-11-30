<!--
 * @Description:
 * @Author: hy
 * @Date: 2021-11-29 10:49:14
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 17:10:46
-->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    return {
      navs: {
        introduce: '介绍',
        card: '组件',
      },
    }
  },
})
</script>

<template>
  <header class="mi-header">
    <router-link to="/" class="mi-logo">Header</router-link>

    <nav>
      <a>{{ n }}</a>
      <router-link
        v-for="(label, nav) in navs"
        :key="'nav_' + nav"
        :to="{ path: nav }"
        class="mi-nav-item"
      >
        {{ label }}
      </router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
$primary: #2196f3;
$white: #fff;
.mi-header {
  background: linear-gradient(to left, #7b4397, $primary);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  a {
    color: $white;
  }
  .mi-nav-item {
    font-size: 14px;
    & + .mi-nav-item {
      margin-left: 20px;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
