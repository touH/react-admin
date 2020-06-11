import React, { useState, useRef } from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd';

import './index.scss'

import {  getExpandMenuRoutes } from '@/router'

import SiderMenu from './components/Menu'
import GlobalHeader from './components/Header'
import TagsView from './components/TagsView'

import { getterMenuRoutes } from "../store/getters";

const { Header, Content } = Layout;

// 用于路由递归，生产所有的菜单路由 <Route>
const renderRoute = (routes=[]) => routes.map(route => <Route
  exact={route.meta.isSubmenu}    // 如果是一个 Submenu 要严格匹配，  如果不加这个 子路由会被 父路由先匹配，如 /a，/a/b，/a 劫持住了
  path={ route.path }
  key={ route.path }
  render={ props =>
    route.redirect ? <Redirect to={ route.redirect } /> : route.component && <route.component {...route} {...props} />
  }
/>)

const AppRoutes = ({ asyncMenuRoutes }) => {
  return renderRoute(getExpandMenuRoutes(asyncMenuRoutes))
}

const LayoutCompoent = React.memo(props => {

  const menuEl = useRef(null);
  const [collapsed, setCollapsed] = useState(false)

  return <div className='layout'>
    <Layout>
      <SiderMenu
        {...props}
        ref={ menuEl }
        collapsed={collapsed}
        routes={ props.menuRoutes }
      />
      <Layout>
        <Header
          style={{ padding: 0 }}
        >
          <GlobalHeader
            collapsed={ collapsed }
            setCollapsed={ collapsed => {
              setCollapsed(collapsed)
              menuEl.current.setOpenKeys(collapsed)
            }}
          />
        </Header>
        <TagsView />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {/*<AppRoutes asyncMenuRoutes={props.menuRoutes} />*/}
            { renderRoute(getExpandMenuRoutes(props.menuRoutes)) }
            <Route  path='*' render={() => <Redirect to='/404' /> }  />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </div>
})

const mapStateToProps = state => {
  return {
    menuRoutes: getterMenuRoutes(state)
  }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutCompoent)
