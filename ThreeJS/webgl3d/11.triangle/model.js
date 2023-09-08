import * as THREE from 'three';

// 创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();
// 类型化数组定义的一组顶点坐标数据
const vertices = new Float32Array([
    0, 0, 0,
    50, 0, 0,
    0, 100, 0,
    0, 0, 10,
    0, 0, 100,
    50, 0, 10
]);

// 3个为一组
const attribute = new THREE.BufferAttribute(vertices, 3);

// 设置几何体的顶点位置属性
geometry.attributes.position = attribute;

// 线材质
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.BackSide    // 设置背面可见
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;