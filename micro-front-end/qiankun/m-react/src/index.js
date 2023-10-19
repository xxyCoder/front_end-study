import './public-path.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root;
function render(props) {
  const container = props.container;

  root = ReactDOM.createRoot(container ? container.querySelector("#root") : document.getElementById("root"));
  root.render(
    <App />
  );
}

// qiankun提供一些标识表示当前应用是否在父应用中引用过
if (!window.__POWERED_BY_QIANKUN__) {
  render({}); // 独立调用render
}

// qiankun要求导出的是umd格式

export async function bootstrap(props) {
  console.log(props);
}

export async function mount(props) {
  console.log(props);
  render(props);
}

export async function unmount(props) {
  root.unmount();
}