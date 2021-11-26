/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-25 11:45:08
 * @LastEditors: moon
 * @LastEditTime: 2021-11-26 16:49:13
 */
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// md文件渲染
import { createPlugin, vueDocFiles } from 'vite-plugin-vuedoc'
import markdownItContainer from 'markdown-it-container'
// 自动生成router
import Pages from "vite-plugin-pages"
// 部分组件库自动按需引入组件
// import ViteComponents from 'vite-plugin-components'

const path = require('path')
const containers = ['success', 'warning', 'error'].map(type => {
  return [
    markdownItContainer,
    type
  ]
})
// https://vitejs.dev/config/
const config: UserConfig = {
  server: {
    port: 3001,
  },
  plugins: [
    createPlugin({
      markdownIt: {
        plugins: [...containers],
      },
      highlight: {
        theme: 'one-dark',
      },
    }),
    vue({
      include: [...vueDocFiles],
    }),
    Pages({
      pagesDir: [
        { dir: "examples/pages", baseRoute: "" },
        { dir: "examples/docs", baseRoute: "" },
      ],
      extensions: ['vue', 'md'],
    }),
    // ViteComponents()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './examples'),
      '@docs': path.resolve(__dirname, './examples/docs'),
      '@components': path.resolve(__dirname, './examples/components'),
      vue: "vue/dist/vue.esm-bundler.js"
    },
  },
}
export default config