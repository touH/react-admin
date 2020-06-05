import { createActions } from 'redux-actions';
import { message } from 'antd';
import { getToken, setToken, removeToken } from '@/utils/token'

//api
import { request_login } from '@/api/user'

export const { login } = createActions({
  LOGIN: ({ username, password }) => {
    return new Promise((resolve, reject) => {
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
        reject(error)
      })
    })
  },
}, 'SET_LOGIN_OUT');
