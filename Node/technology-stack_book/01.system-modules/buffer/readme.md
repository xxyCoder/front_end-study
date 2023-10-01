# Buffer
- 用于读取或操作二进制数据流
- 作为nodejs的API无需require
- 由Buffer需要处理的是大量的二进制数据，会造成频繁向系统内存申请空间，故Buffer所占用的空间不再由V8分配，而是在nodejs的C++层完成申请，在JS中内存分配，这部分又称之为堆外内存

## Buffer内存分配原理
- nodejs采用了slab机制进行预先申请、事后分配

## Buffer VS Cache
- 缓冲是用于处理二进制数据的，将数据暂存，临时性的
- 缓存是将热点数据存储，以便访问速度加快