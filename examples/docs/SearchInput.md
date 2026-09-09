---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# SearchInput 搜索输入框
点击搜索图标展开输入框，回车或点击图标触发搜索；点击外部且无内容时自动收起。

### 基础用法

```vue demo src="../components/demo/searchInput/Demo.vue"
```

### Attributes

| 参数        | 说明                 | 类型            | 可选值 | 默认值 |
| ----------- | -------------------- | --------------- | ------ | ------ |
| v-model     | 绑定值               | string / number | —      | ''     |
| placeholder | 输入框占位文本       | string          | —      | —      |
| maxlength   | 最大输入长度         | string / number | —      | —      |

### Events

| 事件名称 | 说明               | 回调参数        |
| -------- | ------------------ | --------------- |
| search   | 回车/点击图标搜索时触发 | (value: string) |
| blur     | 失焦时触发         | (value: string) |
| input    | 输入时触发         | (value: string) |
