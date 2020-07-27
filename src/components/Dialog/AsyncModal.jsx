import React, {useState} from "react";
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const __Modal = React.memo(props => {

  const {
    visible,
    title,
    cancelText,
    okText,
    onOk,
    onCancel,
    children,
    ..._props
  } = props;

 const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    onOk(() => setConfirmLoading(false))
  }

  const handleCancel = () => {
    onCancel()
  }

  return <Modal
    title={title}
    maskClosable={false}
    visible={visible}
    cancelText={cancelText}
    okText={okText}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    {..._props}
  >
    <div>
      {children}
    </div>
  </Modal>
})

__Modal.propTypes = {
  visible: PropTypes.bool,
}
__Modal.defaultProps = {
  cancelText: '取消',
  okText: '确定',
};

export default __Modal
