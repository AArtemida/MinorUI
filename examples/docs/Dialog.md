---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# Dialog 弹窗

参考 element-plus Dialog 实现的轻量弹窗,支持遮罩、ESC 关闭与滚动锁定。

```vue demo src="../components/demo/dialog/Demo.vue"
```

### Attributes

| 参数                | 说明                   | 类型            | 可选值 | 默认值 |
| ------------------- | ---------------------- | --------------- | ------ | ------ |
| model-value/v-model | 是否显示弹窗           | boolean         | —      | false  |
| title               | 标题                   | string          | —      | ''     |
| width               | 宽度                   | number / string | —      | 600    |
| append-to-body      | 挂载到 body            | boolean         | —      | true   |
| close-on-click-modal| 点击遮罩关闭           | boolean         | —      | true   |
| close-on-press-escape| 按 ESC 关闭           | boolean         | —      | true   |
| show-close          | 显示关闭按钮           | boolean         | —      | true   |
| lock-scroll         | 打开时锁定页面滚动     | boolean         | —      | true   |

### Events

| 事件名 | 说明             |
| ------ | ---------------- |
| open   | 打开时触发       |
| opened | 打开动画结束时触发 |
| close  | 关闭时触发       |
| closed | 关闭动画结束时触发 |

### Slots

| 插槽名 | 说明                 |
| ------ | -------------------- |
| —      | 弹窗内容             |
| header | 头部内容             |
| footer | 底部内容             |
