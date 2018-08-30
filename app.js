//app.js
App({
    onLaunch: function () {
        var that = this;
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs) 

        wx.request({
            url: 'https://api.it120.cc/' + that.globalData.subDomain + '/config/get-value',
            data: {
                key: 'mallName'
            },
            success: function (res) {
                console.log(res);
                wx.setStorageSync('mallName', res.data.data.value);
            }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        subDomain: "mall"
    }
})