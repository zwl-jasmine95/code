import '../sass/1-2.scss'

$(function(){
    round($('.content'))
})

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
            if(index == len){

                $circle.eq(0).addClass('circle-active').siblings().removeClass('circle-active')
            }else{

                $circle.eq(index).addClass('circle-active').siblings().removeClass('circle-active')
            }
            $ul.animate({left : '-=' + width},speed,function(){
                if(Math.round($ul.position().left) === - len * width){
                    $ul.css('left',0)
                    index = 1
                    // $circle.eq(0).addClass('circle-active').siblings().removeClass('circle-active')
                }
            })
            index++
        }
    }
    setInterval(slider,wait)
}