---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Card 卡片
一个简单的卡片组件，包含标题，内容以及操作区域。

### 基础用法

```vue demo
<template>
  <mi-card>
    这是卡片内容
  </mi-card>
</template>
```
### 带有Header的卡片

```vue demo
<template>
  <mi-card>
    <template v-slot:header>
      <p>这是一个标题</p>
    </template>
    <div>这是卡片内容</div>
  </mi-card>
</template>
```

### Slots

| 插槽名        | 说明           |
| ----------- | -------------- |
| ——          | 自定义内容  |
| header      | 标题      |