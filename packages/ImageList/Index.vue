<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-12-15 16:54:14
 * @LastEditors: moon
 * @LastEditTime: 2022-04-24 17:18:04
-->
<template>
  <div class="mi-images" ref="imagesBoxRef">
    <div class="mi-images__btn mi-images__prev" @click="prev">
      <mi-icon icon="icon-xiangzuo1"></mi-icon>
    </div>
    <div
      class="mi-images__content"
      @scroll="scrollHandler"
      @mousewheel="mousewheel"
    >
      <!-- ref="imagesContentRef" -->
      <ul class="mi-images__list">
        <li
          class="mi-images__item"
          v-for="(img, index) in imgList"
          :key="'mi_image_list_' + index"
          :style="customStyle"
        >
          <div class="mi-images__src" @click="imgClick(img)">
            <slot name="image">
              <mi-image :src="img.src"></mi-image>
            </slot>
          </div>
          <div class="mi-images__txt" v-if="props.showLabel">
            <slot name="label">
              <p>{{ img.label }}</p>
            </slot>
          </div>
        </li>
      </ul>
    </div>
    <div class="mi-images__btn mi-images__next" @click="next">
      <mi-icon icon="icon-xiangyou1"></mi-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, unref } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import MiIcon from '~/Icon'

defineOptions({
  name: 'MiImageList',
})

interface ImageItem {
  src: string
  label?: string
}
const props = defineProps({
  imgList: Array as PropType<ImageItem[]>,
  // 显示标题栏
  showLabel: Boolean,
  // 每项的宽度
  width: {
    type: Number,
    default: 120,
  },
  padding: {
    type: Number,
    default: 10,
  },
})
let nextNumber: number = 0
const imagesBoxRef = ref<HTMLDivElement | null>(null)
let imagesContentRef: HTMLDivElement | null  = null
let curTotal: number = 0

const imgWidth = computed<number>(() => props.width + (props.padding || 0))

const resizeListener = function () {
  const wrapRef = unref<HTMLDivElement | null>(imagesBoxRef)
  let allWidth = wrapRef?.offsetWidth || 0
  let w = unref<number>(imgWidth) || 1
  curTotal = Math.floor(allWidth / w)
}

// 在 setup 作用域注册，组件卸载时自动销毁（在 onMounted 内注册不会随组件销毁，导致泄漏）
useResizeObserver(imagesBoxRef, resizeListener)

// 计算一屏最大显示个数
onMounted(() => {
  const wrapRef = unref<HTMLDivElement | null>(imagesBoxRef)
  let dom = wrapRef?.querySelector(".mi-images__content")
  imagesContentRef = dom as HTMLDivElement
})

// 计算属性
// const marginLeft = computed(() => {
//   let w = imgWidth.value
//   return -(nextNumber * w)
// })

const customStyle = computed<CSSProperties>(() => ({
  width: `${props.width}px`,
}))

const imgList = computed(() => props.imgList || [])

// 下一个
const next = () => {
  let len = props.imgList?.length || 0
  let maxNumber = len - curTotal
  if (nextNumber < maxNumber) {
    changeScroll(true)
  }
}
const prev = () => {
  if (nextNumber > 0) {
    changeScroll(false)
  }
}

function changeScroll(isNext: boolean) {
  const contentRef = imagesContentRef as HTMLDivElement | null
  let left: number = contentRef?.scrollLeft ?? 0
  let step: number = unref<number>(imgWidth)
  if (isNext) {
    left += step
  } else {
    left -= step
  }
  contentRef!.scrollLeft = left
}

// 滚动
let scrollTicking: boolean = false
const scrollHandler = (e: Event) => {
  const contentRef = imagesContentRef as HTMLDivElement | null
  let step: number = unref<number>(imgWidth)
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      let left: number = contentRef?.scrollLeft ?? 0
      nextNumber = Math.round(left / step)
      scrollTicking = false
    })
    scrollTicking = true
  }
}

const mousewheel = (e: Event) => {
  e.preventDefault()
  const wheelEvent = e as WheelEvent
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const isNext: boolean = wheelEvent.deltaY > 0
      changeScroll(isNext)
      scrollTicking = false
    })
    scrollTicking = true
  }
}

const emits = defineEmits({
  'img-click': (img: ImageItem) => true,
})
const imgClick = (img: ImageItem) => {
  emits('img-click', img)
}
</script>
