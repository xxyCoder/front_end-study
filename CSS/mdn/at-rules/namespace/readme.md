# namespace
- 定义XML如何在CSS中使用
- 语法
```css
@namespace url(XML-namespace-URL);
@namespace "XML-namespace-URL";
/* prefixed namepsace */
@namespace prefix url(XML-namespace-URL)
@namespace prefix "XML-namespace-URL"
```
- prefix是可选的命名空间前缀
```css
prefix|selector {}
```
- 可以使用命名空间前缀限定选择器的作用范围