import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {}

  /**
   * 跳转小程序
   * @param appId
   * @param url
   * @param params
   */
  navigateToMiniProgram (appId, url, params = {}) {
    wepy.navigateToMiniProgram({
      appId: appId,
      path: `${url}?id=123`,
      extraData: params,
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('跳转小程序成功：', res)
      },
      fail(err) {
        console.log('跳转小程序s失败：', err)
      }
    })
  }
}
