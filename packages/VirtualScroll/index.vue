<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-02-09 16:41:50
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 10:25:32
-->
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  nextTick,
  reactive,
  // watchEffect,
  onMounted,
  onUnmounted,
} from 'vue'
import debounce from '../utils/debounce'

export default defineComponent({
  name: 'MiVirtualScroll',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    height: [Number, String],
    // 一行的高度
    itemHeight: Number,
    // 翻页的条数
    rows: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { slots }) {
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
    const displayCount: number = props.rows || 1
    //  每项的高度
    let itemHeight: number = props.itemHeight || 0

    onMounted(() => {
      nextTick(() => {
        initScroll()
        const wrapRef = scrollWrapRef.value

        wrapRef?.addEventListener('scroll', scrollHandler)
      })
    })

    // 最大高度
    const maxHeight = computed(() => {
      let res =
        props.height && props.height.toString().includes('%')
          ? props.height
          : props.height + 'px'
      return res
    })

    // 列表数据
    const listData = computed(() => {
      const pList = props.list
      let endIdx = state.start + displayCount
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
      if (props.list.length > 0) {
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
          state.listHeight = itemHeight * props.list.length
        })
      }
    }

    // 滚动事件
    function scrollHandlerCb() {
      const wrapRef = scrollWrapRef.value
      // 当前滚动高度
      const curScrollTop = wrapRef?.scrollTop || 0
      if (curScrollTop > state.initHeight) {
        const addCount = Math.floor(
          (curScrollTop - state.initHeight) / itemHeight
        )
        state.scrollTop = addCount * itemHeight
        state.start = addCount
      } else {
        state.scrollTop = 0
        state.start = 0
      }
    }
    function scrollHandler() {
      debounce(scrollHandlerCb, 500)()
    }

    onUnmounted(() => {
      const wrapRef = scrollWrapRef.value
      wrapRef?.removeEventListener('scroll', scrollHandler)
    })
    return { scrollWrapRef, scrollUlRef, state, maxHeight, listData }
  },
})
</script>

<template>
  <div
    class="mi-virtual-scroll"
    ref="scrollWrapRef"
    :style="{ height: maxHeight }"
  >
    <div
      class="mi-virtual-scroll__warp"
      ref="scrollUlRef"
      :style="{
        height: state.listHeight + 'px',
        'padding-top': state.scrollTop + 'px',
      }"
    >
      <div
        class="mi-virtual-scroll__item"
        v-for="(item, index) in listData"
        :key="'scroll_item' + index"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mi-virtual-scroll {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>