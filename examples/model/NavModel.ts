interface MenuItemModel {
  path?: string,
  name?: string,
  meta: {
    title: string
  },
  items?: Array<MenuItemModel>
}

export interface NavModel {
  [prop: string] : Array<MenuItemModel>
}