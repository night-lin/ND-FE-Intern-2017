window.onload = function () {
  function setTips (str) {
    $('#tips').innerHTML = str
  }
  setTips('请按下鼠标 选中要拖动的对象')
  setPosition($('#list1'))
  setPosition($('#list2'))
  // 定义拖放对象
  var dragPara = {
    dragFlag: false,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0
  }

  // 鼠标按下时可拖放元素
  function setPosition (ele) {
    var lis = ele.getElementsByTagName('li')
    if (lis.length > 0) {
      for (var i = 0; i < lis.length; i++) {
        if (window.getComputedStyle) {
          var style = window.getComputedStyle(lis[i], null)    // 非IE
        } else {
          var style = lis[i].currentStyle  // IE
        }

        lis[i].style.top = i * parseInt(style.height) + 'px'
        lis[i].style.left = 0 + 'px'
      }
      ele.style.height = (i + 1) * parseInt(style.height) + 'px'
    }
  }

  $.delegate('#list1', 'li', 'mousedown', dragAllow)
  $.delegate('#list2', 'li', 'mousedown', dragAllow)

  function dragAllow (event) {
    // 确定要拖放的对象和对象的坐标
    setTips('请拖动对象到目标地点并释放鼠标')
    dragPara.dragFlag = true
    // 这里的ev触发对象是被按下的元素
    var ev = event || window.event
    var target = ev.target
    dragPara.left = target.offsetLeft || 0
    dragPara.top = target.offsetTop || 0
    dragPara.currentX = ev.clientX
    dragPara.currentY = ev.clientY
   // console.log(dragPara)
    function bindDrag (event) {
      // ev是鼠标按下事件 event是鼠标移动事件
      drag(ev, event)
    }
    function bindStop (event) {
      // ev是鼠标按下事件 event是鼠标移动事件
      dragStop(ev, event)
      removeEvent(document, 'mousemove', bindDrag)
      removeEvent(document, 'mouseup', bindStop)
    }
    addEvent(document, 'mousemove', bindDrag)
    addEvent(document, 'mouseup', bindStop)

  //  drag(event)
  }

  function dragStop (eventDrag, eventMove) {
    // 判定结束后 拖放元素离哪个框更近
    var evMove = eventMove
    var evDrag = eventDrag
    var target = evDrag.target
    // 获取鼠标释放时的位置
   // console.log(getPosition(target))
    var x = evMove.clientX
    var x1 = getPosition($('#list1')).x
    var x2 = getPosition($('#list2')).x
    function subAbs (a, b) {
      if (a > b) {
        return a - b
      } else {
        return b - a
      }
    }
    console.log('元素框1的位置:' + x1 + ' ' + '元素框2的位置:' + x2)
    console.log('拖放的释放位置:' + x)
    var disL = subAbs(parseInt(x), parseInt(x1))
    var disR = subAbs(parseInt(x), parseInt(x2))
    var node = target

    if (disL < disR) {
      // 离左边近则添加到左边
      $('#list1 ul').appendChild(node)
      setPosition($('#list1'))
      setPosition($('#list2'))
    } else {
      // 添加到右边
      $('#list2 ul').appendChild(node)
      setPosition($('#list1'))
      setPosition($('#list2'))
    }
    setTips('拖放完成 请重新选择一个元素')
    dragPara.dragFlag = false
  }

  function drag (eventDrag, eventMove) {
    if (dragPara.dragFlag === true) {
      var evMove = eventMove
      var evDrag = eventDrag
      var target = evDrag.target

      // 获取鼠标当前坐标和第一次鼠标位置的差值
      var distanceX = evMove.clientX - dragPara.currentX
      var distanceY = evMove.clientY - dragPara.currentY
      target.style.left = parseInt(dragPara.left) + distanceX + 'px'
      target.style.top = parseInt(dragPara.top) + distanceY + 'px'
    } else { return false }
  }
}
