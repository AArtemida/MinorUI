<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-02-09 16:41:50
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 10:25:32
-->
<template>
  <div
    class="mi-virtual-scroll"
    ref="scrollWrapRef"
    :style="scrollWarpStyle"
    @scroll="scrollHandler"
  >
    <div
      class="mi-virtual-scroll__warp"
      :style="scrollInnerStyle"
    >
      <div ref="scrollUlRef" :style="scrollUlStyle">
        <div
          class="mi-virtual-scroll__item"
          v-for="(item, index) in listData"
          :key="'scroll_item' + index"
        >
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  nextTick,
  reactive,
  onMounted,
  unref
} from 'vue'
import type { CSSProperties } from 'vue'
import debounce from '~/utils/debounce'

defineOptions({
  name: 'MiVirtualScroll',
})

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  height: [Number, String],
  // 翻页的条数
  rows: {
    type: Number,
    default: 20,
  },
  cacheCount: {
    type: Number,
    default: 10
  }
})

// 列表HTMLElementDom
const scrollUlRef = ref<any>(null)
let scrollWrapRef = ref<HTMLDivElement | null>(null)
// 状态
const state = reactive({
  // 列表起始index
  start: 0,
  end: 0,
  // 起始高度
  initHeight: 0,
  // 滚动高度
  scrollTop: 0,
  listHeight: 0,
})
// 显示的条数
const displayCount: number = props.rows
//  每项的高度
let itemHeight: number = 0

onMounted(() => {
  nextTick(() => {
    initScroll()
  })
})

// 可视区最大高度
const scrollWarpStyle = computed<CSSProperties>(() => {
  let maxH =
    props.height && props.height.toString().includes('%')
      ? props.height
      : props.height + 'px'
  return {
    height: maxH
  }
})

// 列表高度
const scrollInnerStyle = computed<CSSProperties>(() => ({
  height: `${state.listHeight}px`,
}))

const scrollUlStyle = computed<CSSProperties>(() => ({
  willChange: 'transform',
  transform: `translateY(${state.scrollTop}px)`,
}))

// 列表总数
const listTotal = computed<number>(() => {
  return props.list.length
})

// 显示的列表数据
const listData = computed(() => {
  const pList = props.list
  let endIdx = state.start + displayCount + props.cacheCount
  if (endIdx >= pList.length) endIdx = pList.length
  return pList.slice(state.start, endIdx).map((v: any, index: number) => {
    const idx: number = state.start + index + 1
    if (typeof v === 'string' || typeof v === 'number') {
      v = {
        val: v,
        idx,
      }
    } else {
      v.idx = idx
    }
    return v
  })
})

// 初始化
function initScroll() {
  if (unref<number>(listTotal) > 0) {
    nextTick(() => {
      const scrollRef = scrollUlRef.value
      const wrapRef = scrollWrapRef.value
      // 列表距离顶部距离
      state.initHeight =
        scrollUlRef.value.getBoundingClientRect().top + wrapRef?.scrollTop
      // 计算每行高度
      itemHeight =
        scrollRef.children && scrollRef.children.length
          ? scrollRef.children[0].offsetHeight
          : 0
      state.listHeight = itemHeight * unref<number>(listTotal)
    })
  }
}

// 滚动事件
function scrollHandlerCb() {
  const wrapRef = unref<HTMLDivElement | null>(scrollWrapRef)
  // 当前滚动高度
  const curScrollTop: number = wrapRef?.scrollTop || 0
  if (state.scrollTop === curScrollTop) return

  const cacheCount = props.cacheCount

  if (curScrollTop > state.initHeight) {
    const addCount = Math.floor((curScrollTop - state.initHeight) / itemHeight)

    if (addCount > cacheCount) {
      state.start = addCount - cacheCount
    }
    state.scrollTop = state.start * itemHeight
  } else {
    state.scrollTop = 0
    state.start = 0
  }
}
function scrollHandler() {
  debounce(scrollHandlerCb, 500)()
}
</script>

<style lang="scss" scoped>
.mi-virtual-scroll {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
