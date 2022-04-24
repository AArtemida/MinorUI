<!--
 * @Description:
 * @Author: moon
 * @Date: 2021-11-26 14:29:01
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 09:58:03
-->
<template>
  <canvas ref="canvas" class="canvas-bg" width="100%" height="100%"></canvas>
  <section class="mi-content">
    <h1>Minor UI</h1>
    <h2 class="mi-desc">这是一个vue3功能组件库</h2>
    <p>
      <router-link to="introduce">
        <button class="mi-btn">快速开始</button>
      </router-link>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { drawCanvas } from "@/utils/starCanvas";

export default defineComponent({
  setup() {
    const { canvas } = drawCanvas()
    return { canvas }
  },
})
</script>

<style lang="scss" scoped>
$primary: #2196f3;
$white: #fff;
.canvas-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.mi-btn {
  color: $primary;
  border-radius: 50px;
  background: transparent;
  padding: 12px 35px;
  font-size: 16px;
  transition: all ease 1s;
  background-image: linear-gradient(to left, #7b4397, $primary);
  border: 1px solid $primary;
  color: $white;
  &:hover {
    background-image: linear-gradient(to right, #7b4397, $primary);
  }
}
.mi-desc {
  margin: 30px 0;
}
.mi-content {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
