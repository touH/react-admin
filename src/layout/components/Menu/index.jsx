import React from "react";
import PropTypes from 'prop-types';
import { Menu, Layout } from 'antd';

import './index.scss'

const { SubMenu } = Menu
const { Sider } = Layout;

// 获取Icon
const getIcon = route => route.meta && route.meta.icon ? <route.meta.icon /> : null

/*
 一开始使用 withRouter 装饰，来获取路由历史信息，但是现在因为父组件使用 ref 的原因，
 如果子组件内部还是使用装饰器，使用 ref 会报错，不能使用装饰器装饰组件，所以修改为 通过外部传入 props 的方式来获取路由信息
 */
class BaseMenu extends React.PureComponent {

  static propTypes = {
    menuRoutes: PropTypes.array,
    expandMenuRoutes: PropTypes.array,
    collapsed: PropTypes.bool
  }

  // 初始化
  constructor(props) {
    super(props);

    const { location, expandMenuRoutes } = props;
    const defaultOpenKeys = this.getOpenKeys(location.pathname, expandMenuRoutes)

    // 刷新或初始化的时候默认 激活的菜单Item和如果是Submenu的相关联展开
    this.state = {
      selectedKeys: [location.pathname],
      openKeys: defaultOpenKeys,
    }
  }

  // 菜单路由改变 selectedKeys 相应改变
  static getDerivedStateFromProps(props, state) {
    const { location } = props;
    const { selectedKeys } = state;
    if(location.pathname !== selectedKeys[0]) {
      return {
        selectedKeys: [location.pathname],
        // openKeys: props.collapsed ? [] : ['/app/permission']
      }
    } else {
      return null
    }
  }

  /**
   * @description 该函数用于父组件通过点击伸缩按钮，来使菜单伸缩。为什么要这么做？在该组件内部每次菜单伸缩，也会默认触发onOpenChange事件，而每次收缩后openKeys会被默认为[]，在这个过程中会有一闪的显示Submenu的内容，而且菜单伸缩再展开时Submenu也不会展开，因为openKeys为[]。为了解决这个问题，特意使用父组件事件来控制伸缩
   * @param collapsed: Boolean
   */
  setOpenKeys = collapsed => {
    // true 关闭  false 展开
    if(collapsed) {
      this.setState({
        openKeys: []
      })
    } else {
      const { location, expandMenuRoutes } = this.props;
      // 重新计算展开的 Submenu， 因为在这之前变为 [] 了
      this.setState({
        openKeys: this.getOpenKeys(location.pathname, expandMenuRoutes)
      })
    }
  }

  // 返回数组，菜单集合，树，即[SubMenu, Item, ...], 用于在Menu中显示所有菜单
  getNavMenuItems = (routes=[]) => routes.filter(route => !route.hidden).map(route => this.getSubMenuOrItem(route))

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
    history.push(route.key)
  }

  // 根 Submenu 只会展开一个
  onOpenChange = (openKeys=[]) => {

    const { menuRoutes } = this.props;
    const { openKeys: _openKeys } = this.state;

    // 路径 or undefined
    const latestOpenKey = openKeys.find(key => _openKeys.indexOf(key) === -1);

    // --------------------------------------------------------------------------------------------------------------------
    // 得到 菜单中是 Submenu 的菜单集合，用于点击菜单，收起其他展开的所有菜单，排除子菜单的Submenu
    const getRootSubmenuKeys = routes => routes.filter(
      route => !route.hidden && route.meta && route.meta.isSubmenu
    ).map(route => route.path)

// --------------------------------------------------------------------------------------------------------------------
    // 不是 Submenu 则可以随意展开， 如果是 Submenu 则只展开一个，并且会将别的展开的包括 子Submenu 全都收起
    if(getRootSubmenuKeys(menuRoutes).indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      // 展开有路径，只会有一个 [path]  or  收起 []
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const { menuRoutes, collapsed } = this.props
    const { selectedKeys, openKeys } = this.state;
    return <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        theme="light"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
      >
        {this.getNavMenuItems(menuRoutes)}
      </Menu>
    </Sider>;
  }
}

export default BaseMenu
