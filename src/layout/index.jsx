import React  from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import './index.scss'
import router from '@/router'
import AuthorizedRoute from '@/components/Authorized'
import MySider from './components/Menu'
import MyHeader from './components/Header'
import MyTagsView from './components/TagsView'
import {getterRoles} from "@/store/getters";

const { Content } = Layout;

// 渲染生成所有的路由 <Route>
const renderRoute = (routes=[]) => routes.map(
  route => <AuthorizedRoute
    exact
    path={ route.path }
    key={ route.path }
    authority={ route.authority }
    component={route.component}
  />
)

const LayoutComponent = React.memo(props => {

  const { roles } = props

  return <div className='layout'>
    <Layout>
      <MySider
        menuData={router.getMenuData()}
        roles={roles}
      />
      <Layout>
        <MyHeader style={{ padding: 0 }} />
        <MyTagsView />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            { renderRoute(router.getAppRouterData()) }
            <Route  path='*' render={() => <Redirect to='/404' /> }  />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </div>
})

const mapStateToProps = state => ({
  roles: getterRoles(state)
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent)
