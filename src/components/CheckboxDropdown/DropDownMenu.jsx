import React, {useEffect, useState} from "react";
import {Button, Checkbox, Menu} from "antd";

import './index.scss'

const DropDownMenu = props  => {

  const { columns, visible, handleCancel, handleSave } = props

  const [_columns, setColumns] = useState(JSON.parse(JSON.stringify(columns)))

  // Menu 展开合拢
  useEffect(() => {
    if(!visible) {
      setColumns(JSON.parse(JSON.stringify(columns)))
    }
  }, [visible])

  // 点击 checkbox
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

  // 取消
  const cancel = () => handleCancel()

  // 保存
  const save = () => handleSave({ columns: _columns })

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
        <Button type="primary" onClick={save}>保存</Button>
        <Button onClick={cancel}>取消</Button>
      </div>
    </Menu>
  </div>
}

export default DropDownMenu
