import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import { constantRoutes, asyncRoutes } from '@/router'

const routes = [...constantRoutes, ...asyncRoutes];

// 用于路由递归，生产所有的路由配置Route
const recursiveRoute = (routes=[]) => {
  return routes.map((route, index) => {
    return <Route path={route.path} key={index} render={ props => !route.children ? <route.component {...props} /> :
    <route.component {...props}>
      <Switch>
        { recursiveRoute(route.children) }
      </Switch>
    </route.component> } />
  })
}

export const createRoute = (routes=[]) => routes.map(
  (route, index) => <Route path={route.path} key={index} render={ props => <route.component route={route} {...props} /> } />
)

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/home/index' /> }  />
        {/*{ recursiveRoute(routes) }*/}
        { createRoute(routes) }
      </Switch>
    </div>
  );
}

export default App;
