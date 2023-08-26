import { foo as bar } from './module-1';
import defaultFunction from './module-1'
import { default as func } from './module-1'
// 简便方式
import _, { foo } from './module-1'
// import { "f" + "oo" } from './module-1'
console.log("foo", bar);
setTimeout(console.log, 2000, bar);
defaultFunction();
func();
// 复合写法
export { foo } from './module-1'
// 动态加载
import('./module-1')
    .then(module => {
        console.log("module", module);
    })
    .catch(err => {
        console.log("fail", err);
    })