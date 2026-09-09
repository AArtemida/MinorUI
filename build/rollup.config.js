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
//
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
// import babel from 'rollup-plugin-babel'
import path from 'path'
import fs from 'fs'

const pkgRoot = path.resolve(process.cwd(), 'packages')

function existsFile(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile() ? p : null
}

// 解析 packages 内部的 `~/xxx` 别名与目录导入（node-resolve 默认不处理 .ts/.vue）
function packageResolver() {
  return {
    name: 'minorui-package-resolver',
    resolveId(importee, importer) {
      let base = null
      if (importee.startsWith('~/')) {
        base = path.join(pkgRoot, importee.slice(2))
      } else if (
        importer &&
        importee.startsWith('.') &&
        path
          .resolve(path.dirname(importer))
          .startsWith(pkgRoot)
      ) {
        base = path.resolve(path.dirname(importer), importee)
      } else {
        return null
      }
      return (
        existsFile(base + '.ts') ||
        existsFile(base + '.js') ||
        existsFile(base + '.vue') ||
        existsFile(path.join(base, 'index.ts')) ||
        existsFile(path.join(base, 'index.js')) ||
        existsFile(path.join(base, 'index.vue'))
      )
    },
  }
}

const overrides = {
  compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
  exclude: [
    // 排除项
    'node_modules',
    'examples',
    'vite.config.ts',
  ],
}

export default {
  input: './packages/index.ts',
  // //外部库不打包， 使用'umd'文件时需要先引入这个外部库
  external: ['vue', 'markdown-it-container'],
  output: [
    {
      globals: {
        vue: 'Vue',
      },
      name: 'minorUi',
      file: 'lib/minorUi.js',
      format: 'es',
      plugins: [terser()],
    },
    /*{
      globals: {
        vue: 'Vue',
      },
      name: 'minorUi',
      file: 'lib/minorUi.js',
      format: 'cjs',
      plugins: [terser()],
    },*/
    {
      globals: {
        vue: 'Vue',
      },
      name: 'minorUi',
      file: 'lib/minorUi.umd.js',
      format: 'umd',
      plugins: [terser()],
    },
  ],
  // 插件有序加载
  plugins: [
    packageResolver(),
    nodeResolve(),
    scss({
      include: /\.scss$/,
      sass: dartSass,
    }),
    vue({
      include: /\.vue$/,
    }),
    // check:false：rpt2 对 rollup-plugin-vue 编译产物（含 Teleport 的 render 函数）
    // 存在类型误报，跳过类型检查（打包产物由 esbuild 转译，不依赖诊断）
    typescript({ tsconfigOverride: overrides, check: false, clean: true }),
    // babel({
    //   exclude: 'node_modules/**',
    // }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015',
    }),
  ],
}
