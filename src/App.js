import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import path from 'path';
import './App.css'
import Layout from '@/layout'
import Loading from '@/components/Loading'
import { constantRoutes, baseName } from '@/router'
import { getToken } from '@/utils/token'
import { getterToken, getterRoles, getterMenuRoutes, getterRoutes } from './store/getters'
import { getInfo, dispatchResetToken, dispatchInitialization } from './store/modules/user/action'
import { setRoutes } from './store/modules/permission/action'
import { setActiveRoute, setMatchRoutes, dispatchActiveRouteMatch } from "./store/modules/app/action";

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

  const {
    history,
    location,
    roles,
    token,
    routes,
    menuRoutes,
    dispatchInitialization,
    dispatchActiveRouteMatch
  } = props;

  /*
    用于判断用户权限、用户信息被人为清空时做的处理、路由跳转
    1. 是否有token，
       1.1 有 --> 2
       1.2 无 --> login，重新登录
    2. 是否有角色信息（用户信息）
       2.1 有（代表着信息都在）  进行相关设置（当前route信息，当前路由信息的所有matches）
       2.2 无   以下都有相应顺序，要上一步成功才会执行下一步
           2.2.1  发送请求获取用户信息，角色 ↓
           2.2.2  相应用户角色的所有权限路由、所有权限菜单  ↓
           2.2.3  设置当前路由信息和当前路由信息的所有matches（只有知道所有有权限的路由才好设置）
  */
  useEffect(() => {
    const hasToken = getToken();
    if(hasToken) {
      if(location.pathname === '/login') {
        history.replace('/')
      } else {
        // 是否有登录角色信息
        const hasRoles = roles && roles.length > 0;
        if(hasRoles) {
          dispatchActiveRouteMatch({
            routes,
            path: location.pathname
          })
        } else {
          dispatchInitialization({
            token,
            path: location.pathname
          })
        }
      }
    } else {
      if(location.pathname !== '/login') {
        history.push('/login')
      }
    }
  }, [location.pathname])

  // 增加上 menuRoutes.length 这个判断， 是为了确保已经拿到了菜单信息才渲染
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={path.join(baseName, '/home')} /> }  />
        <Route  path={ baseName } component={ menuRoutes.length ? Layout : Loading } /> }  />
        { createRoute(constantRoutes) /* 主路由，必显示部分 /login、/redirect、/404、/500 等 hidden */ }
        <Route  path='*' render={() => <Redirect to='/404' /> }  />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: getterToken(state),
    roles: getterRoles(state),
    routes: getterRoutes(state),
    menuRoutes: getterMenuRoutes(state),
  }
}
const mapDispatchToProps = {
  getInfo,
  setRoutes,
  dispatchResetToken,
  setActiveRoute,
  setMatchRoutes,
  dispatchInitialization,
  dispatchActiveRouteMatch
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
