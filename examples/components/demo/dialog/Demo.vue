<template>
  <div>
    <mi-dialog
      v-model="open"
      title="提示"
      :width="480"
      @open="log('open')"
      @closed="log('closed')"
    >
      <p>这是一个 mi-dialog 弹窗,点击遮罩或按 ESC 可关闭。</p>
      <template #footer>
        <button class="dialog-demo__btn" @click="open = false">知道了</button>
      </template>
    </mi-dialog>

    <button class="dialog-demo__btn" @click="open = true">打开弹窗</button>
    <p class="dialog-demo__log" v-if="lastEvent">最近事件:{{ lastEvent }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DialogDemo',
  setup() {
    const open = ref(false)
    const lastEvent = ref('')
    const log = (name: string) => (lastEvent.value = name)
    return { open, lastEvent, log }
  },
})
</script>

<style lang="scss" scoped>
.dialog-demo__btn {
  height: 32px;
  padding: 0 15px;
  background: #7c3aed;
  border: 1px solid #7c3aed;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.dialog-demo__log {
  margin-top: 12px;
  font-size: 13px;
  color: #909399;
}
</style>
