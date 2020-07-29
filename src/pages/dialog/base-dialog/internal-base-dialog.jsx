import React from "react";
import { Modal } from 'antd';

class InternalBaseDialog extends React.Component {
  state = {
    visible: false,
    confirmLoading: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    // this.setState({
    //   confirmLoading: true,
    // });
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return <Modal
      title="Title"
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
      <p>业务代码等都直接在 Modal 组件内部编写，只通过外部的按钮来控制弹框显示</p>
    </Modal>
  }
}

export default InternalBaseDialog
