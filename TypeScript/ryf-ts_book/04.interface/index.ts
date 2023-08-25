interface Shape {
    name: string;
}
interface Style {
    color: string;
}
// 多重接口继承
interface Circle extends Shape, Style {
    radius: number;
}
// 继承type
type Country = {
    name: string;
    capital: string;
};
interface CountryWihtPop extends Country {
    population: number
}
// 继承class
class A {
    // private a: string = "";
    x: string = "";
    y(): boolean {
        return true;
    }
}
interface B extends A {
    z: number
}
const b: B = {
    // a: "xxx",
    x: "xxx",
    y(): boolean {
        return true;
    },
    z: 1
}