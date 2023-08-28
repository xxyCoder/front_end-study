import * as THREE from 'three';
// 创建三维场景
const scene = new THREE.Scene();
// 给三维场景添加物品
// 创建一个几何体 长宽高为100
const geometry = new THREE.BoxGeometry(100, 100, 100);
// 创建一个材质对象
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
});
// 创建一个网格模型
const mesh = new THREE.Mesh(geometry, material);
// 定义位置 X Y Z
mesh.position.set(0, 10, 0);
// 添加到场景
scene.add(mesh);

// 设置画布尺寸
const width = 800;
const height = 500;
// 创建一个相机 设置相机的四个参数
const cemare = new THREE.PerspectiveCamera(30, width / height, 0.1, 2000);
// 设置相机位置
cemare.position.set(200, 200, 200);
// 相机的视线 观察目标点的坐标
// cemare.lookAt(0, 0, 0)
cemare.lookAt(mesh.position)    // 指向网格模型