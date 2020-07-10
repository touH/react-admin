import React, { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Breadcrumb, Menu } from 'antd';
import './index.scss'

const _Breadcrumb = memo(({ matchRoutes }) => {

  // 数据加载好再渲染
  if(!matchRoutes.length) return

  const menu = routes => <Menu>
    {
      routes.map(route => {
        return <Menu.Item key={route.path}>
          <Link to={route.path}>{route.title}</Link>
        </Menu.Item>
      })
    }
  </Menu>

  return <Breadcrumb>
    {
      matchRoutes.map(route => {
        return <Breadcrumb.Item
          overlay={route.children && route.children.length>0 ? menu(route.children) : null}
          key={route.path}>
          {route.title}
        </Breadcrumb.Item>
      })
    }
  </Breadcrumb>
})

_Breadcrumb.propTypes = {
  matchRoutes: PropTypes.array
}

export default _Breadcrumb
