window.onload = function () {
  /* 1. JavaScript数据类型及语言基础 */
  console.log('1. JavaScript数据类型及语言基础')
  /* 1.1实践判断各种数据类型的方法 */
  /* js六大数据类型：number、string、object、Boolean、null、undefined 可由typeof判断类型 */
  /* 判断数组 方法1.通过instanceof和constroctur判断,存在跨页面问题:比如在一个页面中有一个子页面，在子页面声明array并赋值给
  父页面变量时，判断Array == object.constructur 返回的是false,因为array属于引用型数据，在传递过程中，仅仅是引用地址的传递，而每个页面array的原生对象引用的地址不一样
  方法2.通过isArray判断，存在属性检测方式问题；
  综合，采用如下方法
  */
  console.log('1.1 数组和函数类型判断')
  var a = [1, 2, '22']
  function isArray (arr) {
    // return (a instanceof(Array))
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
  console.log(isArray(a))
  /* 判断函数 同上 */
  var b = function () {

  }
  function isFunction (fn) {
    // return (a instanceof(Array))
    return Object.prototype.toString.call(fn) === '[object Function]'
  }
  console.log(isFunction(b))

  /* 1.2了解值类型和引用类型的区别，了解各种对象的读取、遍历方式 */
  /* 值类型包括Undefined、Null、Boolean、Number和String
 值类型保存在栈，操作的就是实际对象本身；
 引用类型是保存在堆内存中的对象，通过地址进行访问，操作的也是对实际对象的引用
 在函数传参时，都是按值传递，即执行复制：值类型的复制就是复制一个数值，引用类型的复制复制的就是变量的地址
 举个例子:
 function setName(obj){
    obj.name = "2"   //obj复制了obj1指向的变量的地址，不是按引用传递
    obj = new Object()
    obj.name = "3" //如果是按照引用传递，那么此时obj1指向的对象应该被销毁了
  }
  var obj1 = new Object()
  obj1.name ="1"
  setName(obj1)
  console.log(obj1) //2

  拷贝:
    值类型直接拷贝即可
    引用类型使用for-in执行浅拷贝（循环复制所有属性，只拷贝第一层），
    利用递归判断某个属性则可以深度拷贝
    如下:
  */
  console.log('1.2 深度拷贝')
  function cloneObject (src) {
    var newObj = {}
    if (typeof (src) !== 'object') {
      return src
    }
    for (var attr in src) {
      newObj[attr] = cloneObject(src[attr])
    }
    return newObj
  }

  var srcObj = {
    a: 1,
    b: {
      b1: ['hello', 'hi'],
      b2: 'JavaScript'
    }
  }
  var abObj = srcObj
  var tarObj = cloneObject(srcObj)
  srcObj.a = 2
  srcObj.b.b1[0] = 'Hello'

  console.log(abObj.a) // 2
  console.log(abObj.b.b1[0]) // Hello

  console.log(tarObj.a)       // 1
  console.log(tarObj.b.b1[0])     // "hello"

  /* 1.3学习数组、字符串、数字等相关方法 */
  /*
  数组的方法：
  转换方法  toString()
  栈方法 push() pop()
  队列方法 shift() push() unshift()
  重排序方法 restore() sort()
  操作方法  concat() splice()
  位置方法 indexOf() lastIndexOf()
  迭代方法 every() fliter() forEach() map() some()
  缩小方法 reduce() 和reduceRight()

  字符串的方法:
  操作方法 concat() slice() substr() substring()
  位置方法 indexOf() lastIndexOf()
  去除前后空格方法 trim()
  大小写转换方法 toLowerCase() toUpperCase()
  */

  /* 数组(元素为数字或者字符串)去重方法思路:
  1.循环遍历查找(效率低下)
  2.对象键值比比对，原理即哈希散列(速度快，但占用内存可能比较大)
  3.先排序后cmp比对（速度较快但要增加排序时间损耗，内存小但返回结果顺序也是排序后的顺序）
  根据要求写采用思路2 在这里要注意，由于比对的时候回采用toString方法，所以 a[1]和a["1"]会被当做同样的，所以要利用indexOf
  */
  console.log('1.3.1数组去重')
  function uniqArray (arr) {
    var resArr = []
    var tempObj = {}
    for (var i = 0; i < arr.length; i++) {
      var val = arr[i]
      var type = typeof (val)
      if (!tempObj[val]) {
        // 若对象无该值属性，则增加对象中该值属性,且设置对应值为数据类型,并将该数组值放入结果数组
        tempObj[val] = [type]
        resArr.push(val)
      } else if (tempObj[val].toString().indexOf(type) < 0) {
        // 在此处解决toString带来的问题
        tempObj[val].push(type)
        resArr.push(val)
      }
    }
    console.log(tempObj)
    return resArr
  }
  var arrA = [1, 3, 5, 7, 5, 3, '1']
  var arrB = uniqArray(arrA)
  console.log(arrB)  // [1, 3, 5, 7]

  /* 字符串头尾进行空格去除·正则实现 */
  console.log('1.3.2 字符串头尾进行空格去除')
  function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  var str = '   hi!  '
  str = trim(str)
  console.log(str)  // 'hi!'

  /* 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递。思路：考虑ie8的情况 */
  console.log('1.3.3 遍历数组,针对数组中每一个元素执行fn函数')
  function each (item, fn) {
    if (Array.prototype.forEach) {
        // 若支持forEach方法
      item.forEach(fn)
    } else {
      // 不支持forEach的时候 便遍历并执行
      for (var i in item) {
        fn(i, item[i])
      }
    }
  }
  // 使用示例
  var arr = ['java', 'c', 'php', 'html']
  function output (item, index) {
    console.log(index + ': ' + item)
  }
  each(arr, output)   // 0:java, 1:c, 2:php, 3:html

  /* 获取一个对象里面第一层元素的数量，返回一个整数 考虑keys()在ie8下不支持 */
  console.log('1.3.4 获取一个对象里面第一层元素的数量')
  function getObjectLength (obj) {
    if (Object.prototype.keys) {
      // 支持keys的浏览器
      return Object.keys(obj).length
    } else {
      // 不支持时
      var ps = []
      for (var p in obj) {
        ps.push(p)
      }
      return ps.length
    }
  }
  // 使用示例
  var obj = {
    a: 1,
    b: 2,
    c: {
      c1: 3,
      c2: 4
    }
  }
  console.log(getObjectLength(obj))  // 3

  /* 正则表达式判断是否为邮箱地址,思路：数字或者字符或者下划线+@+数字或者字符或者下划线+ . +数字或者字符或者下划线 */
  console.log('1.3.5 邮箱验证')
  function isEmail (emailStr) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return reg.test(emailStr)
  }
  var strEma = 'wew32_-3t@hotmail.com'
  console.log(isEmail(strEma))
  /* 正则表达式判断判断是否为手机号思路：1开头 11位 */
  console.log('1.3.6 手机号码验证')
  function isMobilePhone (phone) {
    var reg = /^1\d{10}$/
    return reg.test(phone)
  }
  var strPho = '13912345618'
  console.log(isMobilePhone(strPho))

  /* 2.DOM */
  console.log('2.DOM')

  /* 为element增加一个样式名为newClassName的新样式 */
  console.log('为element增加一个样式名为newClassName')
  var d1 = document.getElementById('d1')
  addClass(d1, 'd2')
  addClass(d1, 'd2')
  console.log(d1)
  // 为element增加一个样式名为newClassName的新样式
  function addClass (element, newClassName) {
    if (element) {
      if (element.className.length === 0) {
        // 若element没有class，则直接增加
        element.className = newClassName
      } else {
        // 若已有class，先判断是否已有newClassName，防止重复添加相同className
        if (element.className.indexOf(newClassName) < 0) { element.className = element.className + ' ' + newClassName }
      }
    }
  }

  // 移除element中的样式oldClassName
  console.log('为element移除element中的样式oldClassName')
  removeClass(d1, 'dd')
  console.log(d1)
  function removeClass (element, oldClassName) {
    if (element) {
      // 若未包含 oldClassName，直接返回
      if (element.className.length === 0 || element.className.indexOf(oldClassName) < 0) {
        return false
      } else {
        // 若含有则使用正则表达式替换，要注意保留一个空格
        var reg = new RegExp(' ' + oldClassName + ' ', 'g')
        element.className = element.className.toString().replace(reg, ' ')
      }
    }
  }

  /* 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值 */
  function isSiblingNode (element, siblingNode) {
    // 获取所有兄弟节点
    var siblings = element.parentNode.children
    // console.log(siblings)
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === siblingNode) {
        return true
      }
    }
    return false
  }
  var child1 = document.getElementById('child1')
  var child2 = document.getElementById('child2')
  console.log(isSiblingNode(child1, child2))

  /* 获取element相对于浏览器窗口的位置，返回一个对象{x, y} */
  function getPosition (element) {
    var position = {
      x: '',
      y: ''
    }
    // 绝对位置减去浏览器滚动条长度
    var X = element.getBoundingClientRect().left + document.documentElement.scrollLeft
    console.log(X)
    // 绝对位置减去浏览器滚动条长度
    var Y = element.getBoundingClientRect().top + document.documentElement.scrollTop
    console.log(Y)
    position.x = X
    position.y = Y
    return position
  }
  var p = getPosition(d1)
  console.log(p)

  /* 模拟jq选择器 */
  console.log('模拟jq选择器')
  function $ (selector) {
    var idReg = /^#([\w_-]+)/
    var classReg = /^\.([\w_-]+)/
    var tagReg = /^\w+$/i
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/
    // 拆分选择器
    var selParts = trim(selector).split(/\s+/)
    // console.log( selParts)
    var selType
    var result
    var context = document
    // 分步选择
    for (var i = 0; i < selParts.length; i++) {
      var part = selParts[i]
      // console.log(part)
      // id
      if (part.match(idReg)) {
        selType = part.match(idReg)
        context = document
        result = context.getElementById(selType[1])
        if (result) {
          context = result
          continue
          // console.log(context)
        } else { return null }

        // var ma = document.getElementById("")
        // console.log(result)
      } else if (part.match(classReg)) {
         // class
        selType = part.match(classReg)
        var flag = 0
        var resultTemp = context.getElementsByTagName('*')
        for (var j = 0; j < resultTemp.length; j++) {
          if (resultTemp[j].className.indexOf(selType[1]) > -1) {
            result = resultTemp[j]
            context = result
            flag = 1

            break
          }
        }

        // 没有找到
        if (flag === 0) { return null }
      } else if (part.match(tagReg)) {
        // tag
        selType = part.match(tagReg)
        // console.log(selType)
        result = context.getElementsByTagName(selType[0])
        if (result.length > 0) {
          context = result[0]
        } else {
          return null
        }
      } else if (part.match(attrReg)) {
        // attribute
        // 如果有value值
        selType = part.match(attrReg)
        var key = selType[2]
        var value = selType[4]
        resultTemp = context.getElementsByTagName('*')
        flag = 0
        for (var jj = 0; jj < resultTemp.length; jj++) {
          if (resultTemp[jj].getAttribute(key)) {
            if (value) {
              if (resultTemp[jj].getAttribute(key) === value) {
                result = resultTemp[jj]
                context = result
                flag = 1
                break
              }
            } else {
              result = resultTemp[jj]
              context = result
              flag = 1
              break
            }
          }
        }
        if (flag === 0) { return null }
      }
    }
    return context
  }
  console.log($('div div div'))

  /* 3.事件 */
  // 为了方便先写一个getEvent函数备用
  function getEvent (event) {
    return event || window.event
  }

  function getTarget (event) {
    return event.target || event.srcElement
  }
  // 给一个element绑定一个针对event事件的响应，响应函数为listener
  function addEvent (element, event, listener) {
    if (element.addEventListener) {
      // dom2级 在非ie浏览器
      element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
      // dom2级  ie浏览器
      element.attachEvent('on' + event, listener)
    } else {
      // dom0级
      element['on' + event] = listener
    }
  }

  // 移除element对象对于event事件发生时执行listener的响应
  function removeEvent (element, event, listener) {
    if (element.removeEventListener) {
     // dom2级 在非ie浏览器
      element.removeEventListener(event, listener, false)
    } else if (element.detachEvent) {
     // dom2级  在ie浏览器
      element.detachEvent('on' + event, listener)
    } else {
      element['on' + event] = null
    }
  }

  function helloWorld () {
    /*eslint-disable */
    alert('Hello World')
    /*eslint-enable */
  }
  function helloWorld2 () {
    /*eslint-disable */
    alert('Hello World2')
    /*eslint-enable */
  }

  // 实现对点击事件的绑定
  function addClickEvent (element, listener) {
    addEvent(element, 'click', listener)
  }
  addClickEvent($('#child1'), helloWorld)
  // 实现对于按Enter键时的事件绑定
  function addEnterEvent (element, listener) {
    addEvent(element, 'keydown', function (event) {
      var e = getEvent()
      if (e && e.keyCode === 13) {
        // 按下enter键
        listener()
      }
    })
  }

  // 绑定点击事件
  addEvent($('#ele-clk'), 'click', helloWorld)
  removeEvent($('#ele-clk'), 'click', helloWorld)

  // 绑定Enter事件
  addEnterEvent(document, helloWorld)

  // 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
  $.on = addEvent
  $.un = removeEvent
  $.click = addClickEvent
  $.enter = addEnterEvent
  // 调用用对象方法绑定
  $.on($('#ele-clk'), 'click', helloWorld)

  // 事件代理
  function clickListener (event) {
    console.log(event)
  }

  function delegateEvent (element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
      /* eslint-disable */
      var ev = getEvent(event)
      /* eslint-enable */
      var target = getTarget(event)
      if (target.nodeName.toLowerCase() === tag) {
        listener(event)
      }
    })
  }

  $.delegate = delegateEvent
  // 实现对list这个ul里面所有li的click事件进行响应
  $.delegate($('#list'), 'li', 'click', clickListener)
  // 接下来把我们的事件函数做如下封装改变：

  $.on = function (selector, event, listener) {
    addEvent($(selector), event, listener)
  }
  $.click = function (selector, listener) {
    addClickEvent($(selector), listener)
  }
  $.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener)
  }
  $.delegate = function (selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener)
  }

  // 使用示例：
  // console.log($('[data-log]'))
  $.click('#ele-clk', helloWorld2)
  $.delegate('#list', 'li', 'click', helloWorld)

  /* 4 BOM */
  console.log(' 4 BOM ')

  // 判断是否为IE浏览器，返回-1或者版本号
  function isIE () {
    // 根据navigator获取版本号
    var browName = navigator.appName
    if (browName === 'Microsoft Internet Explorer') { return navigator.appVersion } else {
      return -1
    }
  }
  console.log(isIE())
