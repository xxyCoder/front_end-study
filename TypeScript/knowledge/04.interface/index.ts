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
// 继承class带有私有属性
class X {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    intro() {
        console.log(`my name is ${this.name}`);
    }
    private print() {
        console.log(this.name);
    }
}
interface xx extends X {
    show(message: string): void;
}
class Y extends X {
    show(message: string) {
        console.log(message);
    }
}

const y: xx = new Y("xxyCoder");

export {}