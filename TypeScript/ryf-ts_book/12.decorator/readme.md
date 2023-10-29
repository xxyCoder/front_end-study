# 装饰器
- @function 接收所修饰对象的一些相关值作为参数，可以没有返回值，如果有返回值返回一个新对象取代所修饰的目标对象
- 装饰器一般只用来为类添加某种特定行为
- experimentalDecorators需要打开

## 装饰器结构
```ts
type Decorator = (
  value: DecoratedValue,
  context: {
    kind: string;
    name: string | symbol;
    addInitializer?(initializer: () => void): void;
    static?: boolean;
    private?: boolean;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
  }
) => void | ReplacementValue;
```
- value是修饰的对象
- addInitializer在类完全定义结束后执行，用来定义一个类的初始化函数
- static表示所修饰的是否是静态
- name方法名或对象名