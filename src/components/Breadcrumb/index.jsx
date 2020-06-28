import React, { memo } from "react";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Breadcrumb, Menu } from 'antd';


const _Breadcrumb = memo(({ routes }) => {

  // 数据加载好在渲染
  if(!routes.length) return

  const menu = routes => <Menu>
    {
      routes.map(route => {
        return <Menu.Item key={route.path}>
          <Link to={route.path}>{route.meta && route.meta.title}</Link>
        </Menu.Item>
      })
    }
  </Menu>

  return <Breadcrumb>
    {
      routes.map(route => {
        return <Breadcrumb.Item
          overlay={(route.meta && route.meta.isSubmenu) && (route.children && route.children.length>0) ? menu(route.children) : null}
          key={route.path}>
          {route.meta && route.meta.title}
        </Breadcrumb.Item>
      })
    }
  </Breadcrumb>
})

_Breadcrumb.propTypes = {
  routes: PropTypes.array
}

export default _Breadcrumb
