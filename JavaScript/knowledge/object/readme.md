# 对象
- js所有对象都继承Object

## Object
- Object()本身是一个函数，将任意值转换为对象，如果值本身是函数则总返回该值本身
- new Object()语义是生成一个新对象
- 静态方法
  - keys()返回一个数组，成员是对象自身（非继承）可枚举的所有属性名
  - getOwnPropertyNames()同上，区别是也返回不可枚举的属性
  - defineProperty()
  - defineProperties()
  - preventExtensions()防止对象扩展（无法添加新属性） isExtensible()判断是否可扩展
  - seal()禁止对象配置（无法添加新属性也不能删除就属性） isSeal()判断是否可以配置
  - freeze()冻结对象（无法添加新数据、不能删除旧属性和修改值） isFrozen()判断一个对象是否被冻结
  - create()指定原型，返回新对象
  - getPrototypeOf()返回对象Prototype对象
- 实例方法，定义在Object.prototype
  - valueOf()返回对象的值
  - toString()返回对象字符串形式
  - hasOwnProperty()判断某个属性是否为当前自身属性
  - isPrototypeOf()判断当前对象是否是另一个对象的原型
  - propertyIsEnumerable()判断某个属性是否可枚举

## 包装对象
- 数字、字符串、布尔值在一定条件下会自动转换为对象
- 原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例，自动转换生成的包装对象是只读的，无法修改
  - 也就是说给原始类型添加新属性是无效的

## Boolean
- undefined、null、0、''、false、NaN转为布尔都是false
- 使用双重！也可以转换为布尔类型
- 使用new Boolean()的构造函数需谨慎，返回一个对象而不是包装

## Number
- 二进制前方添加0b，八进制前方添加0o
- 允许使用_作为分隔符，不能放在数值最前方或最后面；不能连着两个或两个以上分隔符；小数点后不能有分隔符；指数e前不能有；
- 静态属性
  - NaN
  - MIN_VALUE 最小的正数
  - MAX_SAFE_INTEGER 能够精准表示的最大整数
  - MIN_SAFE_INTEGER 能够精准表示的最小整数
  - EPSILON极小的常量，判断浮点数误差
- 静态方法
  - isNaN()
  - isFinite() 是否有限，参数不是数值一律返回false
  - 以上和传统方法的区别在于，传统方法会对参数使用Number转换后再进行判断，该静态方法只对数值有效
  - parseInt() parseFloat()
    - 将全局方法移动到Number，行为不变
  - isInteger()判断是否是整数
    - 整数和浮点数采用同样的存储方法，所以25.0和25都是整数
  - tunc() 去除小数，返回整数
  - cbrt() 立方根
- 实例方法
  - toString() 将数值转换为字符串形式
  - toFixed() 将一个数转为指定位数的小数（有效范围为0到100，超出这个范围将抛出 RangeError 错误），然后返回这个小数对应的字符串，由于浮点数的原因，小数5的四舍五入是不确定的
  - toExponential()将一个数转换科学计数法形式
  - toPrecision() 将一个数转换为指定位数的有效数字

## bigInt
- 大整数，没有位数限制，该数据类型后面需要添加n
- BigInt()和Number类似，将参数变为大整数
- 静态方法
  - asUintN(width, bigInt) 给定的BigInt转换为0 到 2^width - 1之间对应的值
  - asIntN()给定的bigInt转换为-2^width 到 2^width-1之间对应的值
  - parseInt(str[,radix]) 将字符串转换为指定进制的bigInt
- 使用一元+报错，不能和普通数值进行混合运算

## String
- 静态方法
  - fromCharCode() 该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串
  - fromCodePoint() 同上，区别是可以识别码点大雨0xffff的字符
  - raw() 还原原生string对象
