/**
 * 时间格式化
 */
export default class DateFmt {
  /**
   * fmt yyyy-MM-dd hh:mm:ss
   * date Date()
   * @returns {Promise<any>}
   */
  static fmt (fmt, date, ampm = false) {
    const o = {
      'M+': date.getMonth() + 1,     // 月份
      'd+': date.getDate(),     // 日
      'h+': date.getHours(),     // 小时
      'm+': date.getMinutes(),     // 分
      's+': date.getSeconds(),     // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()    // 毫秒
    }
    let suffix
    if (ampm) {
      if (o['h+'] > 12) {
        o['h+'] -= 12
        suffix = 'PM'
      } else {
        suffix = 'AM'
      }
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    if (ampm) {
      fmt += suffix
    }
    return fmt
  }
}
