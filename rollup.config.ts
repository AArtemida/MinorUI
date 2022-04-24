/*
 * @Description: 组件库打包配置
 * @Author: moon
 * @Date: 2021-11-29 10:39:38
 * @LastEditors: hy
 * @LastEditTime: 2022-04-24 17:15:31
 */
// plugin-esbuild将ts变为js
import esbuild from 'rollup-plugin-esbuild'
// plugin-vue将vue结尾的文件变为js
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass'
// js压缩丑化
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'packages/index.ts',
  output: [{
    globals: {
      vue: 'Vue',
    },
    name: 'minorUI',
    file: 'lib/minorUi.js',
    format: 'es',
    plugins: [terser()],
  },
  {
    globals: {
      vue: 'Vue',
    },
    name: 'minorUI',
    file: 'lib/minorUi.umd.js',
    format: 'umd',
    plugins: [terser()],
  }],
  plugins: [
    scss({
      include: /\.scss$/,
      sass: dartSass,
    }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015',
    }),
    vue({
      include: /\.vue$/,
    }),
  ],
}
