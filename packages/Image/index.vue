<template>
  <div class="mi-image">
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
import { ref, onMounted, watch, computed } from 'vue'

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

const imageSrc = ref<string | undefined>()
const isError = ref(false)
const isLoading = ref(true)

const altText = computed(() => props.alt || 'image')

const loadImage = () => {
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
  loadImage()
})
</script>
