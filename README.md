# code
好用的代码积累 <br>
(主要是记录平时开发中遇到的比较通用的代码，包括js、css、html。说明中的demo代码都是经过压缩打包过的，具体源码请参考src文件夹中对应的文件)

## 目录
<details>
<summary>### 一、js</summary>

1. [字符串模板](https://github.com/zwl-jasmine95/codes#1%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%A8%A1%E6%9D%BF) <br>
<small>解决获取数据渲染页面时拼接很长字符串的问题</small>
[模板字符串demo](https://zwl-jasmine95.github.io/codes/dist/1-1.html)

2. [基于jquery的简单轮播](https://github.com/zwl-jasmine95/codes#2%E5%9F%BA%E4%BA%8Ejquery%E7%9A%84%E7%AE%80%E5%8D%95%E8%BD%AE%E6%92%AD) 
[轮播图demo](https://zwl-jasmine95.github.io/codes/dist/1-2.html)

</details>


<details>
<summary>### 二、css</summary>

</details>


<details>
<summary>### 三、html</summary>

</details>
---

> ## 一、js
### 1.字符串模板
主要是为了解决：获取数据渲染页面时拼接很长字符串的问题

#### 方法一
```js
function tpl(html, data) {
    return document.querySelector(html).innerHTML.replace(/{{\w+}}/g, str => {
        let prop = str.replace(/(\{\{)|(\}\})/g, '')
        return data[prop] || ''
    })
}
```
使用方法：
1. 在html中定义模板

```html
<template class="list">
    <li class="list-item">
        <p>{{name}}</p>
        <a href="{{url}}">{{urlName}}</a>
    </li>
</template>
```

2. 在js中获取数据后替换掉模板中的变量

```js
let _html = ''
res.forEach(d => {
    _html += tpl('.list',{
        name:d.name,
        url:d.url,
        urlName:d.tip
    })
})
$('.list-box-1').append(_html)
```

#### 方法二 使用es6模板字符串

```js
_html += `
    <li class="list-item">
        <p>${d.name}</p>
        <a href="${d.url}">${d.tip}</a>
    </li>
`
```
将html用``包裹，并将其中的数据替换成${变量}的形式。


---

### 2.基于jQuery的简单轮播
封装一个方法实现简单轮播，可以是纯图片的轮播，也可以是其他内容的轮播。直接使用ES5开发，可以任意使用。

html：

```html
<div class="content">
    <div class="round-box">
        <ul>
            <li>任意内容1</li>
            <li>任意内容2</li>
            <li>任意内容3</li>
        </ul>
    </div>
</div>
<!-- 最外层div的class名可以任意定义。 -->
```

<details>
<summary>css</summary>

```css
/* 公共样式 */
.round-box{
    width: 100%;
    overflow: hidden;
    position: relative;

    >ul{
        list-style: none;
        padding: 0;
        width: max-content;
        position: absolute;
        clear: both;
        overflow: auto;

        >li{
            float: left;
            height: 100%;
        }
    }

    .circle{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;

        >div{
            width: 12px;
            height: 6px;
            display: inline-block;
            border: 1px solid #EDEDED;
            border-radius: 100px;
            margin: 0 2px;
            &.circle-active{
                background-image: linear-gradient(-137deg, #F78D0A 0%, #EB5404 100%);
                border: 1px solid #F78D0A;
            }
        }
    }
}
/* 必须自定义的样式 */
$width:300px;
.content{
    width: $width;
    .round-box{
        height: 60px;
        ul{
            li{
                width: $width;
            }
        }
    }
}
```
</details>

<br>

<details>
<summary>重点！封装的js</summary>

```js
/**
 * 基于jquery的轮播
 * @param {DOM} $obj 轮播区最外层DOM元素
 * @param {string||number} speed 滑动速度 （'slow','normal','fast' || 数字）
 * @param {number} wait 暂停时间（ms）
 */
function round($obj,speed,wait){
    var speed = speed || 2000, wait = wait || 2000

    var $el = $obj.find('.round-box'), $ul = $el.find('ul'), $li = $ul.find('li')
    var len = $li.length, $circle = '', index = 1,width = $li.width()
    
    var _first = $li.eq(0).clone()
    $ul.append(_first)

    createCircle()

    function createCircle(){
        var _html = ''
        for(var i=0; i<len; i++){
            _html += '<div></div>'
        }
        $el.append('<div class="circle">' + _html + '</div>')
        $circle = $el.find('.circle div')
        $circle.eq(0).addClass('circle-active')
    }

    function slider(){
        if(index <= len && !$ul.is(':animated')){
            $circle.eq(index).addClass('circle-active').siblings().removeClass('circle-active')
            $ul.animate({left : '-=' + width},speed,function(){
                if(Math.round($ul.position().left) === - len * width){
                    $ul.css('left',0)
                    index = 1
                    $circle.eq(0).addClass('circle-active').siblings().removeClass('circle-active')
                }
            })
            index++
        }
    }
    setInterval(slider,wait)
}
```
</details>


使用时直接调用：
```js
round($('.content'))
```
