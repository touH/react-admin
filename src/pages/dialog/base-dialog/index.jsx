import React, {useState} from "react";
import {
  Button,
  message,
  Space,
  Form,
  Input,
  InputNumber,
  Modal,
  Divider
} from 'antd';
import BaseModal from '@/components/Dialog/BaseModal';
import AsyncModal from '@/components/Dialog/AsyncModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default () => {
  // Modal 状态
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)

  const [form] = Form.useForm()

  // 事件
  const onFinish = values => {
    console.log(values);
  };

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>
        <div>这是一个动态生成的Modal，关闭后就销毁了，即用即卸载</div>
        <br/>
        <Button type="primary" onClick={() => Modal.destroyAll()}>销毁这个弹框</Button>
      </div>,
      onOk(close) {
        setTimeout(() => {
          console.log('OK');
          close()
        }, 1000)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return <div>
    <Space>
      <Button type="primary" onClick={showConfirm}>动态生成 Confirm Modal</Button>
      <Button type="primary" onClick={() => {setVisible1(true)}}>Basic Modal</Button>
      <Button type="primary" onClick={() => {setVisible2(true)}}>Async Modal</Button>
      <Button type="primary" onClick={() => {setVisible3(true)}}>Form Modal</Button>
      <Button type="primary" onClick={() => {setVisible4(true)}}>Table Modal</Button>
    </Space>

    {/*********************************** BaseModal ************************************/}
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

    {/*********************************** AsyncModal ************************************/}
    <AsyncModal
      title="Async Modal"
      visible={visible2}
      // 调用 loading() 关闭loading
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
      点击按钮发送异步操作，操作完成关闭Modal
    </AsyncModal>

    {/*********************************** Form Modal ************************************/}
    <AsyncModal
      title="Async Modal"
      visible={visible3}
      // 调用 loading() 关闭loading
      onOk={loading => {
        // form.validateFields() 进行表单验证
        form.validateFields().then(values => {
          console.log(values)
          setTimeout(() => {

            console.log(form)
            console.log('这里就是表单的数据，可以作为参数传给后端', form.getFieldsValue())
            console.log('这里就是表单的数据，可以作为参数传给后端', values)

            // 重置表单到初始化
            form.resetFields();

            message.success('success');
            loading()
            setVisible3(false)
          }, 2000);
        }).catch(err => {
          loading()
        })

      }}
      onCancel={() => {
        setVisible3(false)
      }}
    >
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        initialValues={{
          // 可以设定一个默认值, 不然，默认都是undefined
          email: '123@163.com'
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item name='name' label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='age' label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='website' label="Website">
          <Input />
        </Form.Item>
        <Form.Item name='introduction' label="Introduction">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </AsyncModal>

    <Divider />

  </div>
}
