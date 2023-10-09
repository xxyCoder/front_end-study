# indexedDB
- 浏览器提供的本地服务器，可以被网页脚本创建和操作
- 与传统数据库最大的区别是indexedDB是对象存储而不是表格存储
- 允许存储大量数据、提供查找接口、建立索引，但不属于关系型数据库（不支持增删改查）
- 键值对存储，主键是独一无二的，有重复则报错
- 异步
- 支持事务
- 同源限制
- 支持二进制存储
- 每个域名（协议+域名+端口）都可以任意新建多个数据库
- 有版本概念，同一个时刻只能有一个版本的数据库存在

## open
- 第一次打开数据库，会先触发upgradeneeded事件
  - 然后触发success事件
  - 或者触发error事件

## 事务
- 创建了对象存储之后，剩下操作都是通过事务完成
- 第一个参数
  - 如果不指定参数，表示所有对象存储都只有只读权限
  - 如果想要访问多个，则传入数组
- 第二个参数，修改访问模式
  - readonly
  - readwrite
  - versionchange

## 索引
- creatIndex()
  - 第一个参数索引名
  - 第二个参数索引属性的名称
  - 第三个参数是包含unique键和options对象

## IDBRequest对象
- 数据操作都是通过该对象完成
- 其操作都是异步

## IDBDatabase对象
- 当IDBRequest对象打开成功，可以从IDBRequest对象中拿到result属性，得到IDBDatabase对象
- close()   关闭数据库连接，实际会等事务完成
- createObjectStore()   创建存放数据的对象仓库
- transaction() 返回一个IDBTransaction对象

## IDBObjectStore对象
- add() 向对象仓库添加数据
- put() 向对象仓库更新数据
- clear()   删除所有记录
- delete()  删除指定主键记录
- count()   计算记录数量
- getKey()  获取主键
- get() 获取主键对应记录
- getAll()  获取全部
- index()   返回索引对象
- createIndex() 创建索引
- deleteIndex() 删除索引
- openCursor()  获取指针对象，遍历数据
- openKeyCursor()   获取主键指针对象
- 通过onsuccess和onerror判断操作是否成功

## IDBTransaction对象
- 用来操作异步数据库事务

## IDBCursor对象
- openCursor()  创建游标
  - 第二个参数传入 
    - nextunique会跳过重复的记录
    - prev表示从后往前遍历
    - prevunique表示从后往前遍历并且跳过重复的记录    
- key   返回当前记录的键
- value 返回当前记录的对象
- advance(n)    指针向前移动n个位置
- continue(key)    指针向前移动一个位置
  - 指定了key，则移动到key的索引位置
- delete()  删除当前位置的记录
- update()  更新当前位置的记录

## 问题
- 存在并发问题，如果两个不同的浏览器页面同时打开同一个网页，则有可能出现一个网页尝试升级而另一个尚未就绪
- 不能跨域共享