<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 14:21:14
 * @LastEditors: hy
 * @LastEditTime: 2022-11-29 14:21:14
-->
<template>
  <div class="mi-sidebar">
    <div class="mi-sidebar__search">
      <mi-icon icon="icon-soushu" class="mi-sidebar__search-icon"></mi-icon>
      <input v-model="keyword" type="text" placeholder="搜索组件..." />
    </div>

    <nav class="mi-sidebar__nav">
      <div
        v-for="(items, title) in sidebarList"
        :key="'side_group_' + title"
        class="mi-sidebar__group"
      >
        <button class="mi-sidebar__group-title" @click="toggle(String(title))">
          {{ title }}
          <mi-icon
            class="mi-sidebar__arrow"
            :icon="isOpen(String(title)) ? 'icon-xiangxia2' : 'icon-xiangyou1'"
          ></mi-icon>
        </button>
        <ul v-if="isOpen(String(title))">
          <li v-for="item in items" :key="'side_item_' + item.name">
            <template v-if="item.items">
              <p class="mi-sidebar__subtitle">{{ item.meta.title }}</p>
              <router-link
                class="mi-sidebar__item"
                v-for="li in item.items"
                :key="'side_sub_' + li.name"
                :to="{ path: li.path }"
              >
                {{ li.meta.title }}
              </router-link>
            </template>
            <router-link v-else class="mi-sidebar__item" :to="{ path: item.path }">
              {{ item.meta.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="mi-sidebar__footer">10 components · MIT License</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavData from '@/nav.config.json'
import { NavModel, MenuItemModel } from '@/model/NavModel'

const keyword = ref('')
const collapsed = ref<Record<string, boolean>>({})

const matchKeyword = (item: MenuItemModel, kw: string) => {
  const title = item.meta?.title || ''
  const name = item.name || ''
  return (
    title.toLowerCase().includes(kw) || name.toLowerCase().includes(kw)
  )
}

const sidebarList = computed<NavModel>(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return NavData
  const result: NavModel = {}
  Object.keys(NavData).forEach(title => {
    const group = (NavData[title] as Array<MenuItemModel>)
      .map(item => {
        if (item.items) {
          const subs = item.items.filter(li => matchKeyword(li, kw))
          return subs.length ? { ...item, items: subs } : null
        }
        return matchKeyword(item, kw) ? item : null
      })
      .filter((item): item is MenuItemModel => !!item)
    if (group.length) result[title] = group
  })
  return result
})

const toggle = (title: string) => {
  collapsed.value[title] = !collapsed.value[title]
}

const isOpen = (title: string) => {
  if (keyword.value.trim() !== '') return true
  return !collapsed.value[title]
}
</script>

<style lang="scss" scoped>
.mi-sidebar {
  width: 240px;
  flex: none;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
  font-size: 14px;
  background: linear-gradient(180deg, #1e1b4b 0%, #2d1b69 100%);
  border-right: 1px solid rgba(139, 92, 246, 0.18);

  &__search {
    position: relative;
    padding: 16px;
    border-bottom: 1px solid rgba(139, 92, 246, 0.14);

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px 8px 32px;
      border-radius: 8px;
      border: 1px solid rgba(139, 92, 246, 0.25);
      background: rgba(255, 255, 255, 0.06);
      color: #e2e8f0;
      font-size: 13px;
      outline: none;
      font-family: var(--mi-font-body);

      &::placeholder {
        color: rgba(196, 181, 253, 0.4);
      }

      &:focus {
        border-color: rgba(139, 92, 246, 0.6);
      }
    }
  }

  &__search-icon {
    position: absolute;
    left: 26px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(196, 181, 253, 0.5);
    pointer-events: none;
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
  }

  &__group-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 16px;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(167, 139, 250, 0.65);
    font-family: var(--mi-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 8px;
  }

  &__arrow {
    font-size: 10px;
    opacity: 0.7;
  }

  &__subtitle {
    margin: 12px 0 4px 24px;
    font-size: 11px;
    color: rgba(167, 139, 250, 0.45);
    font-weight: 700;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 7px 16px 7px 24px;
    width: 100%;
    box-sizing: border-box;
    border-left: 2px solid transparent;
    color: rgba(196, 181, 253, 0.6);
    font-size: 14px;
    font-family: var(--mi-font-body);
    text-decoration: none;
    transition: all 0.12s;

    &:hover {
      color: #fff;
      background: rgba(139, 92, 246, 0.1);
    }
  }

  &__footer {
    padding: 12px 16px;
    border-top: 1px solid rgba(139, 92, 246, 0.14);
    text-align: center;
    font-family: var(--mi-font-mono);
    font-size: 11px;
    color: rgba(167, 139, 250, 0.4);
  }
}

.router-link-active {
  background: rgba(139, 92, 246, 0.2) !important;
  border-left: 2px solid #a78bfa !important;
  color: #fff !important;
  font-weight: 500;
}
</style>
