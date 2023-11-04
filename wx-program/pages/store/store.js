import {
  createStoreBindings
} from "mobx-miniprogram-bindings";
import {
  store
} from '../../store/index.js'

// pages/store/store.js
Page({
  data: {

  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["num1", "num2", "sum"],
      actions: ["addNum1", "addNum2"]
    })
  },
  updateNum1(e) {
    this.addNum1(e.target.dataset.payload);
  },
  updateNum2(e) {
    this.addNum2(e.target.dataset.payload)
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})