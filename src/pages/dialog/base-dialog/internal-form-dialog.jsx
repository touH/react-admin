import React from "react";
import {Modal, Form, Input, InputNumber, message} from 'antd';

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

// 如果使用 ref 这种方式，必须使用 class 组件的写法
class InternalFormDialog extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    form: React.createRef()
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { form } = this.state;
    // form.validateFields() 进行表单验证
    form.current.validateFields().then(values => {
      console.log(values)
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {

        console.log(form.current)
        console.log('这里就是表单的数据，可以作为参数传给后端', form.current.getFieldsValue())
        console.log('这里就是表单的数据，可以作为参数传给后端', values)

        // 重置表单到初始化
        form.current.resetFields();

        message.success('success');
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    }).catch(err => {
      console.log(err)
    })

  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    const { form } = this.state;
    this.setState({
      visible: false,
    });
    // 重置表单到初始化
    form.current.resetFields();
  };

  onFinish = values => {
    console.log(values);
  };

  render() {
    const { visible, confirmLoading, form } = this.state;
    return <Modal
      title="Title"
      maskClosable={false}
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
      <Form
        {...layout}
        ref={form}
        name="nest-messages"
        initialValues={{
          // 可以设定一个默认值, 不然，默认都是undefined
          email: '123@163.com'
        }}
        onFinish={this.onFinish}
        validateMessages={validateMessages}
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
    </Modal>
  }
}

export default InternalFormDialog
