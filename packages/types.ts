/*
 * @Description:
 * @Author: hy
 * @Date: 2021-11-29 15:09:48
 * @LastEditors: hy
 * @LastEditTime: 2021-11-29 15:09:48
 */
import type { App } from "vue";

export type SFCWithInstall<T> = T & { install(app: App): void }; // vue 安装
export type PublicProps<T, U = {}> = Readonly<T> & U; // vue 的公共 props