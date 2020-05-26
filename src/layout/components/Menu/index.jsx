import React from "react";
import { Menu } from 'antd';

import './index.scss'

const { SubMenu } = Menu

// 获取Icon
const getIcon = route => route.meta && route.meta.icon ? <route.meta.icon /> : null

/**
 * @description 获取最后可点击的 菜单Item 的路由信息
 *    1. 当路由配置中有children属性，并且children中路由对象信息，那么取route.children最后一个信息为要显示的信息，后面的route覆盖前面的route信息，取最后一个
 *    2. 当children是个空数组、或者没有children，则就直接取这个 route 信息为要显示的信息
 * @param children  当前Item点击的route信息的children
 * @param route     当前Item点击的route信息
 * @return 最后要显示的route信息
 */
const getMenuItem = (children=[], route) => {
  if(children.length) {
    return children.filter(item => !item.hidden).pop()
  } else {
    return route
  }
}

class BaseMenu extends React.PureComponent {

  // 返回数组，组件集合，即[SubMenu, Item, ...], 用于在Menu中显示
  getNavMenuItems = (routes=[]) => {
    return routes.filter(route => !route.hidden).map(route => this.getSubMenuOrItem(route))
  }

  // 判断是 SubMenu 还是 Item， 返回相应的 菜单组件
  getSubMenuOrItem = route => {
    if(this.isSubMenuOrItem(route)) {
      return <SubMenu
        key={route.path}
        icon={getIcon(route)}
        title={route.meta&&route.meta.title}
      >
        {this.getNavMenuItems(route.children)}
      </SubMenu>
    } else {
      // Item 的 路由信息
      let onlyOneRoute = getMenuItem(route.children, route);
      return <Menu.Item key={onlyOneRoute.path} icon={getIcon(onlyOneRoute)} >{ onlyOneRoute.meta && onlyOneRoute.meta.title }</Menu.Item>
    }
  }

  // 返回一个布尔， true：Submenu，false：Item
  isSubMenuOrItem = route => !!(route.meta && route.meta.isSubmenu)

  render() {
    const { routes } = this.props
    return <>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['/home/index']}
      >
        {this.getNavMenuItems(routes)}
      </Menu>
    </>;
  }
}

export default BaseMenu
