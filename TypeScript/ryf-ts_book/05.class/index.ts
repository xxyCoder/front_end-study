// 顶层声明
class Point {
    _x: number;
    _y: number;
    readonly z: number = -1;
    readonly p: number;
    constructor(x: number, y: number) {
        this.p = -1;
        this.z = 0;
        this._x = x;
        this._y = y;
    }
    [propName: string]: number | (() => number);
    get x() {
        return this._x;
    }
    set x(_x: number) {
        this._x = _x;
    }
    f() {
        return 1;
    }
}
// 类的接口
interface Country1 {
    name: string;
}
type Country2 = {
    capital: string;
}
class MyCountry implements Country1, Country2 {
    name: string;
    capital: string;
}
// 类的合并
class A {
    x: number = 1;
}
interface A {
    y: number;
}
let a = new A();
a.y = 10;
// 类的自身
function createPoint(
    PointClass: new (x: number, y: number) => Point,
    x: number,
    y: number
) {
    return new PointClass(x, y);
}
// 结构类型原则
class Foo {
    id: number;
    static x: number;
    constructor(id: number) { }
    // private a: number;
}
class Bar {
    id: number;
    name: string;
    // private a: number;
}
const bar: Foo = new Bar();
