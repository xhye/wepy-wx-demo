import Tips from './tips'
import Api from '../api'

/**
 * 人脸识别工具类
 */
export default class Face {
  /**
   * 检查是否支持人脸识别并拉起人脸识别
   * params {userId: 用户主键，name: 姓名，idCard: 身份证}
   * 用法： 1.后台有律师身份传 userId 无需传name和idCard 2.后台无律师身份传name和idCard ，无需传 userId
   * @returns {Promise<any>}
   */
  static checkIsSupportFaceAndStartFace(params) {
    // 当前用户主键
    return new Promise(resolve => {
      wx.checkIsSupportFacialRecognition({
        checkAliveType: 2, // 自己动检测识别类型
        success: async res => {
          // 支持
          console.log(res)
          const op = {}
          op.defFail = false
          op.load = true
          Api.getFaceKeyByUserId(params, op).then(res => {
            const userIdKey = res.data
            if (!userIdKey) {
              Tips.modal('系统异常，请稍后重试', '提示')
              resolve(false)
            } else {
              this.startFacialRecognition(userIdKey).then(res => {
                if (res) {
                  Tips.success('识别成功', 1500)
                } else {
                  Tips.modal('识别失败', '提示')
                }
                resolve(res)
              })
            }
          })
        },
        fail: async res => {
          // 不支持
          console.log(res)
          Tips.modal('你的手机不支持人脸识别', '提示')
          resolve(false)
        },
        complete: async res => {
          console.log(res)
        }
      })
    })
  }

  /**
   * 开始人脸识别
   * @param userIdKey 人脸识别 userIdKey
   * @returns {Promise<any>}
   */
  static startFacialRecognition(userIdKey) {
    return new Promise((resolve, reject) => {
      wx.startFacialRecognitionVerify({
        userIdKey: userIdKey,
        checkAliveType: 2, // 自己动检测识别类型
        success: async ({ verifyResult }) => { // verifyResult识别凭证 可用于获取人脸识别图片
          wx.setStorageSync('verifyResult', verifyResult)
          const op = {}
          op.defFail = false
          op.load = true
          // Api.getFaceVerifyResultPic(verifyResult, op)
          resolve(true)
        },
        fail: async res => {
          console.log(res)
          Tips.toast('人脸识别失败')
          resolve(false)
        },
        complete: async res => {
          console.log(res)
        }
      })
    })
  }
}


