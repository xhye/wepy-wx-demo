const domains = {
  development: 'http://192.168.101.69:8080/api/', // 开发api接口
  production: 'http://192.168.101.69:8080/api/' // 生产api接口
}
export const domain = domains[process.env.NODE_ENV]
export const name = 'wepy-wx-demo' // 项目名
export const buried = { // 埋点用
  open: true,
  routerMaps: {
    'pages/index/index': '首页'
  }
}
