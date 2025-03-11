import { watch, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

/**
 * 监听容器尺寸变化的轻量 composable（替代 @vueuse/core 的 useResizeObserver，
 * 避免组件库引入整个 vueuse 依赖）。
 * 仅在 setup 作用域调用；组件卸载时自动断开监听。
 * 与原生 ResizeObserver 一致：开始监听时会先触发一次回调。
 */
export function useResizeObserver(
  target: Ref<HTMLElement | null | undefined>,
  callback: () => void
) {
  let observer: ResizeObserver | null = null

  const stopWatch = watch(
    target,
    el => {
      observer?.disconnect()
      observer = null
      if (el && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(callback)
        observer.observe(el)
      }
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(() => {
    stopWatch()
    observer?.disconnect()
    observer = null
  })
}
