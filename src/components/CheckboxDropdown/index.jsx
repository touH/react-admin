import React, { useState} from "react";
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';

import DropDownMenu from './DropDownMenu'

const CheckboxDropdown = props => {

  const { columns, selectColumns } = props;

  const [visible, setVisible] = useState(false)

  // 展开合拢
  const handleVisibleChange = visible => {
    setVisible(visible)
  }

  // 取消
  const handleCancel = () => {
    setVisible(false)
  }

  // 保存
  const handleSave = ({ columns }) => {
    setVisible(false)
    selectColumns(columns)
  }

  return <Dropdown
    overlay={() => <DropDownMenu
      columns={columns}
      visible={visible}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />}
    trigger={['click']}
    onVisibleChange={handleVisibleChange}
    visible={visible}
  >
    <span>{ props.context }</span>
  </Dropdown>
}

CheckboxDropdown.propTypes = {
  columns: PropTypes.array,
};

CheckboxDropdown.defaultProps = {
  columns: []
};


export default CheckboxDropdown
