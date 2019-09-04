import wepy from 'wepy'

/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false
    this.pause = false
  }

  static success(title, duration = 500) {
    wepy.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    })
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  static modal(text, title = '') {
    return new Promise((resolve, reject) => {
      wepy.showModal({
        title: title,
        content: text,
        showCancel: false,
        confirmColor: '#ff6900',
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }

  static confirm(text, title = '', cancelText = '取消', confirmText = '确定') {
    return new Promise((resolve, reject) => {
      wepy.showModal({
        title: title,
        content: text,
        showCancel: true,
        confirmColor: '#ff6900',
        cancelText: cancelText,
        confirmText: confirmText,
        success: res => {
          if (res.confirm) {
            resolve('ok')
          } else if (res.cancel) {
            resolve(null)
          }
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }

  static toast(title, onHide, icon = 'none') {
    wepy.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 1000
    })
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static alert(title, image) {
    wepy.showToast({
      title: title,
      image: image,
      mask: true,
      duration: 500
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  static error(title, onHide) {
    wepy.showToast({
      title: title,
      image: '/images/error.png',
      mask: true,
      duration: 1000
    })
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    if (wepy.showLoading) {
      wepy.showLoading({
        title: title,
        mask: true
      })
    }
  }

  static navLoading() {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wepy.showNavigationBarLoading()
  }

  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false
      // if (Tips.hideLoading) {
      wepy.hideLoading()
      wepy.hideNavigationBarLoading()
      // }
    }
  }

  static action(...items) {
    return new Promise((resolve, reject) => {
      wepy.showActionSheet({
        itemList: items,
        itemColor: '#A53334',
        success: function(res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          }
          resolve(result)
        },
        fail: function(res) {
          reject(res.errMsg)
        }
      })
    })
  }

  static actionWithFunc(items, color, ...functions) {
    wepy.showActionSheet({
      itemList: items,
      itemColor: color,
      success: function(res) {
        const index = res.tapIndex
        if (index >= 0 && index < functions.length) {
          functions[index]()
        }
      }
    })
  }

  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function(res) {
        Tips.toast('分享成功')
      }
    }
  }

  static setLoading() {
    Tips.isLoading = true
  }
}
Tips.isLoading = false
