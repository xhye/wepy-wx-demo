import { domain } from '../config'
import Tips from '../utils/tips'
import wepy from 'wepy'
export default class Http {
  static Get(url, { load = true, loadMsg = '加载中...', header = {} }) {
    return request('GET', url, {}, load, loadMsg, header)
  }

  static Post(url, body = {}, { load = true, loadMsg = '加载中...', header = {} }) {
    return request('POST', url, body, load, loadMsg, header)
  }
}

function request(method, url, params = {}, load, loadMsg, header) {
  // AccessToken数据，如不需要请删除
  // const authInfo = wepy.$instance.globalData.authInfo
  const finalUrl = !url.startsWith('http') ? domain + url : url
  const finalHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'accessToken': wepy.getStorageSync('accessToken'),
    ...header
  }
  if (load !== undefined && load) {
    Tips.loading(loadMsg)
  }
  // return wepy.request({
  //   url: finalUrl,
  //   method: method,
  //   data: params,
  //   header: finalHeader
  //   // ,
  //   // success: (res) => {
  //   //   resolve(res.data)
  //   // },
  //   // fail: (err) => {
  //   //   reject(err)
  //   // },
  //   // complete: () => load && Tips.loaded()
  // })
  return new Promise((resolve, reject) => { // 不能开启 this.use('promisify')
    wepy.request({
      url: finalUrl,
      method: method,
      data: params,
      header: finalHeader,
      // dataType: 'json',
      success: (res) => {
        if (res.data.code === '00006') {
          wx.removeStorageSync('userInfo')
          wx.removeStorageSync('accessToken')
          wx.removeStorageSync('reflashToken')
          wepy.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            success: function() {
              wepy.removeStorageSync('user')
              wepy.reLaunch({
                url: '/pages/publicLegalServices/index'
              })
            }
          })
        } else {
          resolve(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => load && Tips.loaded()
    })
  })
}
