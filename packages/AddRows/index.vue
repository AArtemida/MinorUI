<template>
  <div class="mi-rows" ref="addRowsRef">
    <div
      class="mi-rows__item"
      v-for="(item, index) in targetList"
      :key="'add_row_' + index"
    >
      <div class="select-content flex_1_auto">
        <slot :item="item" :index="index">
          <p>{{ item.content }}</p>
        </slot>
      </div>
      <div class="mi-rows__icons">
        <mi-icon
          class="mi-rows__icon"
          icon="icon-jian"
          v-if="targetList.length > 1"
          @click="reduce(index)"
        ></mi-icon>

        <mi-icon
          class="mi-rows__icon"
          icon="icon-jia"
          v-if="index === 0"
          @click="add"
        ></mi-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import type { PropType } from 'vue'
import MiIcon from '~/Icon'

defineOptions({
  name: 'MiAddRows',
})
interface RowModel {
  content: string
  [propName: string]: unknown
}

const props = defineProps({
  targets: Array as PropType<RowModel[]>,
})

const addRowsRef = ref<HTMLDivElement | null>(null)
const rowData: RowModel = {
  content: '',
}
let targetList: RowModel[] = reactive([{ ...rowData }])

watch(
  () => props.targets,
  n => {
    targetList.length = 0
    if (n && n.length) {
      targetList.push(...n)
    } else {
      targetList.push({ ...rowData })
    }
  },
  { immediate: true, deep: true }
)

const reduce = function (index: number) {
  if (targetList.length > 1) {
    targetList.splice(index, 1)
  }
}

const add = function () {
  targetList.push({ ...rowData })
}
</script>
