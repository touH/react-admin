import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Layout from '@/layout'
import { constantRoutes } from '@/router'

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

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/app/home/index' /> }  />
        <Route  path='/app' component={ Layout } /> }  />
        { createRoute(constantRoutes) /* 主路由，必显示部分 /login、/redirect、/404、/500 等 hidden */ }
      </Switch>
    </div>
  );
}

export default App;
