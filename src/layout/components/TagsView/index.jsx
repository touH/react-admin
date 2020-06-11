import React, {useEffect} from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Space, Tag } from 'antd';

import './index.scss'

import { getterExpandMenuRoutes } from "@/store/getters";
import { addVisitedView } from "@/store/modules/tagsView/action";
import { getterVisitedViews } from "@/store/getters";

const TagsView = React.memo(props => {

  const { expandMenuRoutes, addVisitedView, visitedViews, location, history } = props;

  // 初始化 默认显示 tagsView的tag有哪些。 meta.affix = true 的 tagsView 中默认是永远显示的
  useEffect(() => {
    const affixTags = expandMenuRoutes.filter(route => route.meta && route.meta.affix).map(route => ({
      path: route.path,
      name: route.name,
      meta: { ...route.meta }
    }))
    for(let tag of affixTags) {
      addVisitedView(tag)
    }
  }, [])

  useEffect(() => {
    const route = expandMenuRoutes.find(route => route.path === location.pathname)
    console.log(props)
    addVisitedView({
      path: route.path,
      name: route.name,
      meta: { ...route.meta }
    })
  }, [location.pathname])

  const handleClose = v => {
    console.log(v)
  }

  const handleClick = route => {
    if(location.pathname === route.path) return
    history.push(route.path);
  }
  return <Space className='tags-view'>
    {
      visitedViews.map(view => <Tag
        key={ view.path }
        color="#55acee"
        closable={ !(view.meta && view.meta.affix) }
        onClose={ () => handleClose(view) }
        onClick={ () => handleClick(view) }
      >
        { view.meta && view.meta.title }
      </Tag>)
    }
  </Space>
})

const mapStateToProps = state => ({
  expandMenuRoutes: getterExpandMenuRoutes(state),
  visitedViews: getterVisitedViews(state)
})
const mapDispatchToProps = {
  addVisitedView
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsView))
