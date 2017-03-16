# css: 常用的元素居中方法

日常工作中常常会遇到元素居中的需求，通常块级元素的水平居中只需左右margin设为auto即可。
而行间元素的居中则是由父级设置行高(等于父级高度)和 text-align(center)实现。
但是如果要求是块级元素水平垂直居中呢？本文总结了一些常用的元素水平垂直居中方法。

## absolute
### 1. 定位实现居中(需计算偏移值)
```html
<div class="absolute_p1">
  <div class="absolute_c1"></div>
</div>
```
```css
.absolute_p1 {
  position: relative;

  width: 200px; height: 200px;
}
.absolute_p1 .absolute_c1 {
  position: absolute; /* fixed 同理 */
  left: 50%;          top: 50%;

  width: 100px;       height: 100px;
  margin-left: -50px; margin-top: -50px;  /* 需根据宽高计算偏移量 */
}
```
- 原理: 通过定位使元素左上角居中，再通过偏移值margin调整使元素中心居中
- 缺点：高度宽度需事先知道，得通过其来计算负margin(好烦)

### 2. 定位实现居中(不需计算偏移值)
```html
<div class="absolute_p2">
  <div class="absolute_c2"></div>
</div>
```
```css
.absolute_p2 {
  position: relative;

  width: 200px; height: 200px;
}
.absolute_p2 .absolute_c2 {
  position: absolute; /* fixed 同理 */
  left: 0; top: 0; bottom: 0; right: 0; /* 定位为 0 */

  width: 100px; height: 100px;
  margin: auto; /* 不用计算偏移量 */
}
```
- 原理: 原理我也不知道啊！估计定位都给0了，元素自己也不知道该去哪儿，只好待在原地不知所措...

### 3. 定位实现居中(不需计算偏移值)
```html
<div class="absolute_p3">
  <div class="absolute_c3"></div>
</div>
```
```css
.absolute_p3 {
  position: relative;

  width: 200px; height: 200px;
}
.absolute_p3 .absolute_c3 {
  position: absolute; /* fixed 同理 */
  left: 50%; top: 50%;

  width: 100px; height: 100px;
  transform: translate(-50%, -50%);
}
```
- 原理: 通过定位使元素左上角居中，再通过 translate 位移元素使之中心居中，由于 translate 支持百分比，所以也就不用自己算偏移量了
- 缺点: ie 就别想用了

***

## table
```html
<div class="table_p1">
    <div class="inner">
        <div class="table_c1"></div>
    </div>
</div>
```
```css
.table_p1 {
    display: table;

    width: 200px; height: 200px;
}
.table_p1 .inner {
    display: table-cell;

    vertical-align: middle;
    text-align: center;
}
.table_p1 .table_c1 {
    display: inline-block;

    width: 100px; height: 100px;
}
```
- 原理: 通过 table-cell 的特性实现居中（table-cell的子元素应为行间元素）
    - table-cell 比较适合图片墙这类布局
- 缺点:
    - ie ...
    - 用了这就和 margin/float/absolute 说拜拜吧
    - 太麻烦

***

## inline
```html
<div class="inline_p1">
  <div class="inline_c1"> </div>
</div>
```
```css
.inline_p1 {
    width: 200px; height: 200px;

    text-align: center;
    line-height: 200px; /* 行间元素的垂直居中 */
}
.inline_p1 .inline_c1 {
    display: inline;
    font-size: 0; /* 通过内容撑开宽高 */
    padding: 50px;
}
```
- 原理: 行间元素的居中方法
- 缺点: 不灵活

***

## 伪元素
```html
<div class="before_p1">
  <div class="before_c1"> </div>
</div>
```
```css
.before_p1 {
    width: 200px; height: 200px;

    font-size: 0; /* 必须要设置 */
}
.before_p1::before {
    display: inline-block;

    content: '';
    height: 100%;
    vertical-align: middle;
}
.before_p1 .before_c1 {
    display: inline-block;

    width: 100px; height: 100px;

    vertical-align: middle;
}
```
- 原理: 通过伪元素(高度100%)为参照使 .before_c1 垂直居中
- 要点: .before_p1 的 font-size，需设为 0，否则内部会由于伪元素的 content 大小而产生偏移
    - 所以 .before_c1 中有文字时，需另设 font-size
- 缺点: 太麻烦，为了居中而居中

***

## box flexbox
### 1. box 1
```html
<div class="box_p1">
  <div class="box_c1"> </div>
</div>
```
```css
.box_p1 {
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;

    width: 200px;
    height: 200px;
}
.box_p1 .box_c1 {
    width: 100px;
    height: 100px;
}
```
- 缺点: 改用 flex 吧

### box 2
```html
<div class="box_p2">
  <div class="box_c2"> </div>
</div>
```
```css
.box_p2 {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: 200px;
}
.box_p2 .box_c2 {
    width: 100px;
    height: 100px;
}
```
- 缺点: 除了兼容性还有其他缺点么？

***

- [demo预览](http://htmlpreview.github.io/?https://github.com/Away0x/baidu_fe/blob/master/xiaowei/lesson_4/demo.html)
- [demo代码](https://github.com/Away0x/baidu_fe/blob/master/xiaowei/lesson_4/demo.html)
- [笔记](https://github.com/Away0x/baidu_fe/tree/master/xiaowei/lesson_4)
