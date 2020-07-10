import React, {useEffect, useState} from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Space, Tag, Menu, Dropdown } from 'antd';
import router from '@/router'

import './index.scss'

import { addVisitedView, delVisitedView, delOthersVisitedViews, delAllVisitedViews } from "@/store/modules/tagsView/action";
import { getterVisitedViews, getterActiveRoute } from "@/store/getters";

const TagsView = React.memo(props => {

  console.log(router.getFlatMenuData())

  // 右键时的tag信息
  const [ contextMenuTag, setContextMenuTag ] = useState({})

  const {
    location,
    history ,
    visitedViews,
    addVisitedView,
    delVisitedView,
    delOthersVisitedViews,
    delAllVisitedViews
  } = props;

  const flatMenuData = router.getFlatMenuData()

  // 初始化 默认显示 tagsView的tag有哪些。 meta.affix = true 的 tagsView 中默认是永远显示的
  useEffect(() => {
    const affixTags = flatMenuData.filter(route => route.meta && route.meta.affix).map(route => ({
      path: route.path,
      name: route.name,
      meta: { ...route.meta }
    }))
    for(let tag of affixTags) {
      addVisitedView(tag)
    }
  }, [])

  // 选择一个菜单项，tagsView 中增加当前菜单的 tag
  useEffect(() => {
    const route = flatMenuData.find(route => route.path === location.pathname)
    if(route && route.path === location.pathname) {
      addVisitedView({
        path: route.path,
        name: route.name,
        meta: { ...route.meta }
      })
    }
  }, [location.pathname])

  // 点击 tag
  const handleClick = route => {
    if(location.pathname === route.path) return
    history.push(route.path);
  }

  // Close
  const handleClose = route => {
    delVisitedView(route.path)
    //如果 删除的正是我当前点击close或X的tag，否则
    if(route.path === location.pathname) {
      // [].pop()  === undefined
      const lastRoute = visitedViews.filter(view => route.path !== view.path).pop()
      if(lastRoute) history.push(lastRoute.path)
    }
  }

  // Close Other
  const handleCloseOther = route => {
    delOthersVisitedViews(route)
    history.push(contextMenuTag.path)
  }

  // Close All
  const handleCloseAll = () => {
    delAllVisitedViews()
    const lastAffixViews = visitedViews.filter(view => view.meta && view.meta.affix).pop();
    // 显示 必显示的 最后一个，如没有 则 '/'
    if(lastAffixViews) {
      history.push(lastAffixViews.path)
    } else {
      history.push('/')
    }
  }

  // 右键
  const handleContextMenu = ({ key }) => {
    switch (key) {
      case 'refresh':
        console.log('refresh')
        break;
      case 'close':
        handleClose(contextMenuTag)
        break;
      case 'closeOthers':
        handleCloseOther(contextMenuTag)
        break;
      case 'closeAll':
        handleCloseAll()
        break;
      default:
        return
    }
  }

  // ContextMenu 部分，按钮组
  const menu = (
    <Menu onClick={ handleContextMenu }>
      <Menu.Item key="refresh">Refresh</Menu.Item>
      { !(contextMenuTag.meta && contextMenuTag.meta.affix) && <Menu.Item key="close">Close</Menu.Item>}
      <Menu.Item key="closeOthers">Close Others</Menu.Item>
      <Menu.Item key="closeAll">Close All</Menu.Item>
    </Menu>
  );

  return <Space className='tags-view'>
    {
      visitedViews.map(view => <Dropdown
        key={ view.path }
        overlay={ menu }
        trigger={['contextMenu']}
      >
        <Tag
          color={ view.path === location.pathname ? '#55acee' : 'default' }
          closable={ !(view.meta && view.meta.affix) }
          onClose={ () => handleClose(view) }
          onClick={ () => handleClick(view) }
          onContextMenu={() => setContextMenuTag(view)}
        >
          { view.title }
        </Tag>
      </Dropdown>)
    }
  </Space>
})

const mapStateToProps = state => ({
  visitedViews: getterVisitedViews(state),
})
const mapDispatchToProps = {
  addVisitedView,
  delVisitedView,
  delOthersVisitedViews,
  delAllVisitedViews
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsView))
