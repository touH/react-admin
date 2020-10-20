import menuData from './menu.config'
import {join} from "path";
import { isUrl } from '@/utils/common/regexp'
import { constantRouters, appRouters  } from './router.config'

/**
 * @description 对 menuData 菜单进行处理，生成一个新的菜单信息
 * @param data              menuData
 * @param parentPath        父级的path
 * @param parentAuthority   父级的权限
 */
function formatter(data, parentPath='/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    // 是否是 url 地址
    if (!isUrl(path)) {
      path = join(parentPath, item.path)
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };

    if (item.children) {
      result.children = formatter(item.children, path, item.authority);
    }
    return result;
  });
}

// 将递归菜单 拉平
function getFlatMenuData(menus) {
  let flatMenuData = [];
  menus.forEach(item => {
    if(item.children) {
      flatMenuData = [...flatMenuData, item, ...getFlatMenuData(item.children)]
    } else {
      flatMenuData.push(item)
    }
  })
  return flatMenuData
}

class Router {

  // 对于应用 app 的公共前缀
  baseName = '/app'

  // 导出所有菜单
  getMenuData() {
    return formatter(menuData, this.baseName)
  }

  // 导出所有拉平菜单
  getFlatMenuData() {
    return getFlatMenuData(this.getMenuData())
  }

  // 导出所有 常规 路由
  getConstantRouterData() {
    return constantRouters
  }
  // 导出所有 菜单 应用路由
  getAppRouterData() {
    // 将 菜单数据 拉平，扁平化
    const menuData = getFlatMenuData(this.getMenuData())

    return appRouters.map(router => {
      const path = join(this.baseName, router.path)
      /*
       1. 菜单路径和路由路径相匹配 得到菜单信息。
       2. 不匹配 {}
       */
      const menuItem = menuData.find(item => {
        return item.path === path
      }) || {};
      return {
        ...router,
        path,
        name: router.name || menuItem.name,
        title: router.title || menuItem.title,
        authority: router.authority || menuItem.authority,
      }
    })
  }
  // 导出所有路由信息
  getRouterData() {
    return [...this.getConstantRouterData(), ...this.getAppRouterData()]
  }

  // 对于当前路径，返回所有匹配的菜单 matches
  // 因为如果是没有权限的菜单，直接就是 403 了，所以执行 __recursive(menuData) 就不改了， 按理这个 menuData 应该是做过处理后的有权限菜单，不能是初始化时静态写死的菜单
  getMatchRoutes(path) {
    let matches = [];
    const __recursive = data => {
      data.forEach(menuItem => {
        // 有匹配
        if(path.indexOf(menuItem.path) !== -1) {
          matches.push(menuItem)
          if(menuItem.children) {
            __recursive(menuItem.children)
          }
        }
      })
    }
    __recursive(this.getMenuData())
    return matches
  }
}

export default new Router()
