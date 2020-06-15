import { createActions } from 'redux-actions';
import { message } from 'antd';
import { setToken, removeToken } from '@/utils/token'

//api
`import { request_login, request_getInfo } from '@/services/user'

export const { login, getInfo, resetToken } = createActions({
  LOGIN: async ({ username, password }) => {
    return new Promise(resolve => {
      request_login({ username, password }).then(res => {
        const { data } = res;
        if(data.success) {
          // 1. 在 cookie 中设置 token   2. reducer 中保存 token
          setToken(data.data.token);
          resolve({
            token: data.data.token
          })
        } else {
          message.error(data.message);
        }
      }).catch(error => {
        console.log(error)
      })
    })
  },
  GET_INFO: async token => new Promise(resolve => {
    request_getInfo(token).then(res => {
      let { data } = res;
      if(data.success) {
        resolve({
          roles: data.data.roles,
          admin: data.data
        })
      } else {
        message.error(data.message);
      }
    })
  }).catch(error => {
    console.log(error)
  }),
  RESET_TOKEN: () => new Promise(resolve => {
    removeToken()
    resolve()
  })
});
