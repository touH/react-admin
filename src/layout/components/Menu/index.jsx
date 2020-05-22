import React from "react";
import { Menu } from 'antd';
import SidebarItem from './SidebarItem';

const { SubMenu, Item } = Menu


export default ({ routes: routes=[] }) => {

  // 判断是否有子菜单  true: 有， false: 无
  const isMenuItemOrSubmenu = route => route.meta && route.meta.isSubmenu
  // 字体图标、我直接在标签上写 三元和短路操作竟然报错
  const getIcon = route => route.meta && route.meta.icon ? <route.meta.icon /> : null

  // return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
  //   {
  //     routes.map(route => <SidebarItem key={route.path} {...route} />)
  //   }
  // </Menu>

  return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    {
      routes.map(route => {
        return route.hidden ? null : (
          isMenuItemOrSubmenu(route)
            ?
            <SubMenu
              key={route.path}
              icon={ getIcon(route) }
              title={route.meta&&route.meta.title}
            >

            </SubMenu>
            :
            <Item key={ route.path } icon={ getIcon(route) }>
              { route.meta && route.meta.title }
            </Item>
        )
      })
    }
  </Menu>
}
