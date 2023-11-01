Page({
  data: {
    username: "xxyCoder",
    company: "BYTEDANCE"
  },
  goToTabBar() {
    wx.switchTab({
      url: '/pages/logs/logs'
    })
  },
  gotoText() {
    wx.navigateTo({
      url: '/pages/text/text',
    })
  },
  goBack() {
    wx.navigateBack();
  },
  onPullDownRefresh() {
    console.log("fresh");
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    console.log("到达底部");
  }
})