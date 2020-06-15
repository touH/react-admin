import React, {useEffect, useState} from "react";
import { Table, Menu, Dropdown, Checkbox } from 'antd';

import {
  SettingFilled,
} from '@ant-design/icons';
import CheckboxDropdown from '@/components/CheckboxDropdown'

import './index.scss'

// api
import { request_dynamicTableData } from '@/services/table'

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: '150px',
    render: (text, record, index) => {
      return <a>{text}</a>
    },
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const DynamicTable = props => {
  props.columns.forEach(column => {
    column.checked = true
  })
  return <div className='dynamic-table'>
    <CheckboxDropdown
      columns={props.columns.map(column => ({ title: column.title, key: column.dataIndex }))}
      context={<SettingFilled />}
    />
    <Table {...props} />
  </div>
}


export default props => {

  const [ data, setData ] = useState([])

  useEffect(() => {
    request_dynamicTableData().then(res => {
      const { data } = res;
      if(data.success) {
        setData(data.data.data.map((item, index) => {
          item.key = index
          return item
        }))
      }
    })
  }, [])

  return <DynamicTable
    pagination={false}
    columns={columns}
    dataSource={data}
  />
}





