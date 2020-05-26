import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css'

import { constantRoutes, asyncRoutes } from '@/router'

const routes = [...constantRoutes, ...asyncRoutes];

// 用于路由递归，生产所有的路由配置Route
const recursiveRoute = (routes=[]) => {
  return routes.map((route, index) => {
    return <Route path={route.path} key={index}>
      {
        !route.children ? <route.component /> : <route.component>
          <Switch>
            { recursiveRoute(route.children) }
          </Switch>
        </route.component>
      }
    </Route>
  })
}

function App(props) {
  return (
    <div className='App'>
      <Switch>
        { recursiveRoute(routes) }
      </Switch>
    </div>
  );
}

export default App;
