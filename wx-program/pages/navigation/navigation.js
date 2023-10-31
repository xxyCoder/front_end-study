Page({
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
  }
})