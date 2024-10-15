<template>
  <div class="mi-gallery" ref="imagesBoxRef">
    <div
      v-for="(img, index) in imgList"
      :key="'mi_gallery_list_' + index"
      :class="['mi-gallery__item', imgClass(index)]"
      @click="imgClick(img, index)"
    >
      <slot name="image">
        <mi-image :src="img.src"></mi-image>
      </slot>

      <div class="mi-gallery__txt" v-if="imgClass(index)">
        + {{ remainImgList.length }}
      </div>
    </div>
  </div>
  <template v-if="preview">
    <ImagePreview
      v-show="showPreview"
      :initial-index="imageIndex"
      :img-list="previewList"
      @close="closePreview"
    >
      <div v-if="$slots.viewer">
        <slot name="viewer"></slot>
      </div>
    </ImagePreview>
  </template>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import type { Ref, PropType } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import ImagePreview from '~/ImagePreview'
defineOptions({
  name: 'MiGallery',
})

interface ImageItem {
  src: string
  label?: string
}

const props = defineProps({
  imgList: Array as PropType<ImageItem[]>,
  // 每项的宽度
  width: {
    type: Number,
    default: 90,
  },
  padding: {
    type: Number,
    default: 7,
  },
  preview: {
    type: Boolean,
    default: true,
  },
})

const imagesBoxRef = ref<HTMLDivElement | null>(null)
let curTotal: Ref<number> = ref(1)
// 每项宽度
const imgWidth = computed(() => props.width + props.padding)

const endIndex = computed(() => Math.max(curTotal.value, 1))
// 展示的图片
const imgList = computed(() => (props.imgList || []).slice(0, endIndex.value))
// 隐藏的图片
const remainImgList = computed(() =>
  (props.imgList || []).slice(endIndex.value)
)

// 计算一屏显示多少
const resizeListener = function () {
  const wrapRef = imagesBoxRef.value
  const allWidth = wrapRef?.offsetWidth || 0
  curTotal.value = Math.floor(allWidth / unref<number>(imgWidth))
}

// 在 setup 作用域注册，组件卸载时自动销毁（在 onMounted 内注册不会随组件销毁，导致泄漏）
useResizeObserver(imagesBoxRef, resizeListener)

const imgClass = function (index: number) {
  const len = unref(imgList).length
  const remainLen = unref(remainImgList).length
  if (remainLen > 0 && index === len - 1) {
    return 'mi-gallery__more'
  }
  return ''
}

const showPreview = ref(false)
const imageIndex = ref(0)

// 点击
const emits = defineEmits({
  'img-click': (img: ImageItem) => true,
})
const imgClick = (img: ImageItem, index: number) => {
  imageIndex.value = index
  showPreview.value = true
  emits('img-click', img)
}

// 预览
const previewList = computed(() => {
  return props.imgList || []
})
const closePreview = () => {
  showPreview.value = false
}
</script>
