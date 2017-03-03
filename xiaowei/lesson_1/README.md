# 任务一: 零基础 HTML 编码

## 任务目的
- 了解HTML的定义、概念、发展简史
- 掌握常用HTML标签的含义、用法
- 能够基于设计稿来合理规划HTML文档结构
- 理解语义化，合理地使用HTML标签来构建页面

## 任务描述
- 完成一个HTML页面代码编写（不写CSS，不需要关注样式，只关注文档结构）

## 资料
- [Web相关名词通俗解释](https://www.zhihu.com/question/22689579)
- [MDN HTML入门](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Introduction)
- [慕课HTML+CSS基础教程视频](http://www.imooc.com/learn/9)

***

## 笔记
### 基础
1. HTML 是一种标记语言（markup language）。它告诉浏览器如何显示内容。其是网页的基础，规定了网页的结构骨架。
2. HTML由不同元素的集合组成。元素定义了它们所包含内容的语义。
    - 以下是一个网页的基本结构，其是一个树形的层次化结构，称之为 DOM: Document Object Model--文档对象模型
    ```html
    <html>
      <head>
        <title></title>
      </head>
      <body>

      </body>
    </html>
    ```
3. 元素由一对标签组成（起始标签和结束标签，特例：自闭合标签）。
4. 起始标签中可包含元素的属性。
```html
<input required> <!-- <input required=""> <input required> -->
<p class="foo">  <!-- <p class=foo> -->
```
5. HTML不区分大小写。
6. 一个HTML文档一定需要在第一行做出文档类型声明(doctype declaration)。
```html
<!DOCTYPE html>
```
7. HTML中使用特殊符号：
    - &gt; 表示大于符号">" (>)
    - &lt; 表示小于符号"<" (<)
    - &amp; 表示和符号"and"(&)
    - &quot; 表示引用符号" (")

### 元素
[元素详解](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
