import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
const { SubMenu, Item } = Menu

export default React.memo(function SidebarItem(route) {

  // onlyOneChild: null | object
  const [ onlyOneChild, setOnlyOneChild ] = useState(route)

  // /**
  //  * @description 1. 判断是否有子菜单 2. 如无子菜单的情况下，不按照规范写的情况处理， 如不写 children 或 无 isSubmenu 属性
  //  * @param children
  //  * @param route
  //  * @returns {boolean}
  //  */
  // const isMenuItemOrSubmenu = (children=[], route) => {
  //   // isSubmenu 表示是一个isSubmenu菜单
  //   if(route.meta && route.meta.isSubmenu) {
  //     return true
  //   } else {
  //     /*
  //     无子菜单的情况下，
  //       1. 无isSubmenu时存在children，并且children中有n个对象，取最后一个为当前菜单，后者覆盖前者
  //       2. 只有route，无children的情况下，直接以当前route为该菜单信息
  //     */
  //     const showingChildren = children.filter(item => !item.hidden)
  //     // 当el-menu-item路由写法 不写children层，直接只写父层时，直接取父级信息
  //     if(!showingChildren.length) {
  //       // setOnlyOneChild(route)
  //     } else {
  //       // 取children的最后一个信息为菜单信息, 后者覆盖前面的
  //       // setOnlyOneChild(showingChildren.pop())
  //     }
  //     return false
  //   }
  // }

  // 判断是否有子菜单  true: 有， false: 无
  const isMenuItemOrSubmenu = route => route.meta && route.meta.isSubmenu
  // 字体图标、我直接在标签上写 三元和短路操作竟然报错
  const getIcon = route => route.meta && route.meta.icon ? <route.meta.icon /> : null

  useEffect(() => {
    // 没有子菜单时
    if(!isMenuItemOrSubmenu(route)) {
      /*
      无子菜单的情况下，
        1. 无isSubmenu时存在children，并且children中有n个对象，取最后一个为当前菜单，后者覆盖前者
        2. 只有route，无children的情况下，直接以当前route为该菜单信息
      */
      const showingChildren = route.children.filter(item => !item.hidden)
      // 当el-menu-item路由写法 不写children层，直接只写父层时，直接取父级信息
      if(!showingChildren.length) {
        setOnlyOneChild(route)
      } else {
        // 取children的最后一个信息为菜单信息, 后者覆盖前面的
        setOnlyOneChild(showingChildren.pop())
      }
    }
  })



  return route.hidden ? null : (
    isMenuItemOrSubmenu(route)
    ?
      <SubMenu
        key={route.path}
        icon={getIcon(route)}
        title={route.meta&&route.meta.title}
      >
        { route.children.map(route => <SidebarItem key={route.path} {...route} />) }
      </SubMenu>
      :
      <Item key={ onlyOneChild.path } icon={ getIcon(onlyOneChild) }>
        { onlyOneChild.meta && onlyOneChild.meta.title }
      </Item>
  )
})
