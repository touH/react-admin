import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { message } from 'antd';
import path from 'path';
import './App.css'
import Layout from '@/layout'
import Loading from '@/components/Loading'
import { constantRoutes, baseName, getMatchRoutes } from '@/router'
import { getToken } from '@/utils/token'
import { getterToken, getterRoles, getterMenuRoutes, getterRoutes, getterActiveRoute } from './store/getters'
import { getInfo, resetToken } from './store/modules/user/action'
import { setRoutes } from './store/modules/permission/action'
import { setActiveRoute, setMatchRoutes } from "./store/modules/app/action";

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
    getInfo,
    setRoutes,
    setActiveRoute,
    setMatchRoutes
  } = props;

  /**
   * @description
   *      1. 在 redux 中 设置当前路由信息。对于不匹配的路径，只设置 path属性
   *      2. 注意： 当 location.pathname 改变时，Layout 菜单路由页面已经改变， 而 redux 中的 activeRoute 还未及时更新，
   *         要等到所有组件渲染完成才会 触发 setActiveRouteMatch 方法，所以在组件内部调用 redux 的 activeRoute 要注意，最好使用 useEffect 监听
   * @param routes 所有有权限的 路由
   * @param path   当前path
   */
  const setActiveRouteMatch = (routes, path) => {
    const activeRoute = routes.find(route => route.path === path) || { path: path}
    // redux app 设置当前 route 信息
    setActiveRoute(activeRoute)
    // redux app 设置当前 route 匹配的match信息
    setMatchRoutes(getMatchRoutes(path, routes))
  }

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
          setActiveRouteMatch(routes, location.pathname)
        } else {
          getInfo(token).then(res => {
            const { roles } = res.payload
            setRoutes(roles).then(({ payload: { routes } }) => {
              setActiveRouteMatch(routes, location.pathname)
            })
          }).catch(e => {
            message.error(e);
            props.resetToken().then(() => {
              history.push('/login')
            });
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
  resetToken,
  setActiveRoute,
  setMatchRoutes
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
