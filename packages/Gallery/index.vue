<template>
  <div class="mi-gallery" ref="imagesBoxRef">
    <div
      v-for="(img, index) in imgList"
      :key="'mi_gallery_list_' + img"
      :class="['mi-gallery__item', imgClass(index)]"
      @click="imgClick(img, index)"
    >
      <slot name="image">
        <mi-image :src="img.src || img"></mi-image>
      </slot>

      <div class="mi-gallery__txt" v-if="imgClass(index)">
        + {{ remainImgList.length }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, PropType } from 'vue'
import type { Ref } from 'vue'
defineOptions({
  name: 'MiGallery',
})

interface ImageItem {
  src: string
  label?: string
}

const props = defineProps({
  imgList: Array as PropType<(string | ImageItem)[]>,
  // 每项的宽度
  width: {
    type: Number,
    default: 90,
  },
  padding: {
    type: Number,
    default: 10,
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
onMounted(() => {
  nextTick(() => {
    const wrapRef = imagesBoxRef.value
    const allWidth = wrapRef?.offsetWidth || 0
    curTotal.value = Math.floor(allWidth / imgWidth.value)
  })
})

const imgClass = function (index: number) {
  const len = imgList.value.length
  const remainLen = remainImgList.value.length
  if (remainLen > 0 && index === len - 1) {
    return 'mi-gallery__more'
  }
  return ''
}

const emits = defineEmits({
  'img-click': (img: ImageItem | string) => true,
})
const imgClick = (img: ImageItem | string, index: number) => {
  emits('img-click', img)
}
</script>
