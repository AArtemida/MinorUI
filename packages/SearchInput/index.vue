<template>
  <div
    ref="containerRef"
    class="mi-search-input"
    :class="{ 'is-active': showInput }"
  >
    <i
      v-show="!showInput"
      class="mi-search-input__icon mi-icon icon-sousuo"
      @click="toggleSearch"
    ></i>
    <mi-input
      ref="inputRef"
      v-model="searchValue"
      class="mi-search-input__input"
      clearable
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="handleInput"
      @keyup.enter="handleSearch"
      @clear="handleSearch"
      @blur="handleBlur"
    >
      <template v-if="showInput" #prefix>
        <i
          class="mi-search-input__icon mi-search-input__icon-inner mi-icon icon-sousuo"
          @click="handleSearch"
        ></i>
      </template>
    </mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import MiInput from '~/Input'

defineOptions({
  name: 'MiSearchInput',
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
})

const emit = defineEmits({
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  search: (value: string) => typeof value === 'string',
  blur: (value: string) => typeof value === 'string',
})

const containerRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<InstanceType<typeof MiInput> | null>(null)
const showInput = ref(false)
const searchValue = ref('')

watch(
  () => props.modelValue,
  val => {
    searchValue.value = val === undefined || val === null ? '' : String(val)
  },
  { immediate: true }
)

function toggleSearch() {
  showInput.value = !showInput.value
  if (showInput.value) {
    nextTick(() => {
      inputRef.value?.focus()
      document.body.addEventListener('click', handleClickOutside)
    })
  } else {
    close()
  }
}

function close() {
  inputRef.value?.blur()
  if (!searchValue.value) {
    showInput.value = false
    document.body.removeEventListener('click', handleClickOutside)
  }
}

function handleClickOutside(event: MouseEvent) {
  if (!containerRef.value?.contains(event.target as Node)) {
    close()
  }
}

function handleSearch() {
  emit('search', searchValue.value)
}

function handleBlur() {
  emit('blur', searchValue.value)
}

function handleInput(value: string) {
  emit('update:modelValue', value)
  emit('input', value)
}

onBeforeUnmount(() => {
  document.body.removeEventListener('click', handleClickOutside)
})
</script>
