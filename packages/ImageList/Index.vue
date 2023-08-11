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
      ref="imagesContentRef"
      @scroll="scrollHandler"
      @mousewheel="mousewheel"
    >
      <ul class="mi-images__list">
        <li
          class="mi-images__item"
          v-for="img in imgList"
          :key="'mi_image_list_' + img"
          :style="customStyle"
        >
          <div class="mi-images__src" @click="imgClick(img)">
            <slot name="image">
              <!-- <img :src="img.src || img" alt="img" /> -->
              <mi-image :src="img.src || img"></mi-image>
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
    <!-- scroll -->
    <!-- <div class="mi-images__scroll">
      <div class="mi-images__barM">
        <div class="mi-images__bar" @mousedown="mousedownBar($event)">
          <div class="l"></div>
          <div class="r"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick } from 'vue'
import type { Ref, CSSProperties, PropType } from 'vue'

defineOptions({
  name: 'MiImageList',
})

interface ImageItem {
  src: string
  label?: string
}
const props = defineProps({
  imgList: Array as PropType<(string | ImageItem)[]>,
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
let nextNumber: Ref<number> = ref(0)
const imagesBoxRef = ref<HTMLDivElement | null>(null)
const imagesContentRef = ref<HTMLDivElement | null>(null)
let curTotal: Ref<number> = ref(0)

const imgWidth = computed(() => props.width + (props.padding || 0))

// 计算一屏最大显示个数
onMounted(() => {
  nextTick(() => {
    const wrapRef = imagesBoxRef.value
    let allWidth = wrapRef?.offsetWidth || 0
    curTotal.value = Math.floor(allWidth / imgWidth.value)
  })
})

// 计算属性
// const marginLeft = computed(() => {
//   let w = imgWidth.value
//   return -(nextNumber.value * w)
// })

const customStyle = computed<CSSProperties>(() => ({
  width: `${props.width}px`,
}))

const imgList = computed(() => props.imgList || [])

// 下一个
const next = () => {
  let len = props.imgList?.length || 0
  let maxNumber = len - curTotal.value
  let num = nextNumber.value as number
  if (num < maxNumber) {
    // num++
    // nextNumber.value = num
    changeScroll(true)
  }
}
const prev = () => {
  if (nextNumber.value > 0) {
    // nextNumber.value--
    changeScroll(false)
  }
}

function changeScroll(isNext: boolean) {
  const contentRef: HTMLDivElement = imagesContentRef.value as HTMLDivElement
  let left: number = contentRef?.scrollLeft ?? 0
  const step: number = imgWidth.value
  if (isNext) {
    left += step
  } else {
    left -= step
  }
  contentRef!.scrollLeft = left
}

// 滚动
let scrollTicking: Ref<boolean> = ref(false)
const scrollHandler = (e: Event) => {
  const contentRef = imagesContentRef.value
  const step: number = imgWidth.value
  if (!scrollTicking.value) {
    requestAnimationFrame(() => {
      let left: number = contentRef?.scrollLeft ?? 0
      nextNumber.value = Math.round(left / step)
      scrollTicking.value = false
    })
    scrollTicking.value = true
  }
}

const mousewheel = (e: Event) => {
  e.preventDefault()
  const wheelEvent = e as WheelEvent;
  if (!scrollTicking.value) {
    requestAnimationFrame(() => {
      changeScroll(wheelEvent.deltaY > 0)
      scrollTicking.value = false
    })
    scrollTicking.value = true
  }
}

const emits = defineEmits({
  'img-click': (img: ImageItem | string) => true,
})
const imgClick = (img: ImageItem | string) => {
  emits('img-click', img)
}
</script>
