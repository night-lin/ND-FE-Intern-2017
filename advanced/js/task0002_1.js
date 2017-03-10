window.onload = function () {
  var btnSumitflag = 1

  function invalidSubmit (event) {
    event = event || window.event
  // 阻止表单默认提交
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  }
  interVali()
  // $.on('#inter-submit', 'click', invalidSubmit)
  $.on('#interest', 'keyup', interVali)
  function arrNullRemove (arr) {
    for (var len = 0; len < arr.length; len++) {
      if (arr[len] === '') {
      // 删除空项此时要注意把len退回一位
        arr.splice(len, 1)
        len--
      }
    }
    return arr
  }
  // 判断是否通过验证
  function interVali () {
    var errorMessage = ''
    var value = $('#interest').value

    // 判断是否为空
    if (value === '') {
      $.un('#inter-submit', 'click', showCheckbox)
      $.on('#inter-submit', 'click', invalidSubmit)
      errorMessage = '爱好的数量不能为0'
      $('#error').innerHTML = errorMessage
    } else {
      var ret = value.split(/[,，、；;\s]/g)
      // ret = uniqArray(ret)

      // 判断爱好的数量是否大于10
      ret = arrNullRemove(ret)
      // $.on('#inter-submit', 'click', showCheckbox(ret))
      if (ret.length > 10) {
        // 输入数量超过10个时失效按钮
        $.un('#inter-submit', 'click', showCheckbox)

        console.log('爱好的数量不能多于10')
        errorMessage = '爱好的数量不能多于10'
        $('#error').innerHTML = errorMessage
      } else {
        errorMessage = ' '
        $.on('#inter-submit', 'click', showCheckbox)
        $('#error').innerHTML = errorMessage
      }
    }
  }
  // 生成checkbox的函数
  function showCheckbox () {
    // 为每个选项生成一个checkbox和对应的laibel
    var value = $('#interest').value
    var ret = value.split(/[,，、；;\s]/g)
    var arr = uniqArray(ret)
    arr = arrNullRemove(arr)
    for (var i = 0; i < arr.length; i++) {
      var labelStr = document.createElement('label')
      labelStr.innerHTML = arr[i]
      var checkStr = document.createElement('input')
      checkStr.type = 'checkbox'
      var node = document.createElement('div')
      node.appendChild(labelStr)
      node.appendChild(checkStr)
      $('#check-area').appendChild(node)
    }
  }

  // 在p中显示信息
  function showResult () {
    // 获取输入的值
    var value = $('#interest').value
    // 换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号
    var ret = value.split(/[,，、；;\s]/g)
    var text = '您的结果为:'
    // 去重
    ret = uniqArray(ret)

    // 去空项
    ret = arrNullRemove(ret)
    for (var len = 0; len < ret.length; len++) {
      // 拼接结果
      text += ret[len] + ','
    }
    // 输出
    text = text.substring(0, text.length - 1)
    console.log(text)
    $('#result').innerHTML = text
  }
}
