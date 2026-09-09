<!--
 * @Description:
 * @Author: moon
 * @Date: 2022-04-18 17:01:32
 * @LastEditors: moon
 * @LastEditTime: 2022-04-25 09:48:51
-->
<template>
  <div class="mi-timeline" ref="timeLineBox">
    <!-- 卡片列表 -->
    <div
      class="mi-time_line_content"
      :style="{
        width: allWidth + 'px',
        transform: 'translateX(' + boxRate + ')',
      }"
      @mousedown="mousedown($event)"
      @scroll="scrollHandler"
      @mousewheel="wheelHandler"
    >
      <ul
        v-for="(timeItem, timeIndex) in timeList"
        :key="'timeline_ul' + timeItem.time + timeIndex"
        class="mi-time_item_box"
        :ref="el => setTimeItemRef(el)"
      >
        <li
          v-for="(item, index) in data[timeItem.time]"
          :key="'timeline_li' + index + timeItem.time"
        >
          <slot :item="item" :index="index"></slot>
        </li>
      </ul>
    </div>
    <!-- 时间轴 线条 -->
    <div class="mi-the_line_box" v-if="timeList.length > 0">
      <ul class="mi-timeline__lines" @click.stop="changeSliderPosition">
        <!-- ref="timeLineUl" -->
        <li
          v-for="(timeItem, timeIndex) in timeList"
          :key="'timeline_' + timeItem.time + timeIndex"
          class="mi-line_item"
          :style="{ flex: getLineFlex(timeItem.len) }"
        >
          <slot name="time" :item="timeItem" :index="timeIndex">
            <div
              class="mi-line_fill"
            ></div>
          </slot>
          <span class="mi-line_text">{{ timeItem.time }}</span>
        </li>
      </ul>
      <!-- 滑块 -->
      <div
        class="mi-slider"
        :style="{ transform: 'translateX(' + sliderLeft + 'px)' }"
        @mousedown="silderMousedown($event)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, onBeforeUpdate, nextTick, computed, watch, unref } from 'vue'
import type { Ref } from 'vue'
import { useResizeObserver } from '../utils/resizeObserver'

type timeType = number | string
interface ListModel {
  [propName: timeType]: Array<unknown>
}

defineOptions({
  name: 'MiHorTimeline',
})

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

// 定义响应数据
let allWidth: Ref<number> = ref(0),
  lineWidth: Ref<number> = ref(0),
  sliderLeft: Ref<number> = ref(0),
  boxLeft: Ref<number> = ref(0)
let isClickList: boolean = false,
  isClickSlider: boolean = false,
  scrollTicking: boolean = false

// 拖拽状态（列表 / 滑块共用）
let dragState: {
  mode: 'list' | 'slider'
  startX: number
  startLeft: number
} | null = null

let timeLineBox = ref<HTMLDivElement | null>(null)
let timeLineUl: HTMLDivElement | null = null

let timeItems = ref<Array<HTMLDivElement>>([])
onBeforeUpdate(() => {
  timeItems.value = []
})
let setTimeItemRef = (el: any) => {
  if (el) {
    (timeItems.value as Array<HTMLElement>).push(el);
  }
};
onMounted(() => {
  nextTick(() => {
    const wrapRef = unref<HTMLDivElement | null>(timeLineBox)
    let dom = wrapRef?.querySelector(".mi-timeline__lines")
    timeLineUl = dom as HTMLDivElement
  })
})

watch(
  () => props.data,
  n => {
    nextTick(() => {
      getAllWidth()
    })
  },
  { immediate: true, deep: true }
)

interface TimeListModel {
  len: number;
  time: string;
}
// 计算属性
const timeList = computed(() => {
  let res: Array<TimeListModel> = []
  let list: ListModel = props.data
  const times = Object.keys(list).sort((a: any, b: any): number => {
    return b - a
  })
  times.forEach(time => {
    const arr = list[time]
    res.push({
      len: arr.length,
      time,
    })
  })
  return res
})

