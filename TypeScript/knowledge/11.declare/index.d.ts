declare let x: number

declare function sayHello(name: string): void;

declare class Animal {
  private name: string;
  constructor(name: string);
  eat(): void;
}

declare namespace AnimalLib {
  export type Animals = "Cat" | "Dog";
}

declare module "io" {
  export function readFile(filename: string): string;
}

// 为外部模块添加属性和方法，给出新增部分的描述
declare module "moduleA" {
  interface Foo {
    custom: {
      prop: string
    }
  }
}