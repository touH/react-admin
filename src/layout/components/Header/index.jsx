import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Space, Layout } from 'antd';

import {
  ExclamationCircleOutlined
} from '@ant-design/icons';

import './index.scss'

import Breadcrumb  from '@/components/Breadcrumb'

import avatar from '@/assets/images/admin.jpg'
import { dispatchResetToken } from "@/store/modules/user/action";
import { getterMatchRoutes } from "@/store/getters"

const { Header } = Layout;

const mapStateToProps = state => ({
  // match 相匹配的 route
  matchRoutes: getterMatchRoutes(state),
})

const mapDispatchToProps = {
  dispatchResetToken
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {

  const { dispatchResetToken, matchRoutes } = props

  const logout = () => {
    Modal.confirm({
      title: '提示',
      content: (
        <Space align="center"><ExclamationCircleOutlined style={{ fontSize: '25px', color: '#faad14' }} /> 是否确定退出？</Space>
      ),
      onOk() {
        dispatchResetToken()
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

  return <Header className='header'>
    <Breadcrumb matchRoutes={matchRoutes} />
    <Dropdown overlay={menu} trigger={['click']}>
      <img className="avatar" src={avatar}/>
    </Dropdown>
  </Header>
}))
