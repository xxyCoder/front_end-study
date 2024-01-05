function simpleDecorator(value: any, context: any) {
    if (context.kind === "class") {
        value.prototype.sayHi = function () {
            console.log("Hi");
        }
    } else {
        return class extends value {
            constructor(...args: any[]) {
                super(...args);
            }
            sayHi() {
                console.log("Hi");
            }
        }
    }
}

@simpleDecorator
class A { }
function customElement(name: string) {
    return <Input extends new (...args: any) => any>(
        value: Input,
        context: ClassDecoratorContext
    ) => {
        context.addInitializer(function () {
            customElements.define(name, value);
        });
    };
}

@customElement("hello-world")
class MyComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `<h1>Hello World</h1>`;
    }
}

function bound(
    originalMethod: any, context: ClassMethodDecoratorContext
) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`不能绑定私有方法 ${methodName as string}`);
    }
    context.addInitializer(function (this: any) {
        this[methodName] = this[methodName].bind(this);
    });
}
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    @bound
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

function delay(milliseconds: number = 0) {  // 延迟执行函数
    return function (value, context) {
        if (context.kind === "method") {
            return function (...args: any[]) {
                setTimeout(() => {
                    value.apply(this, args);
                }, milliseconds);
            };
        }
    };
}

class Logger {
    @delay(1000)
    log(msg: string) {
        console.log(`${msg}`);
    }
}

// 属性装饰器要么不返回值，要么返回一个函数，该函数会自动执行，用来对所装饰属性进行初始化
function logged(value, context) {
    const { kind, name } = context;
    if (kind === 'field') {
        return function (initialValue) {
            console.log(`initializing ${name} with value ${initialValue}`);
            return initialValue;
        };
    }
}

class Color {
    @logged name = 'green';
}