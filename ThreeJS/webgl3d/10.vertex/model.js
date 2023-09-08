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

// 点材质
// const material = new THREE.PointsMaterial({
//     color: 0xffff00,
//     size: 10
// });
// 点模型对象
// const points = new THREE.Points(geometry, material);

// export default points


// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0xffff00
});
const line = new THREE.Line(geometry, material);
export default line;