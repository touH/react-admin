import React, { useState } from 'react';
import { Layout } from 'antd';

import './index.scss'

import { constantRoutes, asyncRoutes } from '@/router'

import _Menu from './components/Menu'
import  _Header from './components/Header'

const { Header, Sider, Content } = Layout;

export default (props) => {
  const routes = [...constantRoutes, ...asyncRoutes];

  const [collapsed, setCollapsed] = useState(false)

  return <div className='layout'>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <_Menu routes={routes} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          <_Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  </div>
}
