import {
  action,
  observable
} from 'mobx-miniprogram';

export const store = observable({
  // 数据字段
  num1: 1,
  num2: 2,
  // 计算属性
  get sum() {
    return this.num1 + this.num2;
  },
  // 方法
  // action专门修改store数据的值
  addNum1: action(function (payload) {
    this.num1 += payload;
  }),
  addNum2: action(function (payload) {
    this.num2 += payload;
  })
})