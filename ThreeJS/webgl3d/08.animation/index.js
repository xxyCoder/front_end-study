import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建三维场景
const scene = new THREE.Scene();
// 给三维场景添加物品
// 创建一个几何体 长宽高为100
const geometry = new THREE.BoxGeometry(100, 100, 100);
// 创建一个材质对象
const material = new THREE.MeshLambertMaterial();
// 创建一个网格模型
const mesh = new THREE.Mesh(geometry, material);
// 定义位置 X Y Z
mesh.position.set(0, 10, 0);
// 添加到场景
scene.add(mesh);

// 设置画布尺寸
const width = window.innerWidth;
const height = window.innerHeight;
// 创建一个相机 设置相机的四个参数
const cemare = new THREE.PerspectiveCamera(30, width / height, 0.1, 2000);
// 设置相机位置
cemare.position.set(200, 200, 200);
// 相机的视线 观察目标点的坐标
// cemare.lookAt(0, 0, 0)
cemare.lookAt(mesh.position)    // 指向网格模型

// 创建一个三维坐标轴
const axesHepler = new THREE.AxesHelper(150);
// 坐标轴对象添加
scene.add(axesHepler);

// 创建一个光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
// 点光源位置
pointLight.position.set(400, 100, 100)
// 添加到场景
// scene.add(pointLight);

// 可视化点光源
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// 添加环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambient);

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(50, 100, 60)
// 默认目标对象是原点
// directionalLight.target = mesh;
scene.add(directionalLight);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// 避免模糊问题
renderer.setPixelRatio(window.devicePixelRatio)
// 执行渲染，类比相机拍照
renderer.render(scene, cemare)
// 把渲染结果添加到网页页面
document.body.append(renderer.domElement);

// 周期性执行，理想状态下每分钟60次
function render() {
    mesh.rotateY(0.01);
    // “拍照” 更新画布内容
    renderer.render(scene, cemare);
    requestAnimationFrame(render);
}
render();

// 创建相机控件对象
// 监控那个相机，监控范围
const controls = new OrbitControls(cemare, renderer.domElement)
// 改变了相机位置，那么需要重新渲染
controls.addEventListener('change', function () {
    renderer.render(scene, cemare)
})

// 同步页面宽高
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    cemare.aspect = window.innerWidth / window.innerHeight;
    cemare.updateProjectionMatrix();
}