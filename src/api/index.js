import http from '../utils/http'

export default {
  // 测试 post
  login(body, op = {}) {
    return http.Post('login', body, op)
  },
  // 测试 get
  logout(body, op = {}) {
    return http.Get(body.url, op)
  }
}
