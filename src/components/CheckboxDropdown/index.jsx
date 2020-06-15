import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Menu, Dropdown, Checkbox, Button } from 'antd';

import './index.scss'

const DropDownMenu = props  => {

  const { columns, visible, handleCancel } = props

  const [_columns, setColumns] = useState(JSON.parse(JSON.stringify(columns)))

  useEffect(() => {
    setColumns(JSON.parse(JSON.stringify(columns)))
  }, [visible])

  const handleChecked = (e, i) => {
    const checked =  e.target.checked;
    setColumns(columns => {
      return columns.map((column, index) => {
        if(index === i) {
          column.checked = checked
        }
        return column
      })
    })
  }

  const cancel = () => handleCancel()

  return <div className='drop-down-menu'>
    <Menu>
      {
        _columns.map((column, index) => <Menu.Item key={index}>
          <Checkbox
            checked={column.checked}
            onChange={(e) => handleChecked(e, index)}
          >
            { column.title }
          </Checkbox>
        </Menu.Item>)
      }
      <div className='btns'>
        <Button type="primary">保存</Button>
        <Button onClick={cancel}>取消</Button>
      </div>
    </Menu>
  </div>
}

const CheckboxDropdown = props => {
  const { columns } = props;

  const [_columns, setColumns] = useState(columns);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setColumns(columns.map(column => {
      if(typeof column.checked !== 'boolean') {
        column.checked = true;
      }
      return column
    }))
  }, [])

  const handleVisibleChange = visible => {
    setVisible(visible)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return <Dropdown
    overlay={() => <DropDownMenu
      columns={_columns}
      visible={visible}
      handleCancel={handleCancel}
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
