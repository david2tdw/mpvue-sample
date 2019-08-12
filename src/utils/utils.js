export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function timeFomatter1 (time) {
  if (!time || time === ' ') return ''
  let formatArr = time.split('')
  let flag = false
  formatArr.forEach(item => {
    if (isNaN(Number(item))) {
      flag = true
    }
  })
  if (flag) return time
  let format
  let year = '20' + formatArr[0] + formatArr[1]
  let month = formatArr[2] + formatArr[3]
  let date = formatArr[4] + formatArr[5]
  format = year + '/' + month + '/' + date
  return format
}

export function timeFomatter (time, format, dateFlag) {
  let date = new Date(time)
  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  if (dateFlag) {
    return format
  }
  return new Date(format).getTime()
}

export function typeOf (data) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(data)]
}

export function deepCopy (data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export function throttle (fn, delay) {
  let lastTime = 0
  return function () {
    let nowTime = Date.now()
    if (nowTime - lastTime > delay || !lastTime) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}

// 文字过长截取换行
export function autoSubstring (content, len = 14) {
  let length = Math.ceil(content.length / len)
  let str = ''
  for (let i = 0; i < length; i++) {
    let j = i
    str += i === length - 1 ? content.substring(len * i, len * (j + 1)) : content.substring(len * i, len * (j + 1)) + '\n'
  }
  return str
}
// 如果一个obj里有值为null的属性，把null变为''
export function formatNullObj (objItem) {
  if (!objItem) {
    return
  }
  Object.keys(objItem).forEach(key => {
    if (Object.prototype.toString.call(objItem[key]) === '[object Null]') {
      objItem[key] = ''
    }
  })
}
