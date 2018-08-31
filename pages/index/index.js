//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        swiperCurrent: 0,
        images: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        categories: [],
        activeCategoryId: 0,
        scrollTop: "0",
    },
    swiperchange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    tabClick: function(e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        })
    },
    scroll: function (e) {
        console.log(e);
        var that = this, scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        })
        console.log('scrollTop:'+scrollTop)
    },
    onLoad: function() {
        var that = this;

        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
            success: function(res) {
                var categories = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    categories.push(res.data.data[i]);
                }
                categories.push({ id: 1, name: '123' })
                categories.push({ id: 2, name: '123' })
                categories.push({ id: 3, name: '123' })
                categories.push({ id: 4, name: '123' })
                categories.push({ id: 5, name: '123' })
                categories.push({ id: 6, name: '123' })
                console.log(categories)
                that.setData({
                    categories: categories,
                    activeCategoryId: res.data.data[0].id
                });
                that.getGoodsList(that.data.activeCategoryId);
            }
        })
    },
    getGoodsList: function(categoryId) {
        var that = this;
        var initimg = ['../../images/goods-index/baby.jpg',
        '../../images/goods-index/puxiang.jpg',
        '../../images/goods-index/pidai.jpg',
        '../../images/goods-index/shangpu.jpg',
        '../../images/goods-index/yifu.jpg']
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
            data: {
                categoryId: categoryId
            },
            success: function(res) {
                that.setData({
                    goods: [],
                    loadingMoreHidden: true
                });
                var goods = [];
                if (res.data.code != 0 || res.data.data.length == 0) {
                    that.setData({
                        loadingMoreHidden: false,
                    });
                    return;
                }
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].pic = initimg[i];
                    goods.push(res.data.data[i]);
                }
                that.setData({
                    goods: goods,
                });
            }
        })
    }
})