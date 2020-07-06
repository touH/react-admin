import React, {useEffect, useState} from "react";
import { Table } from 'antd';

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

  // 保持原始数据干净
  const { columns } = props;

  // checkboxColumns 和 tableColumns  会被污染
  const checkboxColumns = columns.map(column => ({
    title: column.title,
    key: column.dataIndex,
    checked: true
  }))
  const tabColumns = JSON.parse(JSON.stringify(columns));

  const [_checkboxColumns, _setCheckboxColumns] = useState(checkboxColumns)
  const [_tabColumns, _setTabColumns] = useState(tabColumns)

  const selectColumns = checkboxColumns => {
    _setCheckboxColumns(checkboxColumns)
    _setTabColumns(columns.filter((column, index) => checkboxColumns[index].checked))
  }

  return <div className='dynamic-table'>
    <CheckboxDropdown
      columns={_checkboxColumns}
      context={<SettingFilled />}
      selectColumns={selectColumns}
    />
    <Table {...props} columns={_tabColumns} />
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





