window.onload = function () {
  function showDate () {
    var value = $('#date').value.split('-')
    if (value.length !== 3) {
      alert('请输入正确格式的时间')
      return false
    }
    // 获取目标时间 换算成毫秒
    var goalYear = value[0]
    var goalMon = value[1]
    var goalDay = value[2]
    var goalTime = '' + goalYear + '/' + goalMon + '/' + goalDay
    console.log(goalTime)
    // console.log(Date.parse(goalTime))
    if (isNaN(Date.parse(goalTime)) === true) {
      alert('请输入合理的时间')
      return false
    }
    goalTime = Date.parse(goalTime)
   // console.log(goalTime)
    // 计算当前时间
    var nowDate = Date()
    var nowTime = Date.parse(nowDate)
    // 计算时间差
    var subTime = goalTime - nowTime
    if (subTime < 0) {
      alert('目标时间不能小于当前时间')
      return false
    } else {
     // 执行倒计时
      countDown(goalYear, goalMon, goalDay, subTime)
    }
  }
  $.click('#inter-submit', invalidSubmit)
  $.click('#inter-submit', showDate)
  function invalidSubmit (event) {
    event = event || window.event
  // 阻止表单默认提交
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  }

  // 倒计时函数
  function countDown (goalYear, goalMon, goalDay, subTime) {
    if (subTime === 0) {
        // 结束
      console.log('倒计时结束')
      return true
    } else {
      subTime -= 1000

      var day = Math.floor(subTime / (24 * 3600 * 1000))
      var leave1 = subTime % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
      var hour = Math.floor(leave1 / (3600 * 1000))
      var leave2 = leave1 % (3600 * 1000)
      var min = Math.floor(leave2 / (60 * 1000))
      var leave3 = leave2 % (60 * 1000)
      var sec = Math.round(leave3 / 1000)
      console.log('距离' + goalYear + '年' + goalMon + '月' + goalDay + '日还有' + day + '天' + hour + '时' + min + '分' + sec + '秒')
      $('#result').innerHTML = '距离<span>' + goalYear + '</span>年<span>' + goalMon + '</span>月<span>' + goalDay + '</span>日还有<span>' + day + '</span>天<span>' + hour + '</span>时<span>' + min + '</span>分<span>' + sec + '</span>秒'
      setTimeout(function () {
        countDown(goalYear, goalMon, goalDay, subTime)
      }, 1000)
    }
  }
}
