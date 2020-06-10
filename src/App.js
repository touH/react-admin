import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import path from 'path';
import './App.css'
import Layout from '@/layout'
import { constantRoutes, baseName } from '@/router'
import { getToken } from '@/utils/token'
import { getterToken, getterRoles } from './store/getters'
import { getInfo } from './store/modules/user/action'
import { setRoutes } from './store/modules/permission/action'

// 用于路由递归，生产所有的路由配置Route，  之前也可通过 props.children 插槽的方式传递给子组件，这种方式也是可以的
/*const recursiveRoute = (routes=[]) => {
  return routes.map((route, index) => {
    return <Route path={route.path} key={index} render={ props => !route.children ? <route.component {...props} /> :
    <route.component {...props}>
      <Switch>
        { recursiveRoute(route.children) }
      </Switch>
    </route.component> } />
  })
}*/

const createRoute = (routes=[]) => routes.map(
  (route, index) => <Route path={route.path} key={index} render={ props => <route.component route={route} {...props} /> } />
)

function App(props) {

  const { history, location, roles, token, getInfo, setRoutes } = props;

  // 用于判断用户权限、用户信息被人为清空时做的处理、路由跳转
  useEffect(() => {
    const hasToken = getToken();
    if(hasToken) {
      if(location.pathname === '/login') {
        history.replace('/')
      } else {
        // 是否有登录角色信息
        const hasRoles = roles && roles.length > 0;
        if(hasRoles) {

        } else {
          getInfo(token).then(res => {
            const { roles } = res.payload
            setRoutes(roles)
          })
        }
      }
    } else {
      if(location.pathname !== '/login') {
        history.push('/login')
      }
    }
  }, [props.location])

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={path.join(baseName, '/home/index')} /> }  />
        <Route  path={ baseName } component={ Layout } /> }  />
        { createRoute(constantRoutes) /* 主路由，必显示部分 /login、/redirect、/404、/500 等 hidden */ }
        <Route  path='*' render={() => <Redirect to='/404' /> }  />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: getterToken(state),
    roles: getterRoles(state)
  }
}
const mapDispatchToProps = {
  getInfo,
  setRoutes
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
