# code
好用的代码积累

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

```
_html += `
    <li class="list-item">
        <p>${d.name}</p>
        <a href="${d.url}">${d.tip}</a>
    </li>
`
```
将html用``包裹，并将其中的数据替换成${变量}的形式。

[模板字符串demo](https://zwl-jasmine95.github.io/codes/dist/1-1.html)