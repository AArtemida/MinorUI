<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-26 14:29:01
 * @LastEditors: hy
 * @LastEditTime: 2022-11-29 14:29:01
-->
<template>
  <div class="home">
    <!-- ── Hero ── -->
    <section class="hero">
      <canvas ref="canvas" class="hero__canvas"></canvas>
      <div class="hero__grid"></div>
      <div class="hero__glow"></div>
      <div class="hero__inner">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
             功能组件库
        </div>
        <h1 class="hero__title">
          轻量组件，
          <br />
          <span class="hero__title-grad">随取随用。</span>
        </h1>
        <p class="hero__desc">
          为 Vue 3 打造的功能型组件，支持按需引入，帮助你更快交付产品。
        </p>
        <div class="hero__actions">
          <router-link to="/Card">
            <button class="hero__btn">浏览组件 →</button>
          </router-link>
          <div class="hero__npm">
            <span class="hero__npm-sign">$</span>npm i v-minor-ui
          </div>
        </div>
      </div>
    </section>

    <!-- ── Stats ── -->
    <!-- <section class="stats">
      <div class="stats__inner">
        <div
          v-for="(s, i) in statsList"
          :key="'stat_' + s.label"
          class="stats__item"
          :class="{ 'is-last': i === statsList.length - 1 }"
        >
          <div class="stats__value">{{ s.value }}</div>
          <div class="stats__label">{{ s.label }}</div>
        </div>
      </div>
    </section> -->

    <!-- ── Component showcase ── -->
    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__eyebrow">组件库</div>
          <h2 class="section__title">应有尽有</h2>
        </div>
        <router-link class="section__more" to="/Card">查看全部组件 →</router-link>
      </div>
      <div class="showcase">
        <router-link
          v-for="c in components"
          :key="'show_' + c.name"
          :to="c.path"
          class="showcase__card"
        >
          <mi-icon :icon="c.icon" class="showcase__icon"></mi-icon>
          <div class="showcase__name">{{ c.name }}</div>
          <div class="showcase__cat">{{ c.cat }}</div>
        </router-link>
      </div>
    </section>

    <!-- ── Features ── -->
    <section class="section">
      <div class="section__center">
        <div class="section__eyebrow">为什么选择 Minor UI</div>
        <h2 class="section__title">专为开发者体验而生</h2>
      </div>
      <div class="features">
        <div v-for="f in features" :key="'feat_' + f.title" class="features__card">
          <div class="features__icon">{{ f.icon }}</div>
          <h3 class="features__title">{{ f.title }}</h3>
          <p class="features__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="section section--cta">
      <div class="cta">
        <div class="cta__grid"></div>
        <h2 class="cta__title">准备好了吗？</h2>
        <p class="cta__desc">两分钟内将 Minor UI 集成到你的项目中。</p>
        <router-link to="/install">
          <button class="cta__btn">快速开始 →</button>
        </router-link>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="footer">© 2026 Minor UI · MIT License · Built for developers</footer>
  </div>
</template>

<script lang="ts" setup>
import { drawCanvas } from '@/utils/starCanvas'

defineOptions({
  name: 'HomeIndex',
})

const { canvas } = drawCanvas({
  starColor: '167,139,250',
  dotColor: '196,181,253',
})

const statsList = [
  { value: '10', label: '组件' },
  { value: 'Vue 3', label: '组合式 API' },
  { value: 'TS', label: '类型安全' },
  { value: 'MIT', label: '开源协议' },
]

const components = [
  { name: 'Article', cat: '业务组件', icon: 'icon-bianjishuru', path: '/Article' },
  { name: 'ImageList', cat: '业务组件', icon: 'icon-wushuju', path: '/ImageList' },
  { name: 'Gallery', cat: '业务组件', icon: 'icon-shoucang1', path: '/Gallery' },
  { name: 'AddRows', cat: '业务组件', icon: 'icon-jia', path: '/AddRows' },
  { name: 'VirtualScroll', cat: '业务组件', icon: 'icon-xiangxia', path: '/VirtualScroll' },
  { name: 'HorizontalTimeline', cat: '业务组件', icon: 'icon-xiangyou1', path: '/HorizontalTimeline' },
]

const features = [
  { icon: '⚡', title: 'Vue 3 组合式 API', desc: '全部组件基于组合式 API 与 <script setup> 编写，与 Vue 3 生态天然契合。' },
  { icon: '📦', title: '按需引入', desc: '组件独立成包，支持 tree-shaking 按需加载，只打包你用到的部分。' },
  { icon: '🎨', title: '主题定制', desc: '样式基于 SCSS 变量组织，可在你的项目中轻松覆盖默认主题。' },
]
</script>

