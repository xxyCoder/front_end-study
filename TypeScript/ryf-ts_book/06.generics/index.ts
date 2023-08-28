function getFirst<T>(arr: T[]): T {
    return arr[0];
}
// 隐式推断
getFirst([1, 2, 3])

function comb<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.concat(arr2);
}
// 无法推断，显示给出
comb<string | number>([1, 2, 3], ['a', 'b'])
// 多类型参数
function map<T, U>(
    arr: T[],
    f: (args: T) => U
): U[] {
    return arr.map(f);
}
map([1, 2, 3], (n) => n * 2.1)
// 变量类型定义
function id<T>(args: T): T {
    return args;
}
let myId_1: <T>(args: T) => T = id;
let myId_2: { <T>(args: T): T } = id;