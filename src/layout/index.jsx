import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd';

import './index.scss'

import { asyncMenuRoutes, getExpandMenuRoutes } from '@/router'

import MenuComponent from './components/Menu'
import HeaderComponent from './components/Header'
import { gettermMenuRoutes } from "../store/getters";

const { Header, Sider, Content } = Layout;

// 用于路由递归，生产所有的菜单路由 <Route>
const renderRoute = (routes=[]) => routes.map(route => <Route
  exact={route.meta.isSubmenu}    // 如果是一个 Submenu 要严格匹配，  如果不加这个 子路由会被 父路由先匹配，如 /a，/a/b，/a 劫持住了
  path={ route.path }
  key={ route.path }
  render={ props =>
    route.redirect ? <Redirect to={ route.redirect } /> : route.component && <route.component {...route} {...props} />
  }
/>)

const AppRoutes = React.memo(({ asyncMenuRoutes }) => {
  return renderRoute(getExpandMenuRoutes(asyncMenuRoutes))
})

const LayoutCompoent = props => {

  const menuEl = useRef(null);
  const [collapsed, setCollapsed] = useState(false)

  return <div className='layout'>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuComponent {...props} ref={ menuEl } routes={ props.menuRoutes }  />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          <HeaderComponent collapsed={ collapsed } setCollapsed={ collapsed => {
            setCollapsed(collapsed)
            menuEl.current.setOpenKeys(collapsed)
          }} />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <AppRoutes asyncMenuRoutes={props.menuRoutes} />
            {/*{ renderRoute(getExpandMenuRoutes(props.menuRoutes)) }*/}
            <Route  path='*' render={() => <Redirect to='/404' /> }  />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </div>
}

const mapStateToProps = state => {
  return {
    menuRoutes: gettermMenuRoutes(state)
  }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutCompoent)
