<template>
  <div :class="containerClasses" @paste="handlePaste">
    <span v-for="(item, index) in list" :key="index" class="mi-ip-input__item">
      <mi-input
        :ref="el => setItemRef(el, index)"
        v-model="item.val"
        class="mi-ip-input__field"
        size="small"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="item.placeholder"
        :tabindex="index"
        :maxlength="3"
        @input="val => handleInput(val, item)"
        @keyup="ev => handleKeyup(ev, index)"
        @blur="handleBlur"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from 'vue'
import MiInput from '~/Input'

defineOptions({
  name: 'MiIpInput',
})

const DEFAULT_IP_INPUT_REG = /[^\d]/g
const EXPEND_IP_INPUT_REG = /[^\d|*]/g

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否允许输入 * 号
  isAllow: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  blur: (value: string) => typeof value === 'string',
})

interface IpSegment {
  val: string
  placeholder: string
}

function createInputList(): IpSegment[] {
  return Array.from({ length: 4 }, () => ({ val: '', placeholder: '0' }))
}

const list = reactive(createInputList())

const inputReg = computed(() => (props.isAllow ? EXPEND_IP_INPUT_REG : DEFAULT_IP_INPUT_REG))

const containerClasses = computed(() => [
  'mi-ip-input',
  { 'is-disabled': props.disabled },
])

const itemRefs: InstanceType<typeof MiInput>[] = []
function setItemRef(el: unknown, index: number) {
  if (el) itemRefs[index] = el as InstanceType<typeof MiInput>
}

function joinedValue() {
  return list
    .map(item => item.val.replace(inputReg.value, ''))
    .filter(item => item !== '')
    .join('.')
}

function dealVal() {
  // v-model 回流值与当前分段一致时跳过重排,
  // 避免空段被过滤后重新分配导致位置丢失(如 ['192','','1'] 回流成 ['192','1',''])
  if (props.modelValue === joinedValue()) return
  const val = props.modelValue?.split('.').filter(item => item !== '') || []
  list.forEach((item, index) => {
    item.val = val[index] || ''
  })
}

watch(() => props.modelValue, dealVal, { immediate: true })

function handleInput(val: string, item: IpSegment) {
  item.val = val.replace(inputReg.value, '')
}

function handleKeyup(ev: KeyboardEvent, index: number) {
  const key = ev.key
  // 满 3 个或者按空格/回车/英文点 跳到下一格
  if (
    index < list.length - 1 &&
    (list[index].val.length === 3 ||
      [' ', 'Enter', '.'].includes(key) ||
      list[index].val === '*')
  ) {
    itemRefs[index + 1]?.focus()
  }

  // 按退格键且当前为空, 回到上一格
  if (key === 'Backspace' && list[index].val.length === 0 && index >= 1) {
    itemRefs[index - 1]?.focus()
  }

  emitValue()
}

function handlePaste(ev: ClipboardEvent) {
  const clipTexts = ev.clipboardData?.getData('Text') || ''
  const data = clipTexts.split('.')
  const tabIndex = Number((ev.target as HTMLElement).tabIndex || 0)

  setTimeout(() => {
    const len = list.length
    for (let i = 0; i < len; i++) {
      if (data.length === len) {
        list[i].val = data[i].replace(inputReg.value, '') || ''
      } else {
        if (i < tabIndex) continue
        list[i].val = (data[i - tabIndex] || '').replace(inputReg.value, '')
      }
    }
    emitValue()
  }, 0)
}

function handleBlur() {
  emit('blur', joinedValue())
}

function emitValue() {
  const val = joinedValue()
  emit('update:modelValue', val)
  emit('input', val)
}

function focus() {
  itemRefs[0]?.focus()
}

function blur() {
  itemRefs.forEach(item => item.blur())
}

defineExpose({ focus, blur })
</script>
