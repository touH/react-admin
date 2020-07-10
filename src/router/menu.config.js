/*
@description：该文件表示的就是项目的菜单，通过该文件来配置菜单项目。
  1. 对于不是菜单的路由，不是菜单的路由，直接在路由文件中配置就行。该文件只配置菜单相关的信息。
  2. 对于不在菜单上显示的 菜单子模块信息， 使用 hidden 属性配置， 比如 /app/table/1  不显示菜单
  3. 记得 菜单上配置好了，相关的 路由在 路由配置文件中配置好

{
  title: String         菜单标题
  path: String          菜单路径
  name: String          菜单别名
  icon: String          菜单图标
  hidden: Boolean 或 无该属性。   true 时隐藏菜单，否则显示
  authority: Array       ['admin', 'user'],  权限信息

  meta: {
    去掉了：isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是， 改为了通过children来表示是否有子菜单
    affix: Boolean        是否在tagsView中默认永远显示，不被删除， 如：让首页默认显示
    noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
  }
}
*/
import { WindowsOutlined } from '@ant-design/icons';

const menuData = [
  {
    title: '首页',
    path: 'home',
    name: 'Home',
    icon: WindowsOutlined,
    meta: {
      affix: true
    },
  },
  {
    title: 'Permission',
    path: 'permission',
    name: 'Permission',
    icon: WindowsOutlined,
    authority: ['admin', 'user'],
    children: [
      {
        title: 'Page Permission',
        path: 'page',
        name: 'PagePermission',
      },
      {
        title: '角色管理',
        path: 'role',
        name: 'RolePermission',
        authority: ['admin'],
      }
    ]
  },
  {
    title: 'Components',
    path: 'components',
    name: 'Components',
    icon: WindowsOutlined,
    children: [
      {
        title: 'Tinymce',
        path: 'tinymce',
        name: 'Tinymce',
      },
      {
        title: 'Markdown',
        path: 'markdown',
        name: 'Markdown',
      },
      {
        title: 'JSON Editor',
        path: 'json-editor',
        name: 'JsonEditor',
      },
      {
        title: '文件上传',
        path: 'upload',
        name: 'Upload',
      },
      {
        title: '计数',
        path: 'count-to',
        name: 'CountTo',
      },
      {
        title: '回到顶部',
        path: 'back-to-top',
        name: 'BackToTop',
      },
      {
        title: '拖拽 List',
        path: 'drag-list',
        name: 'DragList',
      },
    ]
  },
  {
    title: 'Table',
    path: 'table',
    name: 'Table',
    icon: WindowsOutlined,
    children: [
      {
        title: '选择列',
        path: 'dynamic-table',
        name: 'DynamicTable',
      },
      {
        title: '分页 Table',
        path: 'page-table',
        name: 'PageTable',
      },
      {
        title: '拖拽 Table',
        path: 'drag-table',
        name: 'DragTable',
      },
      {
        title: 'Table 内编辑',
        path: 'inline-edit-table',
        name: 'InlineEditTable',
      },
      {
        title: '滚动加载',
        path: 'scroll-table',
        name: 'ScrollTable',
      },
      {
        title: '综合 Table',
        path: 'complex-table',
        name: 'ComplexTable',
      },
    ]
  },
  {
    title: 'Dialog',
    path: 'dialog',
    name: 'Dialog',
    icon: WindowsOutlined,
    children: [
      {
        title: '拖拽 Dialog',
        path: 'drag-dialog',
        name: 'DragDialog',
      },
    ]
  },
  {
    title: 'Form',
    path: 'form',
    name: 'Form',
    icon: WindowsOutlined,
    children: [
      {
        title: '基础 Form',
        path: 'base-form',
        name: 'BaseForm',
      },
    ]
  },
  {
    title: '路由嵌套',
    path: 'nested',
    name: 'Nested',
    icon: WindowsOutlined,
    children: [
      {
        title: '菜单 1',
        path: 'menu1',
        name: 'Menu1',
        children: [
          {
            title: '菜单 1-1',
            path: 'menu1-1',
            name: 'Menu1-1',
          },
          {
            title: '菜单 1-2',
            path: 'menu1-2',
            name: 'Menu1-2',
            children: [
              {
                title: '菜单 1-2-1',
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
              },
              {
                title: '菜单 1-2-2',
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
              }
            ]
          },
          {
            title: '菜单 1-3',
            path: 'menu1-3',
            name: 'Menu1-3',
          }
        ]
      },
      {
        title: '菜单 2',
        path: 'menu2',
        name: 'Menu2',
      }
    ]
  }
]

export default menuData
