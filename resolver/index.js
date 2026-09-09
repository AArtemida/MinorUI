/**
 * v-minor-ui 按需引入 resolver（unplugin-vue-components）
 *
 * 使用：
 *   // vite.config.js
 *   import Components from 'unplugin-vue-components/vite'
 *   import { MinorUIResolver } from 'v-minor-ui/resolver'
 *   export default {
 *     plugins: [Components({ resolvers: [MinorUIResolver()] })],
 *   }
 *
 * 模板中直接使用 <mi-card>、<MiCard>，组件 JS 与对应样式均按需自动引入。
 */
const PKG = 'v-minor-ui'

// 组件名 -> lib/es 目录
const componentDirs = {
  MiCard: 'Card',
  MiIcon: 'Icon',
  MiImage: 'Image',
  MiInput: 'Input',
  MiIpInput: 'IpInput',
  MiDialog: 'Dialog',
  MiTooltip: 'Tooltip',
  MiSplitPane: 'SplitPane',
  MiSearchInput: 'SearchInput',
  MiImageList: 'ImageList',
  MiImagePreview: 'ImagePreview',
  MiGallery: 'Gallery',
  MiArticle: 'Article',
  MiAddRows: 'AddRows',
  MiVirtualScroll: 'VirtualScroll',
  MiHorTimeline: 'HorizontalTimeline',
  MiDragDialog: 'DragDialog',
}

// 组件自身样式文件（lib/themes/ 下，不含 .css 后缀）
const ownStyle = {
  Card: 'card',
  Icon: 'icon',
  Image: 'image',
  Input: 'input',
  IpInput: 'ipInput',
  Dialog: 'dialog',
  Tooltip: 'tooltip',
  SplitPane: 'splitPane',
  SearchInput: 'searchInput',
  ImageList: 'imageList',
  ImagePreview: 'imagePreview',
  Gallery: 'gallery',
  Article: 'article',
  AddRows: 'addRows',
  VirtualScroll: 'virtualScroll',
  HorizontalTimeline: 'horizontalTimeline',
  DragDialog: 'dragDialog',
}

// 组件间样式依赖（如 DragDialog 内部使用 Dialog/Tooltip/Icon）
const styleDeps = {
  Article: ['icon'],
  IpInput: ['input'],
  SearchInput: ['input', 'icon'],
  ImageList: ['image', 'icon'],
  ImagePreview: ['icon'],
  Gallery: ['image', 'imagePreview', 'icon'],
  AddRows: ['icon'],
  DragDialog: ['dialog', 'tooltip', 'icon'],
}

function stylePaths(dir) {
  const names = [ownStyle[dir], ...(styleDeps[dir] || [])]
  return names.map(name => `${PKG}/lib/themes/${name}.css`)
}

function MinorUIResolver() {
  return {
    type: 'component',
    resolve(name) {
      if (!/^Mi[A-Z]/.test(name)) return
      const dir = componentDirs[name]
      if (!dir) return
      return {
        // 组件均为 default export
        name: 'default',
        from: `${PKG}/lib/es/${dir}`,
        sideEffects: stylePaths(dir),
      }
    },
  }
}

module.exports = {
  MinorUIResolver,
}
