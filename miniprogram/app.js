//app.js
App({
  onLaunch: function () {
    console.log('app launch')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "mpdev-yangyang",
        traceUser: true,
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then(res => {
        // 实现自动登录功能
        let db = wx.cloud.database()
        db.collection('users').where({
          _openid: res.result.openid
        }).get().then((res) => {
          if (res.data.length) {
            this.userInfo = Object.assign(this.userInfo, res.data[0]);
            this.isLogged = true
            wx.showToast({
              title: `${this.userInfo.nickName} 欢迎回来~`,
              icon: 'none'
            })
          } else {
            this.isLogged = false
          }
        })
      })
    }
  },
  isLogged: false,
  userInfo: {},
  userMessage: [],
  toRefresh: false,
  isDeleted: false
})