/*
@description：该文件表示的就是项目的菜单，通过该文件来配置菜单项目。
  1. 对于不是菜单的路由，不是菜单的路由，直接在路由文件中配置就行。该文件只配置菜单相关的信息。
  2. 对于不在菜单上显示的 菜单子模块信息， 使用 hidden 属性配置， 比如 /app/table/1  不显示菜单
  3. 记得 菜单上配置好了，相关的 路由在 路由配置文件中配置好

hidden: true/false 或无该属性。   true 时隐藏菜单，否则显示
meta: {
  title: String         菜单标题
  icon: String          菜单图标
  roles: Array          角色
  去掉了：isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是， 改为了通过children来表示是否有子菜单
  affix: Boolean        是否在tagsView中默认永远显示，不被删除， 如：让首页默认显示
  noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
}
*/
import { WindowsOutlined } from '@ant-design/icons';

const menuData = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: WindowsOutlined,
      affix: true
    },
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: WindowsOutlined,
      roles: ['admin', 'other'],
    },
    children: [
      {
        path: '/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        }
      },
      {
        path: '/permission/role',
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/components',
    redirect: '/components/tinymce',
    name: 'Components',
    meta: {
      title: 'Components',
      icon: WindowsOutlined,
    },
    children: [
      {
        path: '/components/tinymce',
        name: 'Tinymce',
        meta: { title: 'Tinymce' }
      },
      {
        path: '/components/markdown',
        name: 'Markdown',
        meta: { title: 'Markdown' }
      },
      {
        path: '/components/json-editor',
        name: 'JsonEditor',
        meta: { title: 'JSON Editor' }
      },
      {
        path: '/components/upload',
        name: 'Upload',
        meta: { title: '文件上传' }
      },
      {
        path: '/components/count-to',
        name: 'CountTo',
        meta: { title: '计数' }
      },
      {
        path: '/components/back-to-top',
        name: 'BackToTop',
        meta: { title: '回到顶部' }
      },
      {
        path: '/components/drag-list',
        name: 'DragList',
        meta: { title: '拖拽 List' }
      },
    ]
  },
  {
    path: '/table',
    redirect: '/table/dynamic-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: WindowsOutlined,
    },
    children: [
      {
        path: '/table/dynamic-table',
        name: 'DynamicTable',
        meta: { title: '选择列' }
      },
      {
        path: '/table/page-table',
        name: 'PageTable',
        meta: { title: '分页 Table' }
      },
      {
        path: '/table/drag-table',
        name: 'DragTable',
        meta: { title: '拖拽 Table' }
      },
      {
        path: '/table/inline-edit-table',
        name: 'InlineEditTable',
        meta: { title: 'Table 内编辑' }
      },
      {
        path: '/table/scroll-table',
        name: 'ScrollTable',
        meta: { title: '滚动加载' }
      },
      {
        path: '/table/complex-table',
        name: 'ComplexTable',
        meta: { title: '综合 Table' }
      },
    ]
  },
  {
    path: '/dialog',
    redirect: '/dialog/drag-dialog',
    name: 'Dialog',
    meta: {
      title: 'Dialog',
      icon: WindowsOutlined,
    },
    children: [
      {
        path: '/dialog/drag-dialog',
        name: 'DragDialog',
        meta: { title: '拖拽 Dialog' }
      },
    ]
  },
  {
    path: '/form',
    redirect: '/form/base-form',
    name: 'Form',
    meta: {
      title: 'Form',
      icon: WindowsOutlined,
    },
    children: [
      {
        path: '/form/base-form',
        name: 'BaseForm',
        meta: { title: '基础 Form' }
      },
    ]
  },
  {
    path: '/nested',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '路由嵌套',
      icon: WindowsOutlined,
    },
    children: [
      {
        path: '/nested/menu1',
        name: 'Menu1',
        meta: { title: '菜单 1', isSubmenu: true },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: '/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: '菜单 1-1' }
          },
          {
            path: '/nested/menu1/menu1-2',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: '菜单 1-2', isSubmenu: true },
            children: [
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: '菜单 1-2-1' }
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: '菜单 1-2-2' }
              }
            ]
          },
          {
            path: '/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: '菜单 1-3' }
          }
        ]
      },
      {
        path: '/nested/menu2',
        name: 'Menu2',
        meta: { title: '菜单 2' }
      }
    ]
  }
]

export default menuData
