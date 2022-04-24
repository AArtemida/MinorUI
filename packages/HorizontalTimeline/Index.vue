<!--
 * @Description:
 * @Author: hy
 * @Date: 2022-04-18 17:01:32
 * @LastEditors: hy
 * @LastEditTime: 2022-04-22 17:05:28
-->
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick, computed } from 'vue'

export default defineComponent({
  name: 'HorizontalTimeline',
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { slots }) {
    // 定义响应数据
    let widthInfo : any = reactive({
      allWidth: 0,
      lineWidth: 0,
      sliderLeft: 0,
      boxLeft: 0,
    })
    let isClickList = false,
      isClickSlider = false,
      scrollTicking = false

    let timeLineBox = ref<HTMLDivElement | null>(null)

    let timeItems = ref([])
    const setTimeItemRef = (el: HTMLElement) => {
      // 断言为HTMLElement类型的数组
      (timeItems.value as Array<HTMLElement>).push(el);
    }
    onMounted(() => {
      nextTick(() => {
        // const wrapRef = timeLineBox.value,
        // timeItemRef = timeItem.value
        getAllWidth()
        scroll()
      })
    })
    // 计算属性
    const timeList = computed(() => {
      let res : Array<any> = []
      const times = Object.keys(props.list).sort((a : any, b : any) : any => {
        return b - a
      })
      times.forEach(time => {
        const arr = props.list[time]
        res.push({
          len: arr.length,
          time
        })
      })
      return res
    })

    const commonRate = computed(() : number => {
      let rate : number = 0
      if (widthInfo.allWidth && widthInfo.lineWidth) {
        const line = widthInfo.lineWidth - 5
        const distance = widthInfo.allWidth - line
        rate = distance / line
      }
      return rate
    })

    const boxRate = computed(() : string => {
      let rate : string = '0'
      if (widthInfo.boxLeft && widthInfo.allWidth) {
        rate = (widthInfo.boxLeft / widthInfo.allWidth) * 100 + '%'
      }
      return rate
    })


    // 定义方法
    // 获取总的列表宽度
    const getAllWidth = () => {
      const doms = timeItems?.value
      let w = 0
      if (doms) {
        // doms.forEach((dom : HTMLDivElement) => {
        //   w += dom.offsetWidth
        // })
        widthInfo.allWidth = w
      }
      // if (timeLineBox) {
      //   widthInfo.lineWidth = timeLineBox.value.offsetWidth
      // }
      widthInfo.sliderLeft = 0
      widthInfo.boxLeft = 0
    }
    // 获取各个时间轴线条宽度
    const getLineFlex = (len : number) : string => {
      return len + ' auto'
    }

    const getBoxLeft = (newL : number) => {
      const max = widthInfo.allWidth - widthInfo.lineWidth
      if (max < 0) return
      if (Math.abs(newL) >= max) {
        widthInfo.boxLeft = max
      } else if (newL > 0) {
        widthInfo.boxLeft = 0
      } else {
        widthInfo.boxLeft = newL
      }
      widthInfo.sliderLeft = Math.abs(widthInfo.boxLeft) / commonRate.value
    }
    const mousedown  = (e : any) => {
      const disX = e.clientX
      const curX = widthInfo.boxLeft
      isClickList = true
      document.onmousemove = e => {
        if (isClickList) {
          const newDisX : number = e.clientX - disX
          const newL : number = curX + newDisX
          getBoxLeft(newL)
        }
      }
      document.onmouseup = () => {
        isClickList = false
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    const getSliderLeft = (newL : number) => {
      const max = widthInfo.lineWidth - 10
      if (newL >= max) {
        widthInfo.sliderLeft = max
      } else if (newL <= 0) {
        widthInfo.sliderLeft = 0
      } else {
        widthInfo.sliderLeft = newL
      }
      if (commonRate.value < 0) return
      widthInfo.boxLeft = parseFloat('-' + widthInfo.sliderLeft * commonRate.value)
    }
    // 点击
    const changeSliderPosition = (e : any) => {
      getSliderLeft(e.layerX)
    }

    // 滚动
    const scroll = () => {
      const box = document.querySelector('.time_line_content')
      if (box) {
        box.addEventListener('DOMMouseScroll', scrollHandler, false)
        box.addEventListener('mousewheel', scrollHandler, false)
      }
    }

    const scrollHandler = (e : any) => {
      e.preventDefault()
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const wheel = e.wheelDelta || e.detail
          const curX = widthInfo.boxLeft
          const newL = curX + wheel
          getBoxLeft(newL)
          scrollTicking = false
        })
        scrollTicking = true
      }
    }

    // 拖动滑块
    const silderMousedown  = (e : any) => {
      isClickSlider = true
      const disX = e.clientX
      const curX = widthInfo.sliderLeft
      document.onmousemove = e => {
        if (isClickSlider) {
          const newDisX = e.clientX - disX
          const newL = curX + newDisX
          getSliderLeft(newL)
        }
      }
      document.onmouseup = () => {
        isClickSlider = false
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    return {
      setTimeItemRef,
      timeLineBox,

      timeList,
      boxRate,
      getAllWidth,
      getLineFlex,
      mousedown,
      silderMousedown,
      changeSliderPosition,
      scroll,
      ...widthInfo
    }
  }
})
</script>

<template>
  <div class="mi-timeline" ref="timeLineBox">
    <div
      class="mi-time_line_content"
      :style="{
        width: allWidth + 'px',
        transform: 'translateX(' + boxRate + ')'
      }"
      @mousedown="mousedown($event)"
    >
      <ul
        v-for="(timeItem, timeIndex) in timeList"
        :key="'timeline_ul' + timeItem.time + timeIndex"
        class="mi-time_item_box"
        :ref="setTimeItemRef"
      >
        <li
          v-for="(item, index) in list[timeItem.time]"
          :key="'timeline_li' + index + timeItem.time"
        >
          <slot :item="item" :index="index"></slot>
        </li>
      </ul>
    </div>
    <div class="mi-the_line_box" v-if="timeList.length > 0">
      <ul>
        <li
          v-for="(timeItem, timeIndex) in timeList"
          :key="'timeline_' + timeItem.time + timeIndex"
          class="mi-line_item"
          :style="{ flex: getLineFlex(timeItem.len) }"
        >
          <slot name="time" :item="timeItem" :index="timeIndex">
            <div
              class="mi-line_fill"
              @click.stop="changeSliderPosition($event)"
            ></div>
          </slot>
          <span class="mi-line_text">{{ timeItem.time }}</span>
        </li>
      </ul>
      <div
        class="mi-slider"
        :style="{ transform: 'translateX(' + sliderLeft + 'px)' }"
        @mousedown="silderMousedown($event)"
      ></div>
    </div>
  </div>
</template>