import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { Menu } from 'antd';

import './index.scss'

import { getExpandMenuRoutes } from '@/router'

const { SubMenu } = Menu

// 获取Icon
const getIcon = route => route.meta && route.meta.icon ? <route.meta.icon /> : null

@withRouter
class BaseMenu extends React.PureComponent {

  static propTypes = {
    routes: PropTypes.array,
    collapsed: PropTypes.bool
  }

  state = {
    defaultOpenKeys: [],
    openKeys: [],
    selectedKeys: [],
  }

  // 初始化
  constructor(props) {
    super(props);
    const { location, routes } = props;
    // 刷新或初始化的时候默认 激活的菜单Item和如果是Submenu的相关联展开
    this.state.selectedKeys = [location.pathname];
    this.state.defaultOpenKeys = this.getOpenKeys(location.pathname, getExpandMenuRoutes(routes));
  }

  // 返回数组，菜单集合，树，即[SubMenu, Item, ...], 用于在Menu中显示所有菜单
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
      let onlyOneRoute = this.getMenuItem(route.children, route);
      return <Menu.Item
        key={onlyOneRoute.path}
        icon={getIcon(onlyOneRoute)}
        onClick={ route => this.handleClickItem(route)}
      >
        { onlyOneRoute.meta && onlyOneRoute.meta.title }
      </Menu.Item>
    }
  }

  // 返回一个布尔， true：Submenu，false：Item
  isSubMenuOrItem = route => !!(route.meta && route.meta.isSubmenu)

  /**
   * @description 获取最后可点击的 菜单Item 的路由信息
   *    1. 当路由配置中有children属性，并且children中路由对象信息，那么取route.children最后一个信息为要显示的信息，后面的route覆盖前面的route信息，取最后一个
   *    2. 当children是个空数组、或者没有children，则就直接取这个 route 信息为要显示的信息
   * @param children  当前Item点击的route信息的children
   * @param route     当前Item点击的route信息
   * @return 最后要显示的route信息
   */
  getMenuItem = (children=[], route) => {
    if(children.length) {
      return children.filter(item => !item.hidden).pop()
    } else {
      return route
    }
  }

  /**
   * @description 当页面刷新或初始化时，如果是 Submenu 菜单，对起相关的 Submenu 进行展开
   * @param pathname: url string, routes: 所有菜单路由
   * @return Array<string>   [path, path, path]
   */
  getOpenKeys = (pathname, routes) => routes.filter(route =>
    pathname.indexOf(route.path) !== -1 && !!route.meta.isSubmenu
  ).map(route => route.path)

  // 点击 Item，获取页面
  handleClickItem = (route) => {
    const { history, location } = this.props;
    // 点击当前 Item 不进行重复
    if(location.pathname === route.key) return;
    this.setState({
      selectedKeys: route.key
    })
    history.push(route.key)
  }

  // 根 Submenu 只会展开一个
  onOpenChange = (openKeys=[]) => {
    console.log(openKeys)
    // 路径 or undefined
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    // --------------------------------------------------------------------------------------------------------------------
    // 得到 菜单中是 Submenu 的菜单集合，用于点击菜单，收起其他展开的所有菜单，排除子菜单的Submenu
    const getRootSubmenuKeys = routes => routes.filter(
      route => !route.hidden && route.meta && route.meta.isSubmenu
    ).map(route => route.path)

// --------------------------------------------------------------------------------------------------------------------
    // 不是 Submenu 则可以随意展开， 如果是 Submenu 则只展开一个，并且会将别的展开的包括 子Submenu 全都收起
    if(getRootSubmenuKeys(this.props.routes).indexOf(latestOpenKey) === -1) {
      // console.log(111, openKeys)
      this.setState({ openKeys });
    } else {
      // 展开有路径，只会有一个 [path]  or  收起 []
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const { routes } = this.props
    const { selectedKeys, openKeys, defaultOpenKeys } = this.state;
    return <>
      <Menu
        theme="light"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        // openKeys={openKeys}
        // onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
      >
        {this.getNavMenuItems(routes)}
      </Menu>
    </>;
  }
}

export default BaseMenu
