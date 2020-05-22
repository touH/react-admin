import React from "react";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import './index.scss'

export default ({ collapsed, setCollapsed }) => {
  return <div className='header'>
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => {
        setCollapsed(!collapsed)
      },
    })}
  </div>
}
