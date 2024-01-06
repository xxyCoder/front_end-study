// 为js原生对象添加属性和方法
declare global {
  interface String {
    toSmallString(): string;
  }
}

String.prototype.toSmallString = (): string => {
  return "small";
}

export {}