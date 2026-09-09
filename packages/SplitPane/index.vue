<template>
  <div
    :class="containerClasses"
    @mousemove="dragMove"
    @mouseleave="dragEnd"
    @mouseup="dragEnd"
  >
    <div
      v-if="!leftHide"
      class="mi-split-pane__left"
      :style="{ width: `${left}px` }"
    >
      <slot name="left"></slot>
    </div>
    <div
      v-if="!leftHide"
      class="mi-split-pane__gutter"
      @mousedown="dragStart"
    ></div>
    <div class="mi-split-pane__right">
      <div class="mi-split-pane__right-inner" :style="{ minWidth: `${rightMinWidth}px` }">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

defineOptions({
  name: 'MiSplitPane',
})

// 与样式中 min-width / max-width 保持一致, 避免拖拽时状态与显示脱节
const MIN_LEFT_WIDTH = 180

const props = defineProps({
  leftWidth: {
    type: Number,
    default: 220,
  },
  rightMinWidth: {
    type: Number,
    default: 450,
  },
  leftHide: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  dragMove: () => true,
  dragEnd: () => true,
})

const dragging = ref(false)
const left = ref(0)
let startX = 0
let startSplit = 0

const containerClasses = computed(() => [
  'mi-split-pane',
  { 'is-dragging': dragging.value },
])

onMounted(() => {
  left.value = props.leftWidth
})

function dragStart(e: MouseEvent) {
  dragging.value = true
  startX = e.pageX
  startSplit = left.value || props.leftWidth
}

function dragMove(e: MouseEvent) {
  if (!dragging.value) return
  const maxLeft = Math.max(MIN_LEFT_WIDTH, window.innerWidth * 0.6)
  left.value = Math.min(Math.max(startSplit + e.pageX - startX, MIN_LEFT_WIDTH), maxLeft)
  emit('dragMove')
}

function dragEnd() {
  if (!dragging.value) return
  dragging.value = false
  emit('dragEnd')
}
</script>
