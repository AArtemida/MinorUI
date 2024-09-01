<template>
  <div class="mi-image" ref="rootRef">
    <slot v-if="isError" name="error">
      <div class="mi-image__error">加载失败</div>
    </slot>
    <template v-else>
      <img
        v-if="imageSrc !== undefined"
        :src="imageSrc"
        :alt="altText"
        @click="handleClick"
        @load="handleLoad"
        @error="handleError"
      />
      <div v-if="isLoading" class="mi-image__loading">
        <slot name="loading">
          <span>加载中...</span>
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

defineOptions({
  name: 'MiImage',
})

const props = defineProps({
  src: String,
  lazy: Boolean,
  alt: String
})
const emits = defineEmits({
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event,
  'img-click': () => true,
})

const rootRef = ref<HTMLDivElement | null>(null)
const imageSrc = ref<string | undefined>()
const isError = ref(false)
const isLoading = ref(false)
// 懒加载：进入可视区前不请求图片
let io: IntersectionObserver | null = null
let inView = false

const altText = computed(() => props.alt || 'image')

const stopObserve = () => {
  if (io) {
    io.disconnect()
    io = null
  }
}

const loadImage = () => {
  if (!props.src) {
    isLoading.value = false
    isError.value = false
    imageSrc.value = undefined
    return
  }
  if (props.lazy && !inView) return
  isLoading.value = true
  isError.value = false
  imageSrc.value = props.src
}

function handleLoad(event: Event) {
  isLoading.value = false
  isError.value = false
  emits('load', event)
}

function handleError(event: Event) {
  isLoading.value = false
  isError.value = true
  emits('error', event)
}

function handleClick() {
  emits('img-click')
}

watch(
  () => props.src,
  () => {
    loadImage()
  }
)

onMounted(() => {
  if (props.lazy) {
    io = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        inView = true
        stopObserve()
        loadImage()
      }
    })
    if (rootRef.value) io.observe(rootRef.value)
  }
  loadImage()
})

onBeforeUnmount(stopObserve)
</script>
