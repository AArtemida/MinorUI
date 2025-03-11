/*
 * @Description: 按需引入构建配置 —— 输出 lib/es/**（保留模块结构，每组件一个目录）
 * 配合 package.json exports 与 resolver，支持：
 *   import MiCard from 'v-minor-ui/lib/es/Card'
 *   import 'v-minor-ui/lib/themes/card.css'
 */
import esbuild from 'rollup-plugin-esbuild'
// plugin-vue将vue结尾的文件变为js
import vue from 'rollup-plugin-vue'
// js压缩丑化
import { terser } from 'rollup-plugin-terser'
//
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
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

// 单一根入口 + preserveModules：
// 所有组件模块（packages/<Comp>/index.ts）自动落到 lib/es/<Comp>/index.js，
// 目录导入（'v-minor-ui/lib/es/Card'）天然可用，无需多入口重命名。
export default {
  input: path.join(pkgRoot, 'index.ts'),
  // 外部库不打包
  external: ['vue'],
  output: {
    dir: 'lib/es',
    format: 'es',
    // 保留模块结构，packages 为模块根（产物不含 packages 前缀）
    preserveModules: true,
    preserveModulesRoot: 'packages',
  },
  // 插件有序加载
  plugins: [
    packageResolver(),
    nodeResolve(),
    vue({
      include: /\.vue$/,
    }),
    // 声明文件输出到 lib/es 与 js 同目录，便于按路径自动解析类型
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'lib/es',
          rootDir: 'packages',
        },
        include: ['packages/**/*'],
        exclude: ['node_modules', 'examples', 'vite.config.ts'],
      },
      check: false,
      clean: true,
      cacheRoot: 'node_modules/.cache/rollup-plugin-typescript2-es',
    }),
    esbuild({
      include: /\.[jt]s$/,
      target: 'es2015',
    }),
    terser({ module: true }),
  ],
}
