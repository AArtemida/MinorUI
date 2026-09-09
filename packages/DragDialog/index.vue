<template>
  <div class="mi-drag-dialog" :style="style">
    <slot name="trigger" :open="openDialog">
      <mi-tooltip :content="title" placement="top">
        <button
          type="button"
          class="mi-drag-dialog__trigger"
          :aria-label="title"
          @click="openDialog"
        >
          <mi-icon icon="icon-bianji"></mi-icon>
        </button>
      </mi-tooltip>
    </slot>

    <mi-dialog v-model="open" :width="width" append-to-body>
      <template #header>
        <div class="mi-drag-dialog__header">
          <span class="mi-drag-dialog__title">{{ title }}</span>
          <mi-tooltip placement="top">
            <template #content>
              首项为默认项，拖拽列表<br />
              中字段调整顺序以及显隐
            </template>
            <span class="mi-drag-dialog__question">?</span>
          </mi-tooltip>
        </div>
      </template>

      <div class="mi-drag-dialog__wrapper" :id="bodyId">
        <!-- 显示列 -->
        <div class="mi-drag-dialog__panel">
          <div class="mi-drag-dialog__panel-header">
            <span>{{ leftTitle }}</span>
            <span class="mi-drag-dialog__count">{{ leftList.length }}</span>
          </div>
          <div
            class="mi-drag-dialog__panel-body"
            :class="{ 'is-drop-end': isDropEnd('left') }"
            :style="{ height: panelHeight }"
            @dragover.prevent="handlePanelDragOver('left')"
            @drop.prevent="handleDrop('left')"
          >
            <div
              v-for="(item, index) in leftList"
              :key="item.key"
              class="mi-drag-dialog__item"
              :class="itemClass('left', index)"
              :data-key="item.key"
              :draggable="!isFixed(index, 'left')"
              @dragstart="handleDragStart('left', index, $event)"
              @dragend="handleDragEnd"
              @dragover.stop.prevent="handleItemDragOver('left', index, $event)"
            >
              <svg
                class="mi-drag-dialog__handle"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M9 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                />
              </svg>
              <span class="mi-drag-dialog__label">{{ item.key }} - {{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="mi-drag-dialog__middle">
          <mi-icon icon="icon-xiangzuo1"></mi-icon>
          <span>拖拽</span>
          <mi-icon icon="icon-xiangyou1"></mi-icon>
        </div>

        <!-- 隐藏列 -->
        <div class="mi-drag-dialog__panel">
          <div class="mi-drag-dialog__panel-header">
            <span>{{ rightTitle }}</span>
            <span class="mi-drag-dialog__count">{{ rightList.length }}</span>
          </div>
          <div
            class="mi-drag-dialog__panel-body"
            :class="{ 'is-drop-end': isDropEnd('right') }"
            :style="{ height: panelHeight }"
            @dragover.prevent="handlePanelDragOver('right')"
            @drop.prevent="handleDrop('right')"
          >
            <div
              v-for="(item, index) in rightList"
              :key="item.key"
              class="mi-drag-dialog__item"
              :class="itemClass('right', index)"
              :data-key="item.key"
              draggable="true"
              @dragstart="handleDragStart('right', index, $event)"
              @dragend="handleDragEnd"
              @dragover.stop.prevent="handleItemDragOver('right', index, $event)"
            >
              <svg
                class="mi-drag-dialog__handle"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M9 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                />
              </svg>
              <span class="mi-drag-dialog__label">{{ item.key }} - {{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button type="button" class="mi-drag-dialog__btn" @click="submit">
          确认
        </button>
        <button
          type="button"
          class="mi-drag-dialog__btn is-plain"
          @click="close"
        >
          取消
        </button>
      </template>
    </mi-dialog>
  </div>
</template>

<script lang="ts">
export interface DragColumnItem {
  key: string | number
  label: string
  visible?: number | boolean
  [propName: string]: unknown
}

// FLIP 动画查询作用域用的实例 id 种子
let uid = 0
</script>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import MiDialog from '~/Dialog'
import MiTooltip from '~/Tooltip'
import MiIcon from '~/Icon'

defineOptions({
  name: 'MiDragDialog',
})

type PanelSide = 'left' | 'right'
interface DragSource {
  panel: PanelSide
  index: number
}
interface DropTarget {
  panel: PanelSide
  index: number
}

const props = defineProps({
  // 列配置:{ key, label, visible(0 显示 | 1 隐藏) }
  columns: {
    type: Array as PropType<DragColumnItem[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: '编辑数据列',
  },
  leftTitle: {
    type: String,
    default: '显示',
  },
  rightTitle: {
    type: String,
    default: '隐藏',
  },
  width: {
    type: [Number, String],
    default: 624,
  },
  // 列表面板高度
  height: {
    type: [Number, String],
    default: 400,
  },
  // 触发按钮与后续元素的间距
  gutter: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits({
  submit: (columns: DragColumnItem[]) => Array.isArray(columns),
})

const bodyId = `mi-drag-dialog-${++uid}`
const open = ref(false)
const leftList = ref<DragColumnItem[]>([])
const rightList = ref<DragColumnItem[]>([])
const dragSrc = ref<DragSource | null>(null)
const dropTarget = ref<DropTarget | null>(null)

const style = computed<CSSProperties>(() => {
  const ret: CSSProperties = { display: 'inline-block' }
  if (props.gutter) ret.marginRight = `${props.gutter / 2}px`
  return ret
})

const panelHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

function list(panel: PanelSide) {
  return panel === 'left' ? leftList.value : rightList.value
}

// 首项(key 为 0)为默认项,显示列中固定不可拖
function fixedCount() {
  const left = list('left')
  return left.length && Number(left[0].key) === 0 ? 1 : 0
}

function isFixed(index: number, panel: PanelSide) {
  return panel === 'left' && index === 0 && fixedCount() === 1
}

function itemClass(panel: PanelSide, index: number) {
  return {
    'is-fixed': isFixed(index, panel),
    'is-dragging':
      !!dragSrc.value &&
      dragSrc.value.panel === panel &&
      dragSrc.value.index === index,
    'is-drop-before':
      !!dropTarget.value &&
      dropTarget.value.panel === panel &&
      dropTarget.value.index === index,
  }
}

function isDropEnd(panel: PanelSide) {
  return (
    !!dropTarget.value &&
    dropTarget.value.panel === panel &&
    dropTarget.value.index === list(panel).length
  )
}

function openDialog() {
  init()
  open.value = true
}

function init() {
  const cols = props.columns || []
  leftList.value = cols
    .filter(item => Number(item.visible) === 0)
    .map(item => ({ ...item }))
  rightList.value = cols
    .filter(item => Number(item.visible) !== 0)
    .map(item => ({ ...item }))
}

function close() {
  open.value = false
}

function submit() {
  leftList.value.forEach(item => (item.visible = 0))
  rightList.value.forEach(item => (item.visible = 1))
  emit('submit', [...leftList.value, ...rightList.value])
  close()
}

/* ---------- 拖拽 ---------- */

function handleDragStart(panel: PanelSide, index: number, e: DragEvent) {
  if (isFixed(index, panel)) {
    e.preventDefault()
    return
  }
  dragSrc.value = { panel, index }
  dropTarget.value = null
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(list(panel)[index].key))
  }
}

function setDropTarget(panel: PanelSide, index: number) {
  const min = panel === 'left' ? fixedCount() : 0
  const max = list(panel).length
  dropTarget.value = {
    panel,
    index: Math.max(min, Math.min(index, max)),
  }
}

function handleItemDragOver(
  panel: PanelSide,
  index: number,
  e: DragEvent
) {
  if (!dragSrc.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const before = e.clientY - rect.top < rect.height / 2
  setDropTarget(panel, before ? index : index + 1)
}

function handlePanelDragOver(panel: PanelSide) {
  if (!dragSrc.value) return
  setDropTarget(panel, list(panel).length)
}

function handleDragEnd() {
  dragSrc.value = null
  dropTarget.value = null
}

async function handleDrop(panel: PanelSide) {
  const src = dragSrc.value
  if (!src) return
  const target =
    dropTarget.value && dropTarget.value.panel === panel
      ? dropTarget.value
      : { panel, index: panel === 'left' ? fixedCount() : 0 }

  const beforeRects = captureRects()
  const fromList = list(src.panel)
  const toList = list(panel)
  const [moved] = fromList.splice(src.index, 1)
  let insertIndex = target.index
  // 同面板内后移时,移除自身后插入位置需前移一位
  if (src.panel === panel && src.index < target.index) insertIndex -= 1
  toList.splice(insertIndex, 0, moved)
  handleDragEnd()
  await playFlip(beforeRects)
}

/* ---------- FLIP 位移动画 ---------- */

function getItems(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      `#${bodyId} .mi-drag-dialog__item[data-key]`
    )
  )
}

function captureRects(): Map<string, number> {
  const rects = new Map<string, number>()
  getItems().forEach(el => {
    if (el.dataset.key !== undefined) {
      rects.set(String(el.dataset.key), el.getBoundingClientRect().top)
    }
  })
  return rects
}

async function playFlip(before: Map<string, number>) {
  await nextTick()
  getItems().forEach(el => {
    const key = el.dataset.key
    if (key === undefined) return
    const prevTop = before.get(String(key))
    if (prevTop === undefined) return
    const delta = prevTop - el.getBoundingClientRect().top
    if (!delta) return
    el.style.transition = 'none'
    el.style.transform = `translateY(${delta}px)`
    // 强制回流后过渡回原位
    void el.offsetHeight
    el.style.transition = 'transform 0.2s ease'
    el.style.transform = ''
  })
}
</script>
