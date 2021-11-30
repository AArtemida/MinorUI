/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-30 09:53:39
 * @LastEditors: hy
 * @LastEditTime: 2021-11-30 10:14:42
 */
const del = require("del");
const { src, dest, series, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
// 打包配置
const config = {
  input: "./src/",
  output: "../../lib/themes"
};
// 复制字体
let copyfont = () => src([`${config.input}fonts/*`, `!${config.input}fonts/*.css`]).pipe(dest(`${config.output}/fonts`));
// 压缩font 里的 CSS
let minifontCss = () =>
  src(`${config.input}fonts/*.css`)
    .pipe(cssmin())
    .pipe(dest(`${config.output}/fonts`));
// 删除之前css打包文件
let clean = done => {
  del(
    ["*.css", "fonts"].map(name => `${config.output}/${name}`),
    { force: true }
  );
  done();
};

const compile = () =>
  src([`${config.input}*.scss`])
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    )
    .pipe(cssmin())
    .pipe(dest(config.output));
exports.build = series(clean, parallel(compile, copyfont, minifontCss));