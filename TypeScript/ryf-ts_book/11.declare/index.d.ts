declare let x: number;
declare function sayHello(name: string): void
// 其后面不能带有function的具体实现
declare class Animal {
    public static s0(): string;
    public static s1: string;
    private name: string;
    constructor(name: string);
    eat(): void;
    sleep(): void;
}
// 其后面不能带有class的具体实现

declare namespace AnimalLib {
    class Animal { }
    type Animals = "Dot" | "Cat"
}

declare enum E {

}

export { };

declare global {
    interface String {
        toSmallString(): string;
    }
}
