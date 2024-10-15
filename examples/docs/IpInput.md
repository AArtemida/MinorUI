---
wrapperClass: ''
title: 'title'
desc: 'desc'
---

# IpInput IP 输入框
四段式 IP 地址输入框。输入满 3 位、按空格/回车/点号自动跳到下一段；退格删除空段时自动回到上一段；支持整段粘贴自动分配。

### 基础用法

```vue demo src="../components/demo/ipInput/Demo.vue"
```

### Attributes

| 参数        | 说明                          | 类型    | 可选值 | 默认值 |
| ----------- | ----------------------------- | ------- | ------ | ------ |
| v-model     | 绑定值（点号分隔的字符串）    | string  | —      | ''     |
| disabled    | 是否禁用                      | boolean | —      | false  |
| readonly    | 是否只读                      | boolean | —      | false  |
| is-allow    | 是否允许输入 * 号             | boolean | —      | false  |

### Events

| 事件名称 | 说明                           | 回调参数        |
| -------- | ------------------------------ | --------------- |
| input    | 输入时触发                     | (value: string) |
| blur     | 任一段失焦时触发               | (value: string) |

### Methods

| 方法名 | 说明                 | 参数 |
| ------ | -------------------- | ---- |
| focus  | 聚焦第一段输入框     | —    |
| blur   | 所有段输入框失焦     | —    |
