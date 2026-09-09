---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# AddRows 动态行

支持添加、删除行。

### 基础用法

```vue demo
<template>
  <mi-add-rows>
    <template #default="{ item }">
      <input class="demo-input" v-model="item.content" />
    </template>
  </mi-add-rows>
</template>
```

### 外部传参

```vue demo
<template>
  <mi-add-rows :targets="[{ content: 'aa' }, { content: 'abc' }]">
    <template #default="{ item }">
      <input class="demo-input" v-model="item.content" />
    </template>
  </mi-add-rows>
</template>
```

### Attributes

| 参数    | 说明         | 类型   | 可选值 | 默认值 |
| ------- | ------------ | ----- | ------ | ------ |
| targets | 图片列表数据  | Array | —      | —      |

### Slots

| 插槽名 | 说明     |
| ------ | -------- |
| ——     | 每项内容 |