<style lang="scss" scoped>
/* ── Hero ── */
.hero {
  position: relative;
  overflow: hidden;
  padding: 100px 0 80px;
  text-align: center;
  background: linear-gradient(160deg, #1e1b4b 0%, #2d1b69 55%, #1e1b4b 100%);

  &__canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__grid {
    position: absolute;
    inset: 0;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(rgba(139, 92, 246, 1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 1) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  &__glow {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(124, 58, 237, 0.35) 0%, transparent 70%);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 40px;
    pointer-events: none;

    a,
    button {
      pointer-events: auto;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 100px;
    background: rgba(139, 92, 246, 0.18);
    border: 1px solid rgba(139, 92, 246, 0.35);
    color: #c4b5fd;
    font-family: var(--mi-font-mono);
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 32px;
  }

  &__badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #a78bfa;
    animation: mi-pulse 2s infinite;
  }

  &__title {
    font-family: var(--mi-font-display);
    font-size: 62px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 24px;
  }

  &__title-grad {
    background: linear-gradient(90deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  &__desc {
    font-size: 18px;
    color: rgba(196, 181, 253, 0.85);
    line-height: 1.65;
    max-width: 560px;
    margin: 0 auto 44px;
  }

  &__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__btn {
    padding: 14px 32px;
    border-radius: 10px;
    border: none;
    font-family: var(--mi-font-display);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.45);
    transition: transform 0.15s, box-shadow 0.15s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 40px rgba(124, 58, 237, 0.55);
    }
  }

  &__npm {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: 10px;
    font-family: var(--mi-font-mono);
    font-size: 14px;
    font-weight: 500;
    color: rgba(196, 181, 253, 0.9);
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    user-select: text;
  }

  &__npm-sign {
    color: rgba(167, 139, 250, 0.5);
  }
}

@keyframes mi-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.6);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(167, 139, 250, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0);
  }
}

/* ── Stats ── */
.stats {
  background: #fff;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    padding: 28px 0;
    text-align: center;
    border-right: 1px solid rgba(139, 92, 246, 0.08);

    &.is-last {
      border-right: none;
    }
  }

  &__value {
    font-family: var(--mi-font-display);
    font-size: 36px;
    font-weight: 800;
    color: #4c1d95;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 6px;
  }

  &__label {
    font-size: 14px;
    color: #9ca3af;
  }
}

/* ── Section 通用 ── */
.section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 40px 0;

  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  &__eyebrow {
    font-family: var(--mi-font-mono);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #7c3aed;
    margin-bottom: 8px;
  }

  &__title {
    font-family: var(--mi-font-display);
    font-size: 32px;
    font-weight: 800;
    color: #1e1b4b;
    letter-spacing: -0.03em;
    margin: 0;
  }

  &__more {
    font-size: 14px;
    font-weight: 500;
    color: #7c3aed;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }

  &__center {
    text-align: center;
    margin-bottom: 48px;
  }
}

/* ── Showcase ── */
.showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  &__card {
    padding: 20px;
    border-radius: 12px;
    text-align: left;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fff;
    border: 1px solid rgba(139, 92, 246, 0.1);
    box-shadow: 0 1px 6px rgba(78, 60, 180, 0.05);
    transition: all 0.15s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(124, 58, 237, 0.12);
      border-color: rgba(139, 92, 246, 0.3);
    }
  }

  &__icon {
    font-size: 24px;
    color: #7c3aed;
  }

  &__name {
    font-family: var(--mi-font-display);
    font-weight: 700;
    font-size: 15px;
    color: #1e1b4b;
  }

  &__cat {
    font-family: var(--mi-font-mono);
    font-size: 12px;
    color: #a78bfa;
  }
}

/* ── Features ── */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  &__card {
    padding: 28px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid rgba(139, 92, 246, 0.09);
    box-shadow: 0 2px 12px rgba(78, 60, 180, 0.05);
  }

  &__icon {
    font-size: 28px;
    margin-bottom: 14px;
  }

  &__title {
    font-family: var(--mi-font-display);
    font-weight: 700;
    font-size: 16px;
    color: #1e1b4b;
    margin: 0 0 8px;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.65;
    color: #6b7280;
    margin: 0;
  }
}

/* ── CTA ── */
.section--cta {
  padding: 64px 40px 80px;
}

.cta {
  position: relative;
  border-radius: 20px;
  padding: 60px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b, #2d1b69);

  &__grid {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    pointer-events: none;
    background-image: linear-gradient(rgba(139, 92, 246, 1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 1) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  &__title {
    position: relative;
    font-family: var(--mi-font-display);
    font-size: 36px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    margin: 0 0 16px;
  }

  &__desc {
    position: relative;
    font-size: 16px;
    color: rgba(196, 181, 253, 0.8);
    margin: 0 0 36px;
  }

  &__btn {
    position: relative;
    padding: 14px 36px;
    border-radius: 10px;
    border: none;
    font-family: var(--mi-font-display);
    font-size: 15px;
    font-weight: 700;
    color: #4c1d95;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s;

    &:hover {
      transform: translateY(-2px);
    }
  }
}

/* ── Footer ── */
.footer {
  text-align: center;
  padding: 24px 40px;
  font-size: 13px;
  color: #9ca3af;
  border-top: 1px solid rgba(139, 92, 246, 0.08);
}
</style>
