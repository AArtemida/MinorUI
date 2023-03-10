<!--
 * @Description:
 * @Author: hy
 * @Date: 2021-12-15 16:54:14
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:18:04
-->
<script lang="ts">
import { defineComponent, computed, ref, onMounted, nextTick } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
  name: 'MiImageList',
  props: {
    imgList: Array,
    // 显示标题栏
    showLabel: Boolean,
    // 每项的宽度
    width: {
      type: Number,
      default: 120,
    },
  },
  setup(props, { slots }) {
    let nextNumber: Ref<number> = ref(0)
    const imagesBoxRef = ref<HTMLDivElement | null>(null)
    let curTotal: Ref<number> = ref(0)

    // 计算一屏最大显示个数
    onMounted(() => {
      nextTick(() => {
        const wrapRef = imagesBoxRef.value
        let allWidth = wrapRef?.offsetWidth || 0
        curTotal.value = Math.floor(allWidth / props.width)
      })
    })

    // 计算属性
    const marginLeft = computed(() => {
      let w = props.width + 10
      return -(nextNumber.value * w)
    })

    // 下一个
    const next = () => {
      let len = props.imgList?.length || 0
      let maxNumber = len - curTotal.value
      if (nextNumber.value < maxNumber) nextNumber.value++
    }
    const prev = () => {
      if (nextNumber.value > 0) nextNumber.value--
    }
    return {
      imagesBoxRef,

      width: props.width,
      next,
      prev,

      marginLeft,
    }
  },
})
</script>

<template>
  <div class="mi-images" ref="imagesBoxRef">
    <div class="mi-images__btn mi-images__prev" @click="prev">&lt;</div>
    <div
      class="mi-images__content"
      :style="{ 'margin-left': marginLeft + 'px' }"
    >
      <div
        class="mi-images__item"
        v-for="img in imgList"
        :key="'mi_image_list_' + img"
        :style="{ width: width + 'px' }"
      >
        <div class="mi-images__src">
          <img :src="img.src || img" alt="img" />
        </div>
        <div class="mi-images__txt" v-if="showLabel">
          <slot name="label">
            <p>{{ img.label }}</p>
          </slot>
        </div>
      </div>
    </div>
    <div class="mi-images__btn mi-images__next" @click="next">&gt;</div>
  </div>
</template>
