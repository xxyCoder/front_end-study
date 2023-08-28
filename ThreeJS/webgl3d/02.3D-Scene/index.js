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