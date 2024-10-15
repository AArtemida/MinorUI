---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Tooltip 文字提示

hover / focus 触发的轻量文字提示,支持四个方向与两种主题。

```vue demo src="../components/demo/tooltip/Demo.vue"
```

### Attributes

| 参数     | 说明                 | 类型    | 可选值                          | 默认值 |
| -------- | -------------------- | ------- | ------------------------------- | ------ |
| content  | 提示内容             | string  | —                               | ''     |
| placement| 出现位置             | string  | top / bottom / left / right     | top    |
| effect   | 主题                 | string  | dark / light                    | dark   |
| disabled | 是否禁用             | boolean | —                               | false  |
| open-delay | 显示延迟(ms)       | number  | —                               | 0      |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| —       | 触发元素       |
| content | 自定义提示内容 |