- 实例方法
  - charCodeAt(pos) 返回字符串指定位置的 Unicode 码点（十进制表示）
  - codePointAt() 同上，可以处理4个字节存储的字符
  - concat(...str) 连接多个字符串，返回一个新字符串，不改变原字符串
  - slice(start, end)
  - indexOf(str) 一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置，没有则返回-1
  - lastIndexOf() 同上，返回最后一次出现的
  - trim() 删除左右的空格，返回一个新字符串，不改变原字符串
  - trimStart() trimEnd()
  - toLowerCase() 转为小写
  - toUpperCase() 转为大写
  - match(str|regex) 用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串，返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串
  - search(str|regex) 等同于match，但是返回是位置
  - replace(old|regex, newStr) 替换第一个匹配到的，除非使用带有g修饰的正则
  - replaceAll() 同上，区别是全部替换
    - regex必须携带g符号，否则报错
  - split(str|regex, ?cnt) 根据str对字符串进行分割，接受第二个参数限定返回的组数
  - localeCompare(str1, str2)比较两个字符串，返回一个整数，小于0 => str1 < str2，等于0 => str1 = str2，大于0 => str1 > str2
  - includes() 返回布尔表示是否找到字符串参数
  - startsWith() 返回布尔表示是否在原字符串开头找到
  - endsWith() 返回布尔表示是否在原字符串末尾找到
  - repeat(cnt) 重复cnt次数，小数字向下取整，负数或者无穷则报错
  - padStart(len, str) 头部补齐
  - padEnd(len, str) 尾部补齐

## Date
- 以国际标准时间1970年1月1日00:00:00作为时间的零点
- 普通函数用法Date()，返回当前时间的字符串，即使带有参数也不会影响返回
- 构造函数用法new Date((year, month, day, hour, min, sec, mil) | str | number)，返回一个Date对象的实例，不加参数则返回当前时间，作为数值运算返回毫秒数
  - Date实例对象有个特殊的地方，其他对象求值的时候默认调用.valueOf()，但是Date求值调用.toString()
  - 参数可以是负数，表示1970年之前的时间
  - 能被Date.parse()解析的字符串都可以作为参数
  - 使用年月日等多个参数等时候至少需要两个参数，不然使用一个参数会作为numebr参数，月的表示是从0开始，超出范围则自动折算为下一个
- 静态方法
  - now()返回当前时间距离时间零点的毫秒数
  - parse()解析日期字符串，返回该时间距离时间零点的毫秒数
- 实例方法
  - getTime()返回距离时间零点的毫秒数
  - getDate()返回实例对象的日期
  - getDay()返回星期几
  - getFullYear()返回四位的年份
  - getMonth()返回月份，从0开始计算
  - getHours()返回小时
  - getMilliseconds()返回毫秒
  - getMinutes()返回分钟
  - getSeconds()返回秒
  - set* 同上，对应设置，设置的时候可以设置更低的参数，如设置年的时候还可以设置月、日等

## Regex
- 实例属性
  - ignoreCase 表示是否设置了i
  - global 表示是否设置了g
  - multiline 表示是否设置了m
  - flags 返回设置了的字符，按字母排序
- 实例方法
  - test() 返回布尔值，表示是否匹配成功
  - exec() 返回一个数组，组成员是匹配成功的子字符串和组匹配的成员，还包含两个属性input和index（模式匹配成功的位置）
    - 和字符串的match相似，区别在于携带标识符g的时候，match一次性返回

## JSON
- 复合类型只能是数组或对象
- 简单类型只能是数字、字符串、布尔和null
- 必须使用双引号，最后一个成员不能加逗号
- 静态方法
  - stringify()将一个值转换为JSON字符串，不符合要求的数据会被过滤，在数组中则被转换为null；忽略不可枚举属性
    - 第二个参数接受一个数组表示哪些对象属性需要被转换，也可以是函数对值进行改变
    - 第三个参数用于增加可读性
    - 对象有toJSON方法，则JSON.stringify()方法会使用toJSON的返回值作为参数
  - parse()对JSON进行解析