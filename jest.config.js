/*
 * @Description:
 * @Author: moon
 * @Date: 2021-11-29 11:23:45
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 11:23:46
 */
module.exports = {
  testEnvironment: "jsdom", // 默认JSdom
  roots: ["<rootDir>/src/packages"], //
  transform: {
    "^.+\\.vue$": "vue-jest", // vue单文件
    "^.+\\js$": "babel-jest", // esm最新语法 import
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/*.spec.js"],
  // 别名
  moduleNameMapper: {
    "^azui(.*)$": "<rootDir>$1",
    "^main(.*)$": "<rootDir>/src$1",
  },
};