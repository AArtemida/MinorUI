<template>
  <div class="mi-image-preview">
    <div class="mi-image-preview__top">
      <mi-icon
        class="mi-image-preview__close"
        icon="icon-cuo"
        @click="hide"
      ></mi-icon>
    </div>
    <div class="mi-image-preview__content">
      <img class="mi-image-preview__img" :src="imgUrl" />

      <mi-icon
        class="mi-image-preview__icon mi-image-preview__left "
        icon="icon-xiangzuo1"
        :class="{'active': !leftDisabled}"
        @click="changeIndex(-1)"
      ></mi-icon>
      <mi-icon
        class="mi-image-preview__icon mi-image-preview__right"
        icon="icon-xiangyou1"
        :class="{'active': !rightDisabled}"
        @click="changeIndex(1)"
      ></mi-icon>
    </div>
    <div class="mi-image-preview__bottom">
      <span class="mi-image-preview__fullscreen"></span>
      <span class="mi-image-preview__description" v-if="imgLabel">
        {{ imgLabel }}
      </span>
      <span class="mi-image-preview__pagination" v-if="total">
        ({{ curIndex + 1 }} / {{ total }})
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, unref } from 'vue'
import type { Ref, PropType } from 'vue'

defineOptions({
  name: 'MiImagePreview',
})

interface ImageItem {
  src: string
  label?: string
}

const props = defineProps({
  imgList: Array as PropType<ImageItem[]>,
  initialIndex: {
    type: Number,
    default: 0,
  },
})

const curIndex: Ref<number> = ref(props.initialIndex)

// 监听index
watch(
  () => props.initialIndex,
  () => {
    curIndex.value = props.initialIndex
  }
)

const curImg = computed(() => {
  const list = props.imgList || []
  return list[curIndex.value]
})

const imgUrl = computed(() => {
  let img = curImg.value as ImageItem
  return img?.src
})

const imgLabel = computed(() => {
  let img = curImg.value as ImageItem
  return img?.label
})

const total = computed(() => {
  const list = props.imgList || []
  return list.length
})

// 禁用左右切换
const rightDisabled = computed(() => {
  return unref(curIndex) >= unref(total) - 1
})
const leftDisabled = computed(() => {
  return unref(curIndex) <= 0
})

// 切换
function changeIndex(increment: number) {
  if((increment > 0 && unref(rightDisabled)) || (increment < 0 && unref(leftDisabled))) {
    return
  }
  curIndex.value = unref(curIndex) + increment
}

// 关闭
const emits = defineEmits({
  close: () => true,
})

function hide() {
  emits('close')
}
</script>
