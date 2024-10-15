<template>
  <span
    ref="relRef"
    class="mi-tooltip__rel"
    @mouseenter="handleShow"
    @mouseleave="handleHide"
    @focusin="handleShow"
    @focusout="handleHide"
  >
    <slot></slot>
    <teleport to="body">
      <transition name="mi-fade-in-linear">
        <span
          v-show="visible"
          class="mi-tooltip__popper"
          :class="[`is-${effect}`, `mi-tooltip--${placement}`]"
          :style="popperStyle"
          role="tooltip"
        >
          <span class="mi-tooltip__content">
            <slot name="content">{{ content }}</slot>
          </span>
          <span class="mi-tooltip__arrow"></span>
        </span>
      </transition>
    </teleport>
  </span>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue'
import type { PropType, CSSProperties } from 'vue'

defineOptions({
  name: 'MiTooltip',
})

type Placement = 'top' | 'bottom' | 'left' | 'right'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
  },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 延迟显示(ms)
  openDelay: {
    type: Number,
    default: 0,
  },
})

const visible = ref(false)
const relRef = ref<HTMLElement | null>(null)
const popperStyle = ref<CSSProperties>({})
let showTimer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

// popper 挂在 body 下, 用 fixed 定位: 根据触发元素位置计算坐标
function updatePopper() {
  const rect = relRef.value?.getBoundingClientRect()
  if (!rect) return
  let left = 0
  let top = 0
  switch (props.placement) {
    case 'top':
      left = rect.left + rect.width / 2
      top = rect.top - 8
      break
    case 'bottom':
      left = rect.left + rect.width / 2
      top = rect.bottom + 8
      break
    case 'left':
      left = rect.left - 8
      top = rect.top + rect.height / 2
      break
    case 'right':
      left = rect.right + 8
      top = rect.top + rect.height / 2
      break
  }
  popperStyle.value = { left: `${left}px`, top: `${top}px` }
}

// 视口变化时跟随触发元素
function onViewportChange() {
  if (visible.value) updatePopper()
}

function handleShow() {
  clearTimer()
  if (props.disabled) return
  if (props.openDelay > 0) {
    showTimer = setTimeout(show, props.openDelay)
  } else {
    show()
  }
}

function show() {
  updatePopper()
  visible.value = true
  window.addEventListener('scroll', onViewportChange, true)
  window.addEventListener('resize', onViewportChange)
}

function handleHide() {
  clearTimer()
  visible.value = false
  window.removeEventListener('scroll', onViewportChange, true)
  window.removeEventListener('resize', onViewportChange)
}

onBeforeUnmount(() => {
  clearTimer()
  window.removeEventListener('scroll', onViewportChange, true)
  window.removeEventListener('resize', onViewportChange)
})
</script>
