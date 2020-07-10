import React  from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import './index.scss'
import router from '@/router'
import MySider from './components/Menu'
import MyHeader from './components/Header'
import MyTagsView from './components/TagsView'

const { Content } = Layout;

// 用于路由递归，生产所有的菜单路由 <Route>
const renderRoute = (routes=[]) => routes.map(route => <Route
  exact={route.meta.isSubmenu}    // 如果是一个 Submenu 要严格匹配，  如果不加这个 子路由会被 父路由先匹配，如 /a，/a/b，/a 劫持住了
  path={ route.path }
  key={ route.path }
  render={ props =>
    route.redirect ? <Redirect to={ route.redirect } /> : route.component && <route.component {...route} {...props} />
  }
/>)

const LayoutCompoent = React.memo(props => {

  return <div className='layout'>
    <Layout>
      <MySider
        menuData={router.getMenuData()}
      />
      <Layout>
        {/*<MyHeader style={{ padding: 0 }} />*/}
        {/*<MyTagsView />*/}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {/*{ renderRoute(expandMenuRoutes) }*/}
            {/*<Route  path='*' render={() => <Redirect to='/404' /> }  />*/}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </div>
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutCompoent)
