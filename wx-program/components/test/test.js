// components/test/test.js
Component({

  /**
   * 组件的属性列表，接收外部传递给组件的属性
   */
  properties: {
    maxCount: {
      type: Number,
      value: 10 // 默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    n1: 0,
    n2: 0,
    sum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      console.log(this.data === this.properties);
      if (this.data.count < this.properties.maxCount) {
        this.setData({
          count: this.data.count + 1
        });
      }
    },
    addN1() {
      this.setData({
        n1: this.data.n1 + 1
      });
    },
    addN2() {
      this.setData({
        n2: this.data.n2 + 1
      });
    }
  },
  /**
   * 监听器
   */
  observers: {
    "n1, n2": function (n1, n2) {
      this.setData({
        sum: n1 + n2
      });
    }
  }
})