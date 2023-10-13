# 常见埋点方案
- 代码埋点
  - 以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或以某种数据形式发送给服务器端
  - 优点是可以在任意时刻，精确的发送或保存所需信息
  - 缺点是工作量大
- 可视化埋点
  - 通过可视化交互的手段
  - 代替手工埋点
- 无痕埋点
  - 前端的任意一个事件都被绑定一个标识，所有事件都被记录下来，通过定期上传记录文件，配合文件解析
  - 优点是采集全量数据，不会漏埋和误埋
  - 缺点是给服务器增加压力


# 输入URL开始发生
1. 卸载旧页面
2. 重定向
   1. redirectStart
   2. redirectEnd
3. 读取缓存
   1. fetchStart开始获取文档
4. DNS
   1. domainLookupStart开始域名解析
   2. domainLookupEnd结束域名解析
5. TCP网络连接
   1. connectStart开始连接
   2. secureConnectionStart加密连接
   3. connectEnd结束连接
6. Request请求
   1. requestStart开始请求
   2. requestEnd结束请求
7. Response响应
   1. responseStart开始响应
   2. responseEnd结束响应
8. unloadEventStart卸载旧页面开始
9. unloadEventEnd卸载旧页面结束
10. Processing处理
   1. domLoading开始解析DOM
   2. domInteractive DOM结构解析完成
   3. domContentLoadedEventStart DOMContentLoad事件开始
   4. domContentLoadedEventEnd    DOMContentLoad事件结束
   5. domComplete   DOM资源解析完成
   6. loadEventStart    开始load回调函数开始
   7. loadEventEnd  开始load回调函数结束


# 名词
- FP(first paint)  首次渲染（首先将像素绘制到屏幕的时间）
- FCP(first content paint) 首次内容绘制（第一个DOM元素渲染到页面的时间）
- FMP(first meaningful paint) 首页有意义绘制
- LCP(largest contentful paint) 最大内容的渲染
- DCL(dom content load) DOM加载完成
- L(onload) 
- TTI(time to interactive) 可交互时间
- FID(first input delay)   首次输入延迟