// 设置cookie
  function setCookie (cookieName, cookieValue, expiredays) {
    // cookie内容
    var cookieText = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue)
    if (expiredays instanceof Date) {
      cookieText += ';expiredays=' + expiredays.toGMTString()
    }
    document.cookie = cookieText
  }

// 获取cookie值
  function getCookie (cookieName) {
    var cookName = encodeURIComponent(cookieName) + '='
    var cookieStart = document.cookie.indexOf(cookName)
    var cookieValue = null

    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  }
  /* 5.Ajax */
  /* eslint-disable */
  function createXHR () {
    if (typeof XMLHttpRequest !== 'undefined') {
       // 如果存在XMLHttpRequest方法
      return new XMLHttpRequest()
    } else if (typeof ActiveXObject !== 'undefiend') {
      // 如果不存在
      if (typeof arguments.callee.activeXString !== 'string') {
        var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp']
        var i
        var len
        for (i = 0; len = version.length; i < len, i++) {
          try {
            new ActiveXObject(versions[i])
            arguments.callee.activeXStringv = versions[i]
            break
          } catch (ex) {
            // 跳过
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString)
    } else {
      throw new Error('No XHR object available')
    }
  }
  /* eslint-enable */
  // function stringToObj (param) {
  //   // 获得把字符串根据&分割
  //   var paras = param.split(/&/g)
  //   var obj = {}
  //  // console.log(paras)
  //   for (var len = 0; len < paras.length; len++) {
  //     var rel = paras[len].split(/=/g)
  //     var key = rel[0]
  //     obj[key] = rel[1]
  //   }
  //   obj = JSON.stringify(obj)
  //   // console.log('json对象'+obj)
  //   return obj
  // }
  function objToString (param) {
    // 遍历所有元素
    var str = ''
    for (var pro in param) {
      if (str.length > 0 && str[str.length] !== '&') { str += '&' }
      str += pro + '=' + param[pro]
    }
    // 对每个部分 获取key和value
  }
  function ajax (url, options) {
    // your implement
    var type = (options.type || 'GET').toUpperCase()
    var data = options.data || null
    var funSuccess = options.onsuccess || null
    var funFail = options.onfail || null
    // 创建xhr对象
    var xhr = createXHR()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          funSuccess(xhr.responseText, xhr)
        } else {
          funFail(xhr.responseText, xhr)
        }
      }
    }
    // 参数判断
    if (type === 'GET') {
      if (Object.prototype.toString.call(data) === '[object Object]') {
        data = objToString(data)
      }
      // get请求
      // 处理参数
      xhr.open('GET', url + '?' + data, true)
      xhr.send(null)
    } else if (type === 'POST') {
      // if (Object.prototype.toString.call(data) === '[object String]') {
      // // post时若参数为字符创转换成对象
      //   data = stringToObj(data)
      // }
      xhr.open('POST', url, true)
      // 设置表单提交时的内容类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      console.log('post-data:' + data)
      xhr.send(data)
      // post请求
    }
  }
  // 执行ajax
  ajax(
    'php/ajax.php',
    {
      data: 'name=simon&password=123456',
      type: 'post',
      // {
      //   name: 'simon',
      //   password: '123456'
      // },
      onsuccess: function (responseText, xhr) {
        console.log(responseText)
      },
      onfail: function (responseText, xhr) {
        console.log(responseText)
      }
    }
)
}
