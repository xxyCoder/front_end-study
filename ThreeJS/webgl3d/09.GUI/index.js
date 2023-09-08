import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const gui = new GUI();
gui.domElement.style.right = "0px"
gui.domElement.style.width = "300px"



const obj = {
    x: 30,
    color: 0x00ffff,
    scale: 0,
    checked: false
}
// 创建子菜单
const mat = gui.addFolder('材质')
// 增加交互界面 改变对象中某个属性在某个范围
mat
    .add(obj, 'x', 0, 100)
    .name("obj.x")  // 交互界面名字
    .step(0.2)  // 拖动步长
    .onChange(function (value) {
        console.log(value)
    })
// 默认是打开的，可以关闭
mat.close();

gui
    .addColor(obj, 'color')
    .onChange(function (value) {
        console.log(value);
    })

// 参数为数组
gui
    .add(obj, 'scale', [-100, 0, 100])
    .onChange(function (value) {
        console.log(value)
    })

gui
    .add(obj, 'checked')