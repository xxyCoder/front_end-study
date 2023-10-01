# indexedDB
- 浏览器提供的本地服务器，可以被网页脚本创建和操作
- 允许存储大量数据、提供查找接口、建立索引，但不属于关系型数据库（不支持增删改查）
- 键值对存储，主键是独一无二的，有重复则报错
- 异步
- 支持事务
- 同源限制
- 支持二进制存储

## open
- 第一次打开数据库，会先触发upgradeneeded事件，然后触发success事件

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

## IDBTransaction对象
- 用来操作异步数据库事务

## IDBCursor对象
- key   返回当前记录的主键
- value 返回当前记录的值
- advance(n)    指针向前移动n个位置
- continue()    指针向前移动一个位置
- delete()  删除当前位置的记录
- update()  更新当前位置的记录