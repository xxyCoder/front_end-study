# 微前端
- 就是将不同的功能按照不同的维度拆分成多个子应用，通过主应用来加载这些子应用

## 实现方案
- iframe
  - 加载子应用
  - 通过postMessage通信
  - 但是用户体验差，内部刷新丢失状态
- Web Component
  - 基于CustomEvent实现通信
  - 但是兼容性差，有学习成本
- single-spa
  - 通过路由劫持实现应用的加载（采用SystemJS）
  - 子应用需要固定暴露bootstrap、mount、unmount钩子接入协议
  - 基于props通信