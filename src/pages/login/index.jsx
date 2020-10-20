import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.scss'

import { dispatchLogin } from '@/store/modules/user/action'

const Login = props => {

  const onFinish = userInfo => {
    props.dispatchLogin(userInfo)
  };

  return <div className='login-container'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin | user" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  </div>;
}


const mapDispatchToProps = {
  dispatchLogin
}

export default connect(null, mapDispatchToProps)(Login)
