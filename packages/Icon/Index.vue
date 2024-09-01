<template>
  <i class="mi-icon" :class="iconTag">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'MiIcon',
})

const props = defineProps({
  icon: String
})

const iconTag = computed(() => {
  return props.icon || ''
})
</script>
