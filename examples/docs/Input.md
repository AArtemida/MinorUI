---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Input 输入框
通过鼠标或键盘输入字符。

### 基础用法

`v-model` 绑定输入值。

```vue demo
<template>
  <mi-input v-model="input" placeholder="请输入内容"></mi-input>
  <p style="margin-top: 12px; font-size: 13px; color: #909399;">输入值：{{ input }}</p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

### 可清空 / 密码框

使用 `clearable` 属性即可得到一个可清空的输入框，`show-password` 得到可以切换显示隐藏的密码框。

```vue demo
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <mi-input v-model="text" placeholder="请输入内容" clearable></mi-input>
    <mi-input v-model="pwd" type="password" placeholder="请输入密码" show-password></mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
const pwd = ref('')
</script>
```

### 禁用 / 只读 / 尺寸

```vue demo
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <mi-input v-model="v1" disabled placeholder="禁用状态"></mi-input>
    <mi-input v-model="v2" readonly placeholder="只读状态"></mi-input>
    <mi-input v-model="v3" size="large" placeholder="large"></mi-input>
    <mi-input v-model="v4" placeholder="default"></mi-input>
    <mi-input v-model="v5" size="small" placeholder="small"></mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('只读内容')
const v3 = ref('')
const v4 = ref('')
const v5 = ref('')
</script>
```

### 前缀 / 后置内容与图标

`prefix-icon` / `suffix-icon` 使用图标字体类名，`prepend` / `append` 插槽可放置内容。

```vue demo
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <mi-input v-model="v1" prefix-icon="icon-sousuo" placeholder="搜索"></mi-input>
    <mi-input v-model="v2" suffix-icon="icon-bianji" placeholder="编辑"></mi-input>
    <mi-input v-model="v3" placeholder="网址">
      <template #prepend>https://</template>
      <template #append>.com</template>
    </mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
</script>
```

### 字数限制

`maxlength` 限制长度，`show-word-limit` 显示字数统计。

```vue demo
<template>
  <div style="max-width: 360px;">
    <mi-input v-model="text" maxlength="10" show-word-limit placeholder="最多 10 个字"></mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
</script>
```

### 文本域

`type="textarea"` 用于多行输入，`autosize` 可自适应高度。

```vue demo
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
    <mi-input v-model="t1" type="textarea" :rows="3" placeholder="固定 3 行"></mi-input>
    <mi-input v-model="t2" type="textarea" autosize placeholder="自适应高度"></mi-input>
    <mi-input
      v-model="t3"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="2~4 行"
    ></mi-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const t1 = ref('')
const t2 = ref('')
const t3 = ref('')
</script>
```

### Attributes

| 参数           | 说明                          | 类型            | 可选值                       | 默认值 |
| -------------- | ----------------------------- | --------------- | ---------------------------- | ------ |
| v-model        | 绑定值                        | string / number | —                            | ''     |
| type           | 类型                          | string          | text / password / textarea 等 | text   |
| size           | 尺寸                          | string          | large / default / small      | default|
| placeholder    | 输入框占位文本                | string          | —                            | —      |
| maxlength      | 最大输入长度                  | string / number | —                            | —      |
| minlength      | 最小输入长度                  | string / number | —                            | —      |
| disabled       | 是否禁用                      | boolean         | —                            | false  |
| readonly       | 是否只读                      | boolean         | —                            | false  |
| clearable      | 是否可清空                    | boolean         | —                            | false  |
| show-password  | 是否显示切换密码图标           | boolean         | —                            | false  |
| show-word-limit| 是否显示输入字数统计           | boolean         | —                            | false  |
| prefix-icon    | 输入框前缀图标类名             | string          | —                            | —      |
| suffix-icon    | 输入框后缀图标类名             | string          | —                            | —      |
| name           | 原生 name 属性                | string          | —                            | —      |
| autocomplete   | 原生 autocomplete 属性        | string          | —                            | off    |
| rows           | textarea 行数                 | string / number | —                            | 2      |
| autosize       | textarea 自适应高度           | boolean / object| —                            | false  |
| width          | 自定义宽度                    | string / number | —                            | —      |

### Slots

| 插槽名  | 说明                       |
| ------- | -------------------------- |
| prefix  | 输入框头部内容             |
| suffix  | 输入框尾部内容             |
| prepend | 输入框前置内容（非 textarea）|
| append  | 输入框后置内容（非 textarea）|

### Events

| 事件名称 | 说明                     | 回调参数            |
| -------- | ------------------------ | ------------------- |
| input    | 输入时触发               | (value: string)     |
| change   | 值改变并失焦时触发       | (value: string)     |
| focus    | 聚焦时触发               | (event: FocusEvent) |
| blur     | 失焦时触发               | (event: FocusEvent) |
| clear    | 点击清空按钮时触发       | —                   |

### Methods

| 方法名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| focus  | 使输入框获取焦点   | —    |
| blur   | 使输入框失去焦点   | —    |