const commonRate = computed((): number => {
  let rate: number = 0
  if (allWidth.value && lineWidth.value) {
    const line = lineWidth.value - 5
    const distance = allWidth.value - line
    rate = distance / line
  }
  return rate
})

const boxRate = computed((): string => {
  let rate: string = '0'
  if (boxLeft.value && allWidth.value) {
    rate = (boxLeft.value / allWidth.value) * 100 + '%'
  }
  return rate
})

// 定义方法
// 获取总的列表宽度
const getAllWidth = () => {
  const doms = timeItems?.value
  let w = 0
  if (doms) {
    doms.forEach((dom: HTMLDivElement) => {
      w += dom.offsetWidth
    })
    allWidth.value = w
  }
  // else {
  //   const list = Object.values(props.data).flat()
  //   list.forEach(() => {
  //     w += 312
  //   })
  //   allWidth.value = w
  // }
  const wrapRef = timeLineBox.value
  if (wrapRef) {
    lineWidth.value = wrapRef?.offsetWidth || 0
  }
  sliderLeft.value = 0
  boxLeft.value = 0
}
// 在 setup 作用域注册，组件卸载时自动销毁（在 onMounted 内注册不会随组件销毁，导致泄漏）
useResizeObserver(timeLineBox, getAllWidth)
// 获取各个时间轴线条宽度
const getLineFlex = (len: number): string => {
  return len + ' auto'
}

// 列表左移距离
const getBoxLeft = (newL: number) => {
  const max = allWidth.value - lineWidth.value
  if (max < 0) return
  if (Math.abs(newL) >= max) {
    boxLeft.value = -max
  } else if (newL > 0) {
    boxLeft.value = 0
  } else {
    boxLeft.value = newL
  }
  sliderLeft.value = Math.abs(boxLeft.value) / commonRate.value
}
// 使用 addEventListener，避免直接赋值 document.onmousemove 被其他实例/组件覆盖
const onDragMove = (e: MouseEvent) => {
  if (!dragState) return
  const newL: number = dragState.startLeft + (e.clientX - dragState.startX)
  if (dragState.mode === 'list') {
    getBoxLeft(newL)
  } else {
    getSliderLeft(newL)
  }
}
const onDragEnd = () => {
  dragState = null
  isClickList = false
  isClickSlider = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

const mousedown = (e: MouseEvent) => {
  isClickList = true
  dragState = { mode: 'list', startX: e.clientX, startLeft: boxLeft.value }
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}
// 滑块的位置
const getSliderLeft = (newL: number) => {
  const max = lineWidth.value - 10
  if (newL >= max) {
    sliderLeft.value = max
  } else if (newL <= 0) {
    sliderLeft.value = 0
  } else {
    sliderLeft.value = newL
  }
  if (commonRate.value < 0) return
  boxLeft.value = parseFloat('-' + sliderLeft.value * commonRate.value)
}
// 点击
const changeSliderPosition = (e: MouseEvent) => {
  const ul = timeLineUl
  const ulRect = ul?.getBoundingClientRect();
  const l : number =  ulRect?.left || 0
  const relativeX = e.clientX - l;
  getSliderLeft(relativeX)
}

// 滚动
const scrollHandler = (e: Event) => {
  wheelHandler(e)
}
const wheelHandler = (e: Event) => {
  //WheelEvent
  const wheelEvent = e as WheelEvent
  e.preventDefault()
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const wheel = -wheelEvent.deltaY
      const curX = boxLeft.value
      const newL = curX + wheel
      getBoxLeft(newL)
      scrollTicking = false
    })
    scrollTicking = true
  }
}

// 拖动滑块
const silderMousedown = (e: MouseEvent) => {
  isClickSlider = true
  dragState = { mode: 'slider', startX: e.clientX, startLeft: sliderLeft.value }
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

onBeforeUnmount(() => {
  // 若卸载时仍在拖拽中，先解绑 document 监听
  onDragEnd()
})
</script>
