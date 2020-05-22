import Layout from '@/layout'

import {
  WindowsOutlined
} from '@ant-design/icons';

import BaseForm from '@/pages/form/base-form'

export default {
  path: '/form',
  component: Layout,
  redirect: '/form/base-form',
  name: 'Form',
  meta: {
    title: 'Form',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/form/base-form',
      component: BaseForm,
      name: 'BaseForm',
      meta: { title: '基础 Form' }
    },
  ]
}
