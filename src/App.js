import React, {useEffect} from "react";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from '@/layout'
import './App.css'
import {getToken} from "@/utils/token";
import router from './router'
import path from "path";
import {dispatchGetInfo} from "./store/modules/user/action";
import {getterRoles} from "./store/getters";
import Loading from '@/components/Loading'

const normalRoute = (routes=[]) => routes.map(
  route => {
    return <Route path={route.path} key={route.path} render={ props => <route.component route={route} {...props} /> } />
  }
)

function App(props) {

  const {
    roles,
    history,
    location,
    dispatchGetInfo
  } = props

  useEffect(() => {
    const token = getToken();
    if(token) {
      if(location.pathname === '/login') {
        history.replace('/')
      } else {
        // 是否有登录角色
        const hasRoles = roles && roles.length > 0
        if(hasRoles) {

        } else {
          // 获取用户信息
          dispatchGetInfo(token)
        }
      }
    } else {
      if(location.pathname !== '/login') {
        history.push('/login')
      }
    }
  }, [location.pathname])

  // 即如果没有角色信息的话，不进行渲染，要等到获取到用户信息，才进行渲染
  if(!roles.length && location.pathname !== '/login') return <Loading />

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={path.join(router.baseName, '/home')} /> }  />
        <Route  path={ router.baseName } component={ Layout }  />
        { normalRoute(router.getConstantRouterData()) }
        <Route  path='*' render={() => <Redirect to='/404' /> }  />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    roles: getterRoles(state)
  }
}

const mapDispatchToProps = {
  dispatchGetInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
