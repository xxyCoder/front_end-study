# 泛型
- 使用注意点
  - 尽量少使用
  - 参数类型越少越好，多一个参数多一次替换

## 类型运算符
- keyof：接受一个对象作为参数，返回该对象的所有键名联合类型
  - 对于联合类型，返回公共属性
  - 对于元组或数组，返回所有键名以及继承的键名
  - 对于交叉类型，返回所有成员所有键名
- in：用来取出联合类型的每一个成员类型
- []：用来取出对象的键值类型，参数如果是联合类型，那么返回的也是联合类型键的值，返回不存在属性则报错
- extends...? : 条件运算符，如果需要判断是联合类型，那么条件运算符会展开这个联合类型，如果不希望展开，则需要将extends两侧的操作数放在[]中
  ```ts
  (A | B) extends U ? X : Y => A extends U ? X : Y | B extends U ? X : Y 
  ```
- infer：推断类型参数，用在extends关键字后面的父类型中
- is：函数返回布尔值的时候可以使用，限定返回值与参数之间的关系
- 模版字符串，内部可以引用其他类型（string、number、bigint、boolean、null、undefined）
- satisfies：用来检查某个值是否符合指定类型，只对类型进行判断不改变ts对类型的推导

## 映射修饰符
- +
  - +? 或 +readonly 表示添加可选或只读
- -
  - -? 或 -readonly 表示删除可选或只读
- +? 和 -?都需要写在属性名后面

## 键名重映射
- as 新类型, 新类型通常是模版字符串，可以对原始键名进行各种操作
- 还可以进行过滤 as ... extends ? :

## 类型工具
- Awaited<T> 用来取出Promise（即时有多重）的返回类型
- ConstructorParameters<T> 提取构造方法的T，组成一个元组返回
- Exclude<UnionType, ExcludeMembers> 从联合类型中删除某些类型，组成一个新类型返回
- Extract<UnionType, Union> 用来从联合类型中提取指定类型，组成新类型返回
- InstanceType<T> 用来返回构造函数的返回类型
- NonNullable<T> 用来从联合类型T中删除null和undefined类型
- Pick<T, K>从对象中挑出指定的key组成新类型返回
- Omit<T, K>从对象中删除指定的key组成新类型返回