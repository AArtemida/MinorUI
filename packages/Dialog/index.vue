<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="mi-dialog-fade"
      @after-enter="emit('opened')"
      @after-leave="emit('closed')"
    >
      <div
        v-show="visible"
        class="mi-overlay"
        :style="{ zIndex: zIndex }"
        @click.self="handleOverlayClick"
      >
        <div
          class="mi-dialog"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div class="mi-dialog__header">
            <slot name="header">
              <span class="mi-dialog__title">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="mi-dialog__headerbtn"
              aria-label="关闭"
              @click="handleClose"
            >
              <svg viewBox="0 0 1024 1024" width="14" height="14">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="mi-dialog__body">
            <slot></slot>
          </div>
          <footer v-if="slots.footer" class="mi-dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
// 跨实例共享：z-index 递增种子与滚动锁计数
let seed = 1000
let lockCount = 0
</script>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeUnmount, useSlots } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'MiDialog',
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [Number, String],
    default: 600,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits({
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
})

const slots = useSlots()

const visible = ref(props.modelValue)
const zIndex = ref(0)

watch(
  () => props.modelValue,
  val => {
    visible.value = val
    if (val) {
      zIndex.value = ++seed
      lockScroll()
      emit('open')
    }
  },
  // immediate：初始 v-model=true 时也要分配 z-index、锁定滚动并触发 open
  { immediate: true }
)

watch(visible, val => {
  if (!val) unlockScroll()
})

function lockScroll() {
  if (!props.lockScroll) return
  lockCount++
  if (lockCount === 1) document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  if (lockCount > 0) lockCount--
  if (lockCount === 0) document.body.style.overflow = ''
}

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick() {
  if (!props.closeOnClickModal) return
  handleClose()
}

function handleKeydown(e: KeyboardEvent) {
  if (!visible.value || e.key !== 'Escape') return
  if (!props.closeOnPressEscape) return
  // 只关闭最上层的 dialog
  if (zIndex.value < seed) return
  handleClose()
}

document.addEventListener('keydown', handleKeydown)
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (visible.value) unlockScroll()
})

const dialogStyle = computed<CSSProperties>(() => {
  const width =
    typeof props.width === 'number' ? `${props.width}px` : props.width
  return { width }
})
</script>
