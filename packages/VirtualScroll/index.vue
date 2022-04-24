<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-02-09 16:41:50
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 10:25:32
-->
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'MiVirtualScroll',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    height: [Number, String],
    itemHeight: Number,
    rows: {
      type: Number,
      default: 50,
    },
  },
  setup(props, { slots }) {
    let scrollWrapRef = ref<HTMLDivElement | null>(null)
    const state = reactive({
      start: 0,
      end: 0,
      scrollTop: 0,
    })

    onMounted(() => {
      nextTick(() => {
        const wrapRef = scrollWrapRef.value
        console.log(wrapRef)

        wrapRef?.addEventListener('onScroll', e => {
          console.log(e)
        })
      })
    })
    const maxHeight = (props.height && props.height.toString().includes('%') ? props.height : props.height + 'px')
    return { scrollWrapRef, state, maxHeight }
  },
})
</script>

<template>
  <div class="mi-virtual-scroll" ref="scrollWrapRef" :style="{height: maxHeight}">
    <div class="mi-virtual-scroll__warp">
      <div class="mi-virtual-scroll__item"
        v-for="(item, index) in list" :key="'scroll_item' + index">
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
