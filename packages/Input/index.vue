<template>
  <div
    v-if="type !== 'textarea'"
    :class="[containerClasses(), attrsClass]"
    :style="containerStyle"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="slots.prepend" class="mi-input__prepend">
      <slot name="prepend"></slot>
    </div>
    <div :class="wrapperClasses">
      <span v-if="prefixVisible()" class="mi-input__prefix">
        <slot name="prefix">
          <i v-if="prefixIcon" class="mi-input__icon mi-icon" :class="prefixIcon"></i>
        </slot>
      </span>
      <input
        ref="inputRef"
        class="mi-input__inner"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :name="name"
        :autocomplete="autocomplete"
        v-bind="innerAttrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="suffixVisible()" class="mi-input__suffix">
        <slot name="suffix">
          <i v-if="suffixIcon" class="mi-input__icon mi-icon" :class="suffixIcon"></i>
        </slot>
        <i
          v-if="showClear"
          class="mi-input__icon mi-input__clear"
          @click="handleClear"
          @mousedown.prevent
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm164.4 645.4c-10.3 10.3-27.4 10.3-37.7 0L512 582.7l-126.6 126.7c-10.4 10.4-27.4 10.4-37.7 0-10.4-10.4-10.4-27.3 0-37.7L474.3 545 347.6 418.3c-10.4-10.4-10.4-27.3 0-37.7 10.4-10.4 27.3-10.4 37.7 0L512 507.3l126.7-126.7c10.4-10.4 27.3-10.4 37.7 0 10.4 10.4 10.4 27.3 0 37.7L549.7 545l126.7 126.7c10.4 10.4 10.4 27.3 0 37.7z"
              fill="currentColor"
            />
          </svg>
        </i>
        <i
          v-if="showPasswordIcon"
          class="mi-input__icon mi-input__password"
          @click="handlePasswordVisible"
        >
          <svg
            viewBox="0 0 1024 1024"
            width="14"
            height="14"
            :style="{ fill: passwordVisible ? 'var(--color-primary)' : 'currentColor' }"
          >
            <path
              d="M942.2 486.2C847.4 321.7 699.1 232 512 232c-187.1 0-335.4 89.7-430.2 254.2a48 48 0 0 0 0 48.4C176.6 899.9 324.9 989.6 512 989.6c187.1 0 335.4-89.7 430.2-254.2a48 48 0 0 0 0-48.4zM512 896c-175.9 0-318.6-86.6-396.7-256 47.4-86.4 123.5-152.8 214.9-186.7A175.8 175.8 0 0 0 336 512c0 97.2 78.8 176 176 176s176-78.8 176-176c0-17.5-2.6-34.4-7.4-50.4 88.8 34.2 163.1 100.4 210.1 185.6C830.6 809.4 687.9 896 512 896z"
            />
          </svg>
        </i>
        <span v-if="isWordLimitVisible" class="mi-input__count">
          <span class="mi-input__count-inner">{{ textLength }} / {{ maxlength }}</span>
        </span>
      </span>
    </div>
    <div v-if="slots.append" class="mi-input__append">
      <slot name="append"></slot>
    </div>
  </div>
  <textarea
    v-else
    ref="textareaRef"
    :class="['mi-textarea', textareaClasses, attrsClass]"
    :style="attrsStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :minlength="minlength"
    :name="name"
    :rows="rows"
    v-bind="innerAttrs"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  ></textarea>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted, useSlots, useAttrs } from 'vue'
import type { PropType, CSSProperties } from 'vue'

defineOptions({
  name: 'MiInput',
  inheritAttrs: false,
})

type InputType = 'text' | 'password' | 'textarea' | string
type InputSize = 'large' | 'default' | 'small'

const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  minlength: {
    type: [String, Number],
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  suffixIcon: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  // textarea 行数
  rows: {
    type: [String, Number],
    default: 2,
  },
  // textarea 自适应高度: true 或 { minRows, maxRows }
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false,
  },
  // 自定义宽度
  width: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits({
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
})

const slots = useSlots()

// class/style 保留在根容器, 其余属性/事件透传给原生 input/textarea
const attrs = useAttrs()
const attrsClass = computed(() => attrs.class as string)
const attrsStyle = computed(() => attrs.style as CSSProperties)
const innerAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs
  return rest
})

const inputRef = ref<HTMLInputElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const focused = ref(false)
const hovering = ref(false)
const passwordVisible = ref(false)

const textLength = computed(() => String(props.modelValue ?? '').length)

// slots 依赖必须在渲染期读取(useSlots 不具备响应性, computed 会缓存旧值)
function prefixVisible() {
  return !!(slots.prefix || props.prefixIcon)
}

function suffixVisible() {
  return !!(
    slots.suffix ||
    props.suffixIcon ||
    showClear.value ||
    showPasswordIcon.value ||
    isWordLimitVisible.value
  )
}

function containerClasses() {
  return [
    'mi-input',
    `mi-input--${props.size}`,
    {
      'is-disabled': props.disabled,
      'mi-input--group': !!(slots.prepend || slots.append),
      'mi-input--prefix': prefixVisible(),
      'mi-input--suffix': suffixVisible(),
    },
  ]
}

const wrapperClasses = computed(() => [
  'mi-input__wrapper',
  { 'is-focus': focused.value },
])

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    textLength.value > 0 &&
    (focused.value || hovering.value)
)

const showPasswordIcon = computed(() => props.showPassword && !props.disabled)

const isWordLimitVisible = computed(
  () => props.showWordLimit && props.maxlength !== undefined && !props.disabled
)

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = { ...attrsStyle.value }
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return style
})

const textareaClasses = computed(() => [
  {
    'is-disabled': props.disabled,
    'is-focus': focused.value,
  },
])

// textarea 自适应高度
function calcTextareaHeight() {
  if (props.type !== 'textarea' || !props.autosize) return
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  const lineHeight = 20
  const padding = 10
  const minRows =
    typeof props.autosize === 'object'
      ? props.autosize.minRows ?? Number(props.rows)
      : Number(props.rows)
  const maxRows = typeof props.autosize === 'object' ? props.autosize.maxRows : undefined
  const min = minRows * lineHeight + padding
  const max = maxRows ? maxRows * lineHeight + padding : Infinity
  const height = Math.min(Math.max(el.scrollHeight, min), max)
  el.style.height = `${height}px`
  el.style.overflowY = maxRows && el.scrollHeight > max ? 'auto' : 'hidden'
}

watch(
  () => props.modelValue,
  () => nextTick(calcTextareaHeight)
)

onMounted(calcTextareaHeight)

function handleInput(event: Event) {
  const { value } = event.target as HTMLInputElement
  emit('update:modelValue', value)
  emit('input', value)
}

function handleChange(event: Event) {
  const { value } = event.target as HTMLInputElement
  emit('change', value)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
  focus()
}

function handlePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
  focus()
}

function focus() {
  ;(inputRef.value || textareaRef.value)?.focus()
}

function blur() {
  ;(inputRef.value || textareaRef.value)?.blur()
}

defineExpose({ focus, blur })
</script>
