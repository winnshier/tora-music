import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { baseUrl } from '../config'


interface CookieProps {
  name: string,
  value: string,
  expires: string,
  path: string
}
interface headerProps {
  'Set-Cookie': string
}
interface SetCookieProps {
  cookies: CookieProps[],
  header: headerProps
}

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string,
      data?: object | string,
      method?: any,
      header: object,
      success: any,
      // error: any,
      fail: any,
      xhrFields: object,
    }
    const setCookie = (res: SetCookieProps): void => {
      if (res.cookies?.length > 0) {
        let cookies = ''
        res.cookies.forEach((cookie, idx) => {
          if (cookie.name && cookie.value) {
            cookies += idx === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie};`
          }
        })
        Taro.setStorageSync('cookies', cookies)
      }
      if (res.header?.['Set-Cookie']) {
        Taro.setStorageSync('cookies', res.header['Set-Cookie'])
      }
    }
    const options: OptionType = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      xhrFields: { withCredentials: true },
      success(res) {
        setCookie(res)
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return ShowToast('请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return ShowToast('服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return ShowToast('没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          // Taro.clearStorage()
          // Taro.navigateTo({
          //   url: '/pages/login/index'
          // })
          return ShowToast('请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      fail(e) {
        console.log(e);
      }
    }
    return Taro.request(options)
  },
  get(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data?: object, contentType?: string) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}

function ShowToast(text: string) {
  Taro.showToast({
    title: text,
    duration: 2000
  })
}
