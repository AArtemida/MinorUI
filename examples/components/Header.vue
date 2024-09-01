<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 10:49:14
 * @LastEditors: hy
 * @LastEditTime: 2022-11-29 10:49:14
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'LayoutHeader',
})

const route = useRoute()

const navs = [
  { path: '/', label: '首页', match: (p: string) => p === '/' },
  { path: '/install', label: '指南', match: (p: string) => ['/install', '/quickstart', '/theme', '/introduce', '/logs'].includes(p.toLowerCase()) },
  { path: '/Card', label: '组件', match: (p: string) => !['/', '/install', '/quickstart', '/theme', '/introduce', '/logs'].includes(p.toLowerCase()) },
]

const activeNav = computed(() => {
  const p = route.path.toLowerCase()
  return navs.find(n => n.match(p))?.path ?? '/'
})
</script>

<template>
  <header class="mi-header">
    <router-link to="/" class="mi-logo">
      <span class="mi-logo__box">M</span>
      <span class="mi-logo__text">
        Minor UI
        <em>components</em>
      </span>
    </router-link>

    <nav class="mi-nav">
      <router-link
        v-for="nav in navs"
        :key="'nav_' + nav.path"
        :to="nav.path"
        class="mi-nav-item"
        :class="{ 'is-active': activeNav === nav.path }"
      >
        {{ nav.label }}
      </router-link>
    </nav>

    <div class="mi-header__right">
      <span class="mi-version">v0.1.4</span>
      <router-link to="/install">
        <button class="mi-header__btn">快速开始</button>
      </router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.mi-header {
  height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: linear-gradient(135deg, #1e1b4b 0%, #2d1b69 100%);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}

.mi-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  &__box {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    color: #fff;
    font-family: var(--mi-font-display);
    font-weight: 800;
    font-size: 16px;
  }

  &__text {
    font-family: var(--mi-font-display);
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    letter-spacing: -0.02em;

    em {
      color: #a78bfa;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      margin-left: 6px;
    }
  }
}

.mi-nav {
  display: flex;
  gap: 4px;
}

.mi-nav-item {
  padding: 6px 20px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--mi-font-body);
  color: rgba(196, 181, 253, 0.7);
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    color: #fff;
  }

  &.is-active {
    color: #fff;
    background: rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.4);
  }
}

.mi-header__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mi-version {
  padding: 3px 10px;
  border-radius: 100px;
  font-family: var(--mi-font-mono);
  font-size: 12px;
  font-weight: 600;
  color: #a78bfa;
  background: rgba(99, 102, 241, 0.2);
}

.mi-header__btn {
  padding: 7px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: var(--mi-font-body);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(124, 58, 237, 0.45);
  }
}
</style>
