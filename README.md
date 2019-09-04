# 微信小程序模版项目
## Build Setup

``` bash
# install wepy-cli for gloabl (or use yarn)
npm install wepy-cli -g

# install dependencies
npm install

# serve with hot reload
npm run dev

# build for production with minification
npm run build
```

``` bash
#Vant UI使用方法
# 1.在页面config配置组件
config = {
  usingComponents: {
    'van-button': '../../components/vant/button/index'
  }
}
# 2.在template下面直接使用
<van-button size="large" type="primary">按钮</van-button>
```
## Vant UI详细配置请看官网
<a href="https://youzan.github.io/vant-weapp/#/intro">Vant UI https://youzan.github.io/vant-weapp/#/intro</a>
## Docs
<a href="https://shimo.im/docs/bvQYtoiteGwAWPX3/ ">微信小程序模版说明文档</a><br>

## 参考
<a href="https://developers.weixin.qq.com/miniprogram/dev/">小程序官方文档: https://developers.weixin.qq.com/miniprogram/dev/</a><br>
<a href="https://tencent.github.io/wepy/document.html">wepy文档: https://tencent.github.io/wepy/document.html</a>
