<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 14:21:14
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 18:28:47
-->
<template>
  <div class="mi-sidebar">
    <template v-for="(items, title) in sidebarList" :key="title">
      <p class="mi-title">{{ title }}</p>
      <ul>
        <li v-for="item in items" :key="item.name">
          <template v-if="item.items">
            <p class="mi-subtitle">{{ item.meta.title }}</p>
            <router-link
              class="mi-menu-li"
              v-for="li in item.items"
              :key="li.name"
              :to="{ path: li.path }"
            >
              {{ li.meta.title }}
            </router-link>
          </template>
          <router-link v-else class="mi-menu-li" :to="{ path: item.path }">
            {{ item.meta.title }}
          </router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavData from '@/nav.config.json'

// console.log(NavData)
export default defineComponent({
  name: 'Sidebar',
  setup() {
    return { sidebarList: NavData }
  },
})
</script>

<style lang="scss" scoped>
$primary: #2196f3;
$fontColor6: #666;
.mi-sidebar {
  text-align: left;
  font-size: 14px;
  width: 130px;
  border-right: 1px solid rgba($primary, .3);
  height: 100%;
  a {
    display: inline-block;
    color: $fontColor6;
    &:hover {
      color: $primary;
    }
  }
  .mi-title,
  .mi-subtitle {
    margin: 12px 0;
    font-weight: bold;
    margin-left: 15px;
  }
  .mi-subtitle {
    font-size: 12px;
    color: $fontColor6;
  }
  .mi-menu-li {
    padding: 8px 20px;
    width: 100%;
    &:hover {
      background: rgba(208,228,245);
    }
  }
}
</style>
