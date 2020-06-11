import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Space } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import './index.scss'

import avatar from '@/assets/images/admin.jpg'
import { resetToken } from "@/store/modules/user/action";


const Header = props => {

  const { collapsed, setCollapsed, history, resetToken } = props

  const logout = () => {
    Modal.confirm({
      title: '提示',
      content: (
        <Space align="center"><ExclamationCircleOutlined style={{ fontSize: '25px', color: '#faad14' }} /> 是否确定退出？</Space>
      ),
      onOk() {
        resetToken().then(() => {
          history.push('/login')
        })
      },
    });
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>个人中心</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>退出</Menu.Item>
    </Menu>
  );

  return <div className='header'>
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => {
        setCollapsed(!collapsed)
      },
    })}
    <Dropdown overlay={menu} trigger={['click']}>
      <img className="avatar" src={avatar}/>
    </Dropdown>
  </div>
}

const mapDispatchToProps = {
  resetToken
}

export default withRouter(connect(null, mapDispatchToProps)(Header))
