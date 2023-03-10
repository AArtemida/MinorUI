<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 14:21:14
 * @LastEditors: hy
 * @LastEditTime: 2022-06-23 14:17:37
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

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavData from '@/nav.config.json'

// console.log(NavData)
const sidebarList: any = NavData

const route = useRoute()
const activeIndex = ref(route.path)

/* 路由 */
watch(
  () => route.path,
  n => {
    activeIndex.value = n.toLowerCase()
  }
)

// const handleSelect = (key: string) => {
//   activeIndex.value = key
// }
</script>

<style lang="scss" scoped>
$primary: #2196f3;
$fontColor6: #666;
.mi-sidebar {
  text-align: left;
  font-size: 14px;
  width: 15%;
  border-right: 1px solid rgba($primary, 0.3);
  height: 100%;
  flex: none;
  position: fixed;
  overflow-y: auto;
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
    word-break: break-word;
    white-space: normal;
    box-sizing: border-box;
    border-radius: 8px;
    &:hover {
      background: rgba(208, 228, 245);
    }
  }
}
.router-link-active {
  background: #d0e4f5;
  color: $primary !important;
}
</style>