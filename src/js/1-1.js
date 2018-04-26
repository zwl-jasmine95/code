// start
function tpl(html, data) {
    return document.querySelector(html).innerHTML.replace(/{{\w+}}/g, str => {
        let prop = str.replace(/(\{\{)|(\}\})/g, '')
        return data[prop] || ''
    })
}
// end

$(function(){
    getList()
})

function getList(){
    let data = new Promise((res,rej) => {
        let d = [{
            name:'百度一下',
            url:'http://www.baidu.com',
            tip:'百度'
        },{
            name:'ES6',
            url:'http://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2',
            tip:'模板字符串'
        },]
        res(d)
    })
    
    // 1.function实现模板字符串
    data.then((res) => {
        let _html = ''
        res.forEach(d => {
            _html += tpl('.list',{
                name:d.name,
                url:d.url,
                urlName:d.tip
            })
        })
        $('.list-box-1').append(_html)
    })

    // 2.ES6模板字符串
    data.then((res) => {
        let _html = ''
        res.forEach(d => {
            _html += `
                <li class="list-item">
                    <p>${d.name}</p>
                    <a href="${d.url}">${d.tip}</a>
                </li>
            `
        })
        $('.list-box-2').append(_html)
    })
}