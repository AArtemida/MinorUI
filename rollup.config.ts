/*
 * @Description: 组件库打包配置
 * @Author: moon
 * @Date: 2021-11-29 10:39:38
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 11:03:11
 */
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/lib/index.ts',
  output: {
    globals: {
      vue: 'Vue',
    },
    name: 'minorUI',
    file: 'dist/lib/minorUi.js',
    format: 'umd',
    plugins: [terser()],
  },
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
