# postcss构建过程
1. 调用postcss()函数，得到一个Processor对象
2. 调用buildCliConfig()函数，构建options和plugins
  - 从cli命令中拿到use，使用promise.all依次导入所有插件
3. resolve之后进入then方法 
   - 根据此次命令构建一个task，包括要处理的文件和配置项
4. 进入第二个then方法
   - 将cwd和 -o给的文件名进行路径拼接
   - 根据绝对路径，从缓存cache数组中查找，没找到则读取文件内容，并缓存在cache数组
   - 将读到数据给css作为参数并调用
     - 寻找配置文件，前缀名默认为"postcss“，按照package.json、postcss.rc（等）、postcss.config.js（等）去查找文件位置，查找成功的则读取内容，拿到配置项
     - 根据配置项和输入文件绝对路径，调用processResult()方法，拿到plugins、file（配置文件绝对路径）
     - 再次调用postcss方法，并将拿到的plugins传入
     - 调用process方法
       - 对输入文件内容调用Parse解析
       - 对输入文件内容依次调用Plugin
     - 最后调用stringfier产生新的css并将最终结果写到指定位置