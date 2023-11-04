const myBehavior = require("../../behavior/my-behavior");
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings';
import {
  store
} from '../../store/index';
// components/test/test.js
Component({
  behaviors: [myBehavior, storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      num1: () => store.num1, // 数据绑定方式一
      num2: () => store.num2,
      sum: "sum" // 数据绑定方式二
    },
    actions: {
      addNum1: "addNum1",
      addNum2: "addNum2"
    }
  },
  options: {
    pureDataPattern: /^_/,
    multipleSlots: true
  },
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
    sum: 0,
    _fullColor: "0,0,0"
  },
  lifetimes: {
    created() {
      console.log("create");
    },
    attached() {
      console.log("attached");
    },
    ready() {
      console.log("ready");
    },
    moved() {
      console.log("move");
    },
    detached() {
      console.log("detached")
    }
  },
  pageLifetimes: {
    show() {
      console.log("page show");
    },
    hide() {
      console.log("page hide");
    },
    resize() {
      console.log("page resize");
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updateNum1(e) {
      this.addNum1(e.target.dataset.payload);
    },
    updateNum2(e) {
      this.addNum2(e.target.dataset.payload)
    },
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
    },
    modifyParentData() {
      console.log("modify");
      this.triggerEvent("update", {
        payload: this.data.sum
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