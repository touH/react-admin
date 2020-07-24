import React, {useState} from "react";
import {Button, message, Space} from 'antd';
import BaseModal from '@/components/Dialog/BaseModal';
import AsyncModal from '@/components/Dialog/AsyncModal';

export default () => {
  // Modal 状态
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)

  //事件


  return <div>
    <Space>
      <Button type="primary" onClick={() => {setVisible1(true)}}>Basic Modal</Button>
      <Button type="primary" onClick={() => {setVisible2(true)}}>Async Modal</Button>
    </Space>

    {/*********************************** Modal ************************************/}
    <BaseModal
      title="Basic Modal"
      visible={visible1}
      onOk={() => {
        message.success('success');
        setVisible1(false)
      }}
      onCancel={() => {
        setVisible1(false)
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </BaseModal>

    <AsyncModal
      title="Async Modal"
      visible={visible2}
      onOk={loading => {
        setTimeout(() => {
          message.success('success');
          loading()
          setVisible2(false)
        }, 2000);
      }}
      onCancel={() => {
        setVisible2(false)
      }}
    >
      123213
    </AsyncModal>
  </div>
}
