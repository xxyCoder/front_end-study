// pages/dataAndEvent/dataAndEvent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "Hello xxyCoder",
    count: 0,
    msg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onClick(event) {
    console.log(this);
  },
  onInput(event) {
    console.log("input: ", event.detail);
    this.setData({
      msg: event.detail.value
    })
  },
  addCount(event) {
    this.setData({
      count: this.data.count + 1
    });
  },
  btnHandler(event) {
    console.log(event.target);
    const {
      cnt
    } = event.target.dataset;
    this.setData({
      count: this.data.count + cnt
    })
  }
})