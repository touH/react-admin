import Layout from '@/layout'

import {
  WindowsOutlined
} from '@ant-design/icons';

import Tinymce from '@/pages/components/tinymce'
import Markdown from '@/pages/components/markdown'
import JsonEditor from '@/pages/components/json-editor'
import Upload from '@/pages/components/upload'
import CountTo from '@/pages/components/count-to'
import BackToTop from '@/pages/components/back-to-top'
import DragList from '@/pages/components/drag-list'

export default  {
  path: '/components',
  component: Layout,
  redirect: '/components/tinymce',
  name: 'Components',
  meta: {
    title: 'Components',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/components/tinymce',
      component: Tinymce,
      name: 'Tinymce',
      meta: { title: 'Tinymce' }
    },
    {
      path: '/components/markdown',
      component: Markdown,
      name: 'Markdown',
      meta: { title: 'Markdown' }
    },
    {
      path: '/components/json-editor',
      component: JsonEditor,
      name: 'JsonEditor',
      meta: { title: 'JSON Editor' }
    },
    {
      path: '/components/upload',
      component: Upload,
      name: 'Upload',
      meta: { title: '文件上传' }
    },
    {
      path: '/components/count-to',
      component: CountTo,
      name: 'CountTo',
      meta: { title: '计数' }
    },
    {
      path: '/components/back-to-top',
      component: BackToTop,
      name: 'BackToTop',
      meta: { title: '回到顶部' }
    },
    {
      path: '/components/drag-list',
      component: DragList,
      name: 'DragList',
      meta: { title: '拖拽 List' }
    },
  ]
}